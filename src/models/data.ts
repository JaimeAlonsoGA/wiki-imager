export interface Class {
  id: number;
  name: string;
  species: Speices[];
}

export interface Speices {
  id: number;
  name: string;
  images: imageUrl[];
}

export interface imageUrl {
  url: string;
  autor?: string;
  title?: string;
  description?: string;
}
