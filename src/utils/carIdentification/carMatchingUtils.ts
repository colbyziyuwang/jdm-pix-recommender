
import { modelClassToCarMap } from '../carModelMapping';
import { carDatabase } from '../../data/carDatabase';

// Find a matching car based on keywords in the label
export const findMatchingCar = (label: string): string | null => {
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
