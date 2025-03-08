
import { carDatabase } from '../data/carDatabase';
import { identifyCar } from './carIdentification';

// Re-export the type with 'export type' syntax to fix the isolatedModules error
export type { CarInfo } from '../types/car';
export { carDatabase, identifyCar };
