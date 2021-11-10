type Position = {
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
  position: Position;
};

type NEWS = {
  [k in 't' | 'b' | 'r' | 'l']: number;
};

export type { Shop, NEWS };
