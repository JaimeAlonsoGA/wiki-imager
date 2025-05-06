export interface Class {
  id: number;
  name: string;
  species: Specie[];
}

export interface Specie {
  id: string;
  scientific_name: string;
  common_name: string;
  images: imageUrl[];
}

export interface imageUrl {
  url: string;
  autor: string;
  title: string;
  width: number;
  height: number;
}
