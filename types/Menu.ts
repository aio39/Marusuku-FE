type Menu = {
  id: number;
  name: string;
  cycle_month: number;
  limit_day?: number;
  limit_week?: number;
  limit_month?: number;
  limit_year?: number;
  desc?: string;
  img?: string;

  shop_id: number;
};

type MenuInputs = Omit<Menu, 'id' | 'shop_id'>;

export type { Menu, MenuInputs };
