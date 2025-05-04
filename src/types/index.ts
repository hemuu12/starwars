// src/types/index.ts

// Define types for the resource (e.g., a character)
export interface Resource {
    name: string;
    height: string;
    mass: string;
    gender: string;
    films: string[];
    species: string[];
    starships: string[];
    homeworld: string;
  }
  
  // Define types for related data (enriched data)
  export interface Homeworld {
    name: string;
    climate: string;
    population: string;
    terrain: string;
  }
  
  export interface Species {
    name: string;
    classification: string;
    average_height: string;
  }
  
  export interface Film {
    title: string;
    release_date: string;
    opening_crawl: string;
  }
  
  export interface Starship {
    name: string;
    model: string;
    manufacturer: string;
    passengers: string;
  }
  