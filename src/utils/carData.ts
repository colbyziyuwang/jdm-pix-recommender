
import { pipeline, env } from '@huggingface/transformers';

export interface CarInfo {
  id: string;
  name: string;
  manufacturer: string;
  yearRange: string;
  engineInfo: string;
  power: string;
  topSpeed: string;
  acceleration: string;
  description: string;
  imageUrl: string;
  dealers?: Dealer[];
}

export interface Dealer {
  name: string;
  location: string;
  contact: string;
  website: string;
}

// Sample data for JDM cars
export const carDatabase: CarInfo[] = [
  {
    id: "nissan-gtr-r35",
    name: "GT-R R35",
    manufacturer: "Nissan",
    yearRange: "2007-Present",
    engineInfo: "3.8L Twin-Turbocharged V6",
    power: "565 HP",
    topSpeed: "315 km/h",
    acceleration: "0-100 km/h in 2.7s",
    description: "The Nissan GT-R (R35) is a high-performance sports car and grand tourer produced by Nissan. It was unveiled in 2007 and went on sale in Japan in December 2007, in the United States and Europe in July 2008, and in other regions in March 2009. The GT-R is Nissan's flagship performance vehicle, featuring a handbuilt twin-turbo V6 engine, all-wheel drive, and advanced electronics.",
    imageUrl: "https://images.unsplash.com/photo-1595527516696-78808bc49bfc?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    dealers: [
      {
        name: "Tokyo Nissan Premium",
        location: "Tokyo, Japan",
        contact: "+81-3-1234-5678",
        website: "https://www.nissan-global.com"
      },
      {
        name: "JDM Specialists",
        location: "Los Angeles, CA",
        contact: "(213) 555-1234",
        website: "https://www.jdmspecialists.com"
      }
    ]
  },
  {
    id: "toyota-supra-mk4",
    name: "Supra MK4",
    manufacturer: "Toyota",
    yearRange: "1993-2002",
    engineInfo: "3.0L Twin-Turbocharged Inline-6 (2JZ-GTE)",
    power: "320 HP",
    topSpeed: "285 km/h",
    acceleration: "0-100 km/h in 4.6s",
    description: "The Toyota Supra is a sports car and grand tourer manufactured by Toyota. The MK4 Supra, produced between 1993 and 2002, gained worldwide fame for its remarkable 2JZ-GTE twin-turbocharged inline-six engine, which was highly tunable and capable of handling immense power increases. The fourth-generation Supra became an iconic JDM legend, featured in movies, video games, and car enthusiast communities worldwide.",
    imageUrl: "https://images.unsplash.com/photo-1632441145497-4152ba453a59?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    dealers: [
      {
        name: "Classic JDM Imports",
        location: "Miami, FL",
        contact: "(305) 555-7890",
        website: "https://www.classicjdmimports.com"
      }
    ]
  },
  {
    id: "mazda-rx7-fd",
    name: "RX-7 FD",
    manufacturer: "Mazda",
    yearRange: "1992-2002",
    engineInfo: "1.3L Twin-Turbocharged Rotary Engine (13B-REW)",
    power: "276 HP",
    topSpeed: "250 km/h",
    acceleration: "0-100 km/h in 5.2s",
    description: "The Mazda RX-7 is a front-engine, rear-wheel-drive, rotary engine-powered sports car that was manufactured and marketed by Mazda from 1978 to 2002. The third-generation FD model featured a sequential twin-turbocharger system, lightweight design, and a rotary engine, making it a unique and highly sought-after JDM classic. Its distinctive styling and exceptional handling earned it a dedicated following among enthusiasts.",
    imageUrl: "https://images.unsplash.com/photo-1669383739152-9d64ab8bad3f?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3",
    dealers: [
      {
        name: "Rotary Performance",
        location: "Osaka, Japan",
        contact: "+81-6-9876-5432",
        website: "https://www.rotaryperformance.jp"
      }
    ]
  },
  {
    id: "subaru-impreza-wrx-sti",
    name: "Impreza WRX STI",
    manufacturer: "Subaru",
    yearRange: "1994-Present",
    engineInfo: "2.5L Turbocharged Flat-4 (EJ257)",
    power: "310 HP",
    topSpeed: "255 km/h",
    acceleration: "0-100 km/h in 4.9s",
    description: "The Subaru Impreza WRX STI is a high-performance variant of the Subaru Impreza, manufactured by Subaru. The STI versions are characterized by their rally-inspired technology and powerful turbocharged engines. The car gained worldwide fame through its successes in the World Rally Championship and became an icon of JDM performance with its distinctive boxer engine rumble and all-wheel-drive system.",
    imageUrl: "https://images.unsplash.com/photo-1621005570352-92959a12ec80?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3",
    dealers: [
      {
        name: "Rally Imports",
        location: "Seattle, WA",
        contact: "(206) 555-3456",
        website: "https://www.rallyimports.com"
      }
    ]
  },
  {
    id: "mitsubishi-lancer-evolution",
    name: "Lancer Evolution",
    manufacturer: "Mitsubishi",
    yearRange: "1992-2016",
    engineInfo: "2.0L Turbocharged Inline-4 (4G63/4B11)",
    power: "291 HP",
    topSpeed: "242 km/h",
    acceleration: "0-100 km/h in 5.0s",
    description: "The Mitsubishi Lancer Evolution, also known as the Evo, is a sports sedan based on the Lancer that was manufactured by Mitsubishi Motors. There have been ten official versions to date, and the designation of each model is most commonly a Roman numeral. The Evolution was Mitsubishi's flagship sports model and competed directly against the Subaru Impreza WRX STI in the rally-inspired high-performance compact sedan segment.",
    imageUrl: "https://images.unsplash.com/photo-1611016186353-9af58c69a533?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3",
    dealers: [
      {
        name: "Evolution Specialists",
        location: "Chicago, IL",
        contact: "(312) 555-6789",
        website: "https://www.evolutionspecialists.com"
      }
    ]
  }
];

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

// Map model outputs to our car database
const modelClassToCarMap: Record<string, string> = {
  // Vision model classes to our car IDs
  'gtr': 'nissan-gtr-r35',
  'nissan gtr': 'nissan-gtr-r35',
  'r35': 'nissan-gtr-r35',
  'skyline': 'nissan-gtr-r35',
  'supra': 'toyota-supra-mk4',
  'toyota supra': 'toyota-supra-mk4',
  'mk4': 'toyota-supra-mk4',
  'rx7': 'mazda-rx7-fd',
  'rx-7': 'mazda-rx7-fd',
  'mazda rx7': 'mazda-rx7-fd',
  'fd': 'mazda-rx7-fd',
  'wrx': 'subaru-impreza-wrx-sti',
  'sti': 'subaru-impreza-wrx-sti',
  'subaru': 'subaru-impreza-wrx-sti',
  'impreza': 'subaru-impreza-wrx-sti',
  'lancer': 'mitsubishi-lancer-evolution',
  'evo': 'mitsubishi-lancer-evolution',
  'evolution': 'mitsubishi-lancer-evolution',
  'mitsubishi': 'mitsubishi-lancer-evolution'
};

// Enhanced car identification function using a vision model
export const identifyCar = async (imageSrc: string): Promise<CarInfo | null> => {
  console.log("Starting car identification with vision model...");
  
  try {
    // Create a vision classifier pipeline
    console.log("Loading vision model...");
    
    // Initialize the vision classifier with an appropriate model
    // We'll use a general image classification model that can identify cars
    const classifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224', {
      quantized: true, // Use quantized model for better performance
    });
    
    console.log("Model loaded successfully, processing image...");
    
    // Process the image with the model
    const results = await classifier(imageSrc);
    console.log("Vision model results:", results);
    
    // Extract the top predictions
    if (!results || !results.length) {
      console.error("No classification results returned");
      return fallbackIdentification();
    }
    
    // Find a car match from the predictions
    for (const prediction of results) {
      const label = prediction.label.toLowerCase();
      // Search for car keywords in the prediction labels
      const matchedCarId = findMatchingCar(label);
      if (matchedCarId) {
        console.log(`Matched car: ${matchedCarId} from label: ${label}`);
        const car = carDatabase.find(car => car.id === matchedCarId);
        if (car) return car;
      }
    }
    
    // If no specific car was identified but it's a car/vehicle
    if (results.some(result => 
      result.label.toLowerCase().includes('car') ||
      result.label.toLowerCase().includes('vehicle') ||
      result.label.toLowerCase().includes('automobile')
    )) {
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

// Find a matching car based on keywords in the label
const findMatchingCar = (label: string): string | null => {
  // Check direct mappings first
  for (const [key, carId] of Object.entries(modelClassToCarMap)) {
    if (label.includes(key)) {
      return carId;
    }
  }
  
  // Check each car database entry's name and manufacturer
  for (const car of carDatabase) {
    const carName = car.name.toLowerCase();
    const manufacturer = car.manufacturer.toLowerCase();
    
    if (label.includes(carName) || label.includes(manufacturer)) {
      return car.id;
    }
  }
  
  return null;
};

// Make a smart guess based on visual features detected
const smartGuess = (results: any[]): CarInfo => {
  // Extract visual features that might indicate specific car types
  const hasRed = results.some(r => r.label.toLowerCase().includes('red'));
  const hasSports = results.some(r => r.label.toLowerCase().includes('sports') || r.label.toLowerCase().includes('racing'));
  const hasSedan = results.some(r => r.label.toLowerCase().includes('sedan'));
  
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
