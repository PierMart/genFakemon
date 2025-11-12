export interface FakemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface FakemonData {
  name: string;
  description: string;
  types: string[];
  abilities: string[];
  stats: FakemonStats;
}

export interface Fakemon extends FakemonData {
  imageUrl: string;
  shinyImageUrl?: string;
}