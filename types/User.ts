type User = {
  id: number;
  name: string;
  email: string;
  photo?: string;
};

type CreteUserData = Pick<User, 'name' | 'email'> & {
  password: string;
  confirm: string;
};

type LoginData = {
  email: string;
  password: string;
};

export type { User, LoginData, CreteUserData };
