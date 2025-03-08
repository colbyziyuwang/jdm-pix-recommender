
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
  
  // Print all available cars for debugging
  console.log("Available cars in database:", carDatabase.map(car => `${car.manufacturer} ${car.name}`));
  
  // Convert query to lowercase for case-insensitive matching
  const searchQuery = query.toLowerCase().trim();
  
  if (searchQuery.length < 2) {
    console.log("Search query too short, need at least 2 characters");
    return null;
  }

  // Direct database search for exact or partial matches
  let matchingCars = carDatabase.filter(car => {
    // Check if query matches car name or manufacturer + name
    const fullName = `${car.manufacturer} ${car.name}`.toLowerCase();
    const nameOnly = car.name.toLowerCase();
    const manufacturerOnly = car.manufacturer.toLowerCase();
    
    return (
      fullName.includes(searchQuery) || 
      nameOnly.includes(searchQuery) || 
      manufacturerOnly.includes(searchQuery)
    );
  });
  
  if (matchingCars.length > 0) {
    console.log(`Found ${matchingCars.length} direct matches for "${query}"`);
    const bestMatch = matchingCars[0]; // Take the first match
    console.log(`Best match: ${bestMatch.manufacturer} ${bestMatch.name}`);
    
    // Validate image URL
    if (bestMatch.imageUrl) {
      console.log(`Car image URL: ${bestMatch.imageUrl}`);
    } else {
      console.error(`No image URL for ${bestMatch.manufacturer} ${bestMatch.name}`);
    }
    
    return bestMatch;
  }
  
  // If no direct match, try matching individual words
  const queryWords = searchQuery.split(/\s+/);
  if (queryWords.length > 1) {
    for (const word of queryWords) {
      if (word.length < 2) continue; // Skip very short words
      
      for (const car of carDatabase) {
        const fullName = `${car.manufacturer} ${car.name}`.toLowerCase();
        if (fullName.includes(word)) {
          console.log(`Found word match "${word}" in "${fullName}"`);
          return car;
        }
      }
    }
  }
  
  // If still no match, try the car mapping utility as last resort
  const carId = findMatchingCar(searchQuery);
  if (carId) {
    const matchedCar = carDatabase.find(car => car.id === carId);
    if (matchedCar) {
      console.log(`Found mapped match for "${query}": ${matchedCar.manufacturer} ${matchedCar.name}`);
      // Validate image URL
      if (matchedCar.imageUrl) {
        console.log(`Car image URL: ${matchedCar.imageUrl}`);
      } else {
        console.error(`No image URL for ${matchedCar.manufacturer} ${matchedCar.name}`);
      }
      return matchedCar;
    }
  }
  
  console.log(`No matches found for "${query}"`);
  return null;
};

export * from './carMatchingUtils';
