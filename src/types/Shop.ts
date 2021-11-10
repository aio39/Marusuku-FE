export type Location = {
  coordinates: [number, number];
  type: string;
};

export type Shop = {
  id: number;
  name: string;
  desc?: string;
  lat: number;
  lng: number;
  address: string;
  location: Location;
};

export type NEWS = {
  [k in 't' | 'b' | 'r' | 'l']: number;
};
