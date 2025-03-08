
import { CarInfo } from '../types/car';

export const generateResponse = (question: string, carInfo: CarInfo): string => {
  // Convert question to lowercase for easier matching
  const lowerQuestion = question.toLowerCase();
  
  // Basic response templates based on question keywords
  if (lowerQuestion.includes('engine') || lowerQuestion.includes('motor')) {
    return `The ${carInfo.manufacturer} ${carInfo.name} features ${carInfo.engineInfo || 'an engine with specifications not currently in our database'}. This powerplant was designed to deliver both performance and reliability, characteristic of Japanese engineering.`;
  } 
  else if (lowerQuestion.includes('power') || lowerQuestion.includes('hp') || lowerQuestion.includes('horsepower')) {
    return `The ${carInfo.manufacturer} ${carInfo.name} produces ${carInfo.power || 'power output not specified in our database'}. This was impressive for its era and helped establish the car's reputation among enthusiasts.`;
  }
  else if (lowerQuestion.includes('speed') || lowerQuestion.includes('fast')) {
    return `The ${carInfo.manufacturer} ${carInfo.name} has a top speed of ${carInfo.topSpeed || 'a top speed not specified in our database'}. Its performance capabilities made it a standout in the Japanese Domestic Market.`;
  }
  else if (lowerQuestion.includes('acceleration') || lowerQuestion.includes('0-60') || lowerQuestion.includes('0 to 60')) {
    return `The ${carInfo.manufacturer} ${carInfo.name} accelerates from 0-60 mph in ${carInfo.acceleration || 'a time not specified in our database'}. This acceleration performance contributed to its popularity in both street and motorsport applications.`;
  }
  else if (lowerQuestion.includes('year') || lowerQuestion.includes('when')) {
    return `The ${carInfo.manufacturer} ${carInfo.name} was produced during ${carInfo.yearRange || 'years not specified in our database'}. This era was significant in the development of Japanese performance cars.`;
  }
  else if (lowerQuestion.includes('dealer') || lowerQuestion.includes('buy') || lowerQuestion.includes('purchase')) {
    const dealerCount = carInfo.dealers?.length || 0;
    return `There are ${dealerCount} dealers listed for the ${carInfo.manufacturer} ${carInfo.name}. You can use the "Find Nearby Dealers" feature to locate dealers in your area, or view the complete list in the dealers section.`;
  }
  else if (lowerQuestion.includes('manufacturer') || lowerQuestion.includes('brand') || lowerQuestion.includes('make')) {
    return `The ${carInfo.name} was manufactured by ${carInfo.manufacturer}, a company known for its ${carInfo.manufacturer === 'Nissan' ? 'innovation and performance engineering' : 
      carInfo.manufacturer === 'Toyota' ? 'reliability and quality craftsmanship' : 
      carInfo.manufacturer === 'Honda' ? 'engineering excellence and efficiency' : 
      carInfo.manufacturer === 'Mazda' ? 'rotary engine technology and driving dynamics' : 
      carInfo.manufacturer === 'Subaru' ? 'all-wheel drive systems and boxer engines' : 
      carInfo.manufacturer === 'Mitsubishi' ? 'rally-bred performance and advanced technology' : 
      'contribution to Japanese automotive excellence'}.`;
  }
  else if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
    return `Hello! I'm your JDM car assistant. Feel free to ask me anything about the ${carInfo.manufacturer} ${carInfo.name}, such as its engine specifications, performance figures, or production history.`;
  }
  else {
    // Default response when the question doesn't match predefined categories
    return `The ${carInfo.manufacturer} ${carInfo.name} is a celebrated JDM vehicle from the ${carInfo.yearRange || 'Japanese domestic market'}. If you have specific questions about its engine, performance, or history, feel free to ask!`;
  }
};
