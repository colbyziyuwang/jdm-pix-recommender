
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
