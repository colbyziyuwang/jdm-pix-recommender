
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
    imageUrl: "https://images.pexels.com/photos/6894426/pexels-photo-6894426.jpeg",
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
    imageUrl: "https://images.pexels.com/photos/13617921/pexels-photo-13617921.jpeg",
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
    imageUrl: "https://images.pexels.com/photos/12801195/pexels-photo-12801195.jpeg",
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
    imageUrl: "https://images.pexels.com/photos/7813441/pexels-photo-7813441.jpeg",
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
    imageUrl: "https://images.pexels.com/photos/9706799/pexels-photo-9706799.jpeg",
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
    imageUrl: "https://images.pexels.com/photos/10571264/pexels-photo-10571264.jpeg",
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
