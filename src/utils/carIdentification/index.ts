
// Main entry point for car identification functionality
import { CarInfo } from '../../types/car';
import { identifyWithAICoolHub } from './aiCoolHubService';
import { identifyWithHuggingFace } from './huggingFaceService';
import { fallbackIdentification } from './fallbackService';

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

export * from './carMatchingUtils';
