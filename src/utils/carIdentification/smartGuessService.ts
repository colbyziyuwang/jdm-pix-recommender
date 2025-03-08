
import { CarInfo } from '../../types/car';
import { carDatabase } from '../../data/carDatabase';

// Make a smart guess based on visual features detected
export const smartGuess = (results: any[]): CarInfo => {
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
