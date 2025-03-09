
import { CarInfo } from '../types/car';

// Default car data
const defaultCarDatabase: CarInfo[] = [
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
    imageUrl: "data:image/jpeg;base64,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",
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
    imageUrl: "",
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
    imageUrl: "",
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
    imageUrl: "",
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
    imageUrl: "",
    dealers: [
      {
        name: "Evolution Specialists",
        location: "Chicago, IL",
        contact: "(312) 555-6789",
        website: "https://www.evolutionspecialists.com"
      }
    ]
  },
  {
    id: "honda-nsx",
    name: "NSX",
    manufacturer: "Honda",
    yearRange: "1990-2005",
    engineInfo: "3.0L VTEC V6",
    power: "290 HP",
    topSpeed: "270 km/h",
    acceleration: "0-100 km/h in 5.6s",
    description: "The Honda NSX, marketed in North America as the Acura NSX, is a two-seat, mid-engine coupe sports car manufactured by Honda. The original NSX was developed by Honda to showcase the company's technological prowess and competed with high-end sports cars like Ferrari while offering reliability and everyday usability. Its lightweight aluminum body, VTEC engine technology, and handling were revolutionary for its time.",
    imageUrl: "",
    dealers: [
      {
        name: "Honda Heritage Collection",
        location: "Tokyo, Japan",
        contact: "+81-3-9876-5432",
        website: "https://www.honda.com"
      },
      {
        name: "Classic Japanese Motors",
        location: "San Francisco, CA",
        contact: "(415) 555-8765",
        website: "https://www.classicjapanese.com"
      }
    ]
  }
];

// Load cars from localStorage or use defaults
const loadCarsFromStorage = (): CarInfo[] => {
  try {
    const savedCars = localStorage.getItem('jdmCarDatabase');
    if (savedCars) {
      return JSON.parse(savedCars);
    }
  } catch (error) {
    console.error('Error loading cars from localStorage:', error);
  }
  return defaultCarDatabase;
};

// Initialize the car database
export const carDatabase: CarInfo[] = loadCarsFromStorage();

// Function to save cars to localStorage
export const saveCarToDatabase = (car: CarInfo): void => {
  // Add the car to the in-memory database
  carDatabase.push(car);
  
  // Save the updated database to localStorage
  try {
    localStorage.setItem('jdmCarDatabase', JSON.stringify(carDatabase));
  } catch (error) {
    console.error('Error saving cars to localStorage:', error);
  }
};
