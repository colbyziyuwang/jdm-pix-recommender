
import { CarInfo } from '../../types/car';
import { findMatchingCar } from './carMatchingUtils';
import { smartGuess } from './smartGuessService';
import { carDatabase } from '../../data/carDatabase';

// Identify car using AICoolHub API
export const identifyWithAICoolHub = async (base64Image: string): Promise<CarInfo | null> => {
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
