export enum ZoneType {
  FOREST = 'Forest Realm (森林秘境)',
  LAKE = 'Lakeside Haven (湖畔浅滩)',
  DESERT = 'Dune Oasis (沙丘绿洲)',
  MOUNTAIN = 'Mountain Peak (高山之巅)'
}

export interface ModuleUnit {
  id: number;
  zone: ZoneType;
  status: 'available' | 'occupied' | 'maintenance';
  x: number; // Relative visual coordinate X
  y: number; // Relative visual coordinate Y
}

export interface PresetImage {
  id: string;
  url: string;
  title: string;
  description: string;
}

export interface BookingAddon {
  id: string;
  name: string;
  price: number;
  description: string;
  selected: boolean;
}

// Move AIStudio interface to global scope to avoid 'Subsequent property declarations' error due to type identity mismatch
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}