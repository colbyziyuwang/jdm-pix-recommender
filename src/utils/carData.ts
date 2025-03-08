
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

// Function to help with image recognition (simplified simulation)
export const identifyCar = (imageSrc: string): Promise<CarInfo | null> => {
  return new Promise((resolve) => {
    // In a real app, this would be a real image recognition algorithm
    // For this demo, we're just randomly selecting a car from our database
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * carDatabase.length);
      resolve(carDatabase[randomIndex]);
    }, 2000); // Simulate processing time
  });
};
