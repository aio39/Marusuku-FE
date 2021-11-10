type Location = {
  coordinates: [number, number];
  type: string;
};

type Shop = {
  id: number;
  name: string;
  desc?: string;
  lat: number;
  lng: number;
  address: string;
  location: Location;
};

type NEWS = {
  [k in 't' | 'b' | 'r' | 'l']: number;
};

export type { Shop, NEWS };
