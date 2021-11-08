type Position = {
  coordinates: [number, number];
  type: string;
};

type Place = {
  id: number;
  name: string;
  desc?: string;
  lat: number;
  lng: number;
  address: string;
  position: Position;
};

type NEWS = {
  [k in 't' | 'b' | 'r' | 'l']: number;
  // b: number;
  // r: number;
  // l: number;
};

export type { Place, NEWS };
