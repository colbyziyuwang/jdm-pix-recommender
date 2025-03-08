
import { CarInfo } from '../../types/car';
import { carDatabase } from '../../data/carDatabase';

// Fallback identification method when the model fails
export const fallbackIdentification = (): CarInfo => {
  console.log("Using fallback identification method");
  // Return a random car from the database as a fallback
  const randomIndex = Math.floor(Math.random() * carDatabase.length);
  return carDatabase[randomIndex];
};
