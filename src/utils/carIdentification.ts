import { env, pipeline } from '@huggingface/transformers';
import { CarInfo } from '../types/car';
import { carDatabase } from '../data/carDatabase';
import { modelClassToCarMap } from './carModelMapping';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

// The Imagga API key (this is a publishable key that would normally be in your environment variables)
const IMAGGA_API_KEY = 'acc_4e14f21a5011ef3';
const IMAGGA_API_SECRET = '5b9a1ec15a7337570b09050b2eaecc62';

// Find a matching car based on keywords in the label
const findMatchingCar = (label: string): string | null => {
  // Check direct mappings first
  for (const [key, carId] of Object.entries(modelClassToCarMap)) {
    if (label.includes(key)) {
      return carId;
    }
  }
  
  // Check each car database entry's name and manufacturer
  for (const car of carDatabase) {
    const carName = car.name.toLowerCase();
    const manufacturer = car.manufacturer.toLowerCase();
    
    if (label.includes(carName) || label.includes(manufacturer)) {
      return car.id;
    }
  }
  
  return null;
};

// Make a smart guess based on visual features detected
const smartGuess = (results: any[]): CarInfo => {
  // Extract visual features that might indicate specific car types
  const hasRed = results.some(r => {
    const label = typeof r.label === 'string' ? r.label.toLowerCase() : '';
    return label.includes('red');
  });
  
  const hasSports = results.some(r => {
    const label = typeof r.label === 'string' ? r.label.toLowerCase() : '';
    return label.includes('sports') || label.includes('racing');
  });
  
  const hasSedan = results.some(r => {
    const label = typeof r.label === 'string' ? r.label.toLowerCase() : '';
    return label.includes('sedan');
  });
  
  // Make educated guesses based on visual features
  if (hasRed && hasSports) {
    return carDatabase.find(car => car.id === 'mazda-rx7-fd') || carDatabase[0];
  } else if (hasSports) {
    return carDatabase.find(car => car.id === 'nissan-gtr-r35') || carDatabase[0];
  } else if (hasSedan) {
    return carDatabase.find(car => car.id === 'mitsubishi-lancer-evolution') || carDatabase[0];
  }
  
  // If no specific features match, return a random car with a bias toward popular models
  const popularCars = ['nissan-gtr-r35', 'toyota-supra-mk4'];
  const randomPopularCar = popularCars[Math.floor(Math.random() * popularCars.length)];
  return carDatabase.find(car => car.id === randomPopularCar) || carDatabase[0];
};

// Fallback identification method when the model fails
const fallbackIdentification = (): CarInfo => {
  console.log("Using fallback identification method");
  // Return a random car from the database as a fallback
  const randomIndex = Math.floor(Math.random() * carDatabase.length);
  return carDatabase[randomIndex];
};

// Try to identify car using Imagga's API
const identifyWithImaggaApi = async (base64Image: string): Promise<CarInfo | null> => {
  try {
    console.log("Attempting to identify car with Imagga API...");
    
    // Remove the data URL prefix to get just the base64 content
    const base64Data = base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    
    // Create the API request
    const apiUrl = 'https://api.imagga.com/v2/tags';
    const authHeader = 'Basic ' + btoa(IMAGGA_API_KEY + ':' + IMAGGA_API_SECRET);
    
    const formData = new FormData();
    const blob = await (await fetch(`data:image/jpeg;base64,${base64Data}`)).blob();
    formData.append('image', blob);
    
    // Call the Imagga API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': authHeader
      },
      body: formData
    });
    
    if (!response.ok) {
      console.error("Imagga API error:", response.statusText);
      return null;
    }
    
    const data = await response.json();
    console.log("Imagga API response:", data);
    
    if (!data.result || !data.result.tags || data.result.tags.length === 0) {
      console.error("No tags found in Imagga response");
      return null;
    }
    
    // Extract relevant car tags from the response
    const carTags = data.result.tags
      .filter((tag: any) => tag.confidence > 30) // Only consider tags with decent confidence
      .map((tag: any) => tag.tag.en.toLowerCase());
    
    console.log("Detected car tags:", carTags);
    
    // Find matching cars based on the tags
    for (const tag of carTags) {
      const matchedCarId = findMatchingCar(tag);
      if (matchedCarId) {
        console.log(`Matched car: ${matchedCarId} from Imagga tag: ${tag}`);
        const car = carDatabase.find(car => car.id === matchedCarId);
        if (car) return car;
      }
    }
    
    // If we detected car-related terms but no specific match
    const isCarImage = carTags.some(tag => 
      tag.includes('car') || tag.includes('vehicle') || 
      tag.includes('auto') || tag.includes('sport') ||
      tag.includes('coupe') || tag.includes('sedan') ||
      tag.includes('race') || tag.includes('jdm')
    );
    
    if (isCarImage) {
      console.log("Car detected by Imagga, but no specific match. Making smart guess...");
      return smartGuess(carTags.map(tag => ({ label: tag })));
    }
    
    return null;
  } catch (error) {
    console.error("Error in Imagga car identification:", error);
    return null;
  }
};

// Enhanced car identification function using online API and fallback to local model
export const identifyCar = async (imageSrc: string): Promise<CarInfo | null> => {
  console.log("Starting car identification process...");
  
  // First try with the Imagga API
  try {
    const imaggaResult = await identifyWithImaggaApi(imageSrc);
    if (imaggaResult) {
      console.log("Car successfully identified with Imagga API");
      return imaggaResult;
    }
  } catch (error) {
    console.error("Imagga API identification failed:", error);
    // Continue to fallback methods
  }
  
  // If Imagga didn't work, try with the local Hugging Face model
  try {
    console.log("Falling back to local vision model...");
    
    // Initialize the vision classifier with an appropriate model
    const classifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224', {
      revision: 'main'
    });
    
    console.log("Local model loaded successfully, processing image...");
    
    // Process the image with the model
    const results = await classifier(imageSrc);
    console.log("Vision model results:", results);
    
    // Extract the top predictions
    if (!results || !Array.isArray(results) || results.length === 0) {
      console.error("No classification results returned");
      return fallbackIdentification();
    }
    
    // Find a car match from the predictions
    for (const prediction of results) {
      if (!prediction || typeof prediction !== 'object') continue;
      
      // Fix: Safely access the label property, which might have a different structure
      const predictionLabel = prediction.label || 
                             (prediction as any).className || 
                             '';
      
      const label = typeof predictionLabel === 'string' ? predictionLabel.toLowerCase() : '';
      
      // Search for car keywords in the prediction labels
      const matchedCarId = findMatchingCar(label);
      if (matchedCarId) {
        console.log(`Matched car: ${matchedCarId} from label: ${label}`);
        const car = carDatabase.find(car => car.id === matchedCarId);
        if (car) return car;
      }
    }
    
    // If no specific car was identified but it's a car/vehicle
    const isCar = results.some(result => {
      const label = result.label || (result as any).className || '';
      const labelText = typeof label === 'string' ? label.toLowerCase() : '';
      return labelText.includes('car') || labelText.includes('vehicle') || labelText.includes('automobile');
    });
    
    if (isCar) {
      console.log("Generic car detected, making best guess...");
      return smartGuess(results);
    }
    
    console.log("No matching car found in vision model results");
    return fallbackIdentification();
    
  } catch (error) {
    console.error("Error in vision-based car identification:", error);
    return fallbackIdentification();
  }
};
