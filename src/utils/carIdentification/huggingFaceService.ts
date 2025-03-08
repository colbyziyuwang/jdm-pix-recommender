
import { env, pipeline } from '@huggingface/transformers';
import { CarInfo } from '../../types/car';
import { findMatchingCar } from './carMatchingUtils';
import { smartGuess } from './smartGuessService';
import { carDatabase } from '../../data/carDatabase';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

// Identify car using Hugging Face vision model
export const identifyWithHuggingFace = async (imageSrc: string): Promise<CarInfo | null> => {
  console.log("Loading local model for image classification...");
  
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
    return null;
  }
  
  // Find a car match from the predictions
  for (const prediction of results) {
    if (!prediction || typeof prediction !== 'object') continue;
    
    // The model may return results with different property names depending on version
    // Safely access the label property, checking for both common formats
    const predictionLabel = 
      'label' in prediction ? prediction.label : 
      'className' in prediction ? (prediction as any).className : 
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
    // Handle different property names in results
    const label = 
      'label' in result ? result.label : 
      'className' in result ? (result as any).className : 
      '';
      
    const labelText = typeof label === 'string' ? label.toLowerCase() : '';
    return labelText.includes('car') || labelText.includes('vehicle') || labelText.includes('automobile');
  });
  
  if (isCar) {
    console.log("Generic car detected, making best guess...");
    return smartGuess(results);
  }
  
  console.log("No matching car found in vision model results");
  return null;
};
