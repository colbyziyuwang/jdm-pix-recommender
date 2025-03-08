
// Main entry point for car identification functionality
import { CarInfo } from '../../types/car';
import { identifyWithAICoolHub } from './aiCoolHubService';
import { identifyWithHuggingFace } from './huggingFaceService';
import { fallbackIdentification } from './fallbackService';
import { findMatchingCar } from './carMatchingUtils';
import { carDatabase } from '../../data/carDatabase';

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
    const huggingFaceResult = await identifyWithHuggingFace(imageSrc);
    if (huggingFaceResult) {
      return huggingFaceResult;
    }
  } catch (error) {
    console.error("Error in vision-based car identification:", error);
  }
  
  // Last resort: use fallback method
  return fallbackIdentification();
};

// Function to find a car by model name or keywords
export const findCarByModel = async (query: string): Promise<CarInfo | null> => {
  console.log(`Searching for car with query: ${query}`);
  
  // Convert query to lowercase for case-insensitive matching
  const searchQuery = query.toLowerCase();
  
  // Direct database search for exact matches
  for (const car of carDatabase) {
    // Check if query matches car name or manufacturer + name
    const fullName = `${car.manufacturer} ${car.name}`.toLowerCase();
    const nameOnly = car.name.toLowerCase();
    const manufacturerOnly = car.manufacturer.toLowerCase();
    
    if (
      fullName.includes(searchQuery) || 
      nameOnly.includes(searchQuery) || 
      manufacturerOnly.includes(searchQuery)
    ) {
      console.log(`Found direct match for "${query}": ${car.manufacturer} ${car.name}`);
      return car;
    }
  }
  
  // If no direct match, try the car mapping utility
  const carId = findMatchingCar(searchQuery);
  if (carId) {
    const matchedCar = carDatabase.find(car => car.id === carId);
    if (matchedCar) {
      console.log(`Found mapped match for "${query}": ${matchedCar.manufacturer} ${matchedCar.name}`);
      return matchedCar;
    }
  }
  
  console.log(`No matches found for "${query}"`);
  return null;
};

export * from './carMatchingUtils';
