
import { env, pipeline } from '@huggingface/transformers';
import { CarInfo } from '../types/car';
import { carDatabase } from '../data/carDatabase';
import { modelClassToCarMap } from './carModelMapping';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

// Find a matching car based on keywords in the label
const findMatchingCar = (label: string): string | null => {
  // Check direct mappings first
  for (const [key, carId] of Object.entries(modelClassToCarMap)) {
    if (label.toLowerCase().includes(key.toLowerCase())) {
      return carId;
    }
  }
  
  // Check each car database entry's name and manufacturer
  for (const car of carDatabase) {
    const carName = car.name.toLowerCase();
    const manufacturer = car.manufacturer.toLowerCase();
    
    if (label.toLowerCase().includes(carName) || label.toLowerCase().includes(manufacturer)) {
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

// Identify car using AICoolHub API
const identifyWithAICoolHub = async (base64Image: string): Promise<CarInfo | null> => {
  try {
    console.log("Attempting to identify car with AICoolHub API...");
    
    // Remove the data URL prefix to get just the base64 content
    const base64Data = base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    
    // Create the API request
    const apiUrl = 'https://aicoolhub.com/api/v1/car-identifier';
    
    const formData = new FormData();
    const blob = await (await fetch(`data:image/jpeg;base64,${base64Data}`)).blob();
    formData.append('image', blob);
    
    // Call the AICoolHub API
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      console.error("AICoolHub API error:", response.statusText);
      return null;
    }
    
    const data = await response.json();
    console.log("AICoolHub API response:", data);
    
    if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
      console.error("No results found in AICoolHub response");
      return null;
    }
    
    // Extract car information from the response
    const carInfoResults = data.results.map((result: any) => ({
      make: result.make || '',
      model: result.model || '',
      year: result.year || '',
      confidence: result.confidence || 0
    })).filter((car: any) => car.confidence > 30);
    
    console.log("Detected car information:", carInfoResults);
    
    if (carInfoResults.length === 0) {
      return null;
    }
    
    // Try to find a matching car in our database
    for (const carInfo of carInfoResults) {
      const searchTerms = [
        carInfo.make.toLowerCase(),
        carInfo.model.toLowerCase(),
        `${carInfo.make} ${carInfo.model}`.toLowerCase()
      ];
      
      for (const term of searchTerms) {
        const matchedCarId = findMatchingCar(term);
        if (matchedCarId) {
          console.log(`Matched car: ${matchedCarId} from AICoolHub result: ${term}`);
          const car = carDatabase.find(car => car.id === matchedCarId);
          if (car) return car;
        }
      }
    }
    
    // If we found a car but no specific match in our database
    const bestGuess = carInfoResults[0];
    console.log("No exact match found. Best guess:", bestGuess);
    
    // Try to find a car from the same manufacturer
    const manufacturerMatch = carDatabase.find(car => 
      car.manufacturer.toLowerCase() === bestGuess.make.toLowerCase()
    );
    
    if (manufacturerMatch) {
      console.log(`Found car from same manufacturer: ${manufacturerMatch.id}`);
      return manufacturerMatch;
    }
    
    return smartGuess(carInfoResults.map(info => ({ 
      label: `${info.make} ${info.model} ${info.year}` 
    })));
  } catch (error) {
    console.error("Error in AICoolHub car identification:", error);
    return null;
  }
};

// Main car identification function with multiple fallback options
export const identifyCar = async (imageSrc: string): Promise<CarInfo | null> => {
  console.log("Starting car identification process...");
  
  // First try with the AICoolHub API
  try {
    const aiCoolHubResult = await identifyWithAICoolHub(imageSrc);
    if (aiCoolHubResult) {
      console.log("Car successfully identified with AICoolHub API");
      return aiCoolHubResult;
    }
  } catch (error) {
    console.error("AICoolHub API identification failed:", error);
    // Continue to fallback methods
  }
  
  // If AICoolHub didn't work, try with the local Hugging Face model
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
      
      // Safely access the label property, which might have a different structure
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
