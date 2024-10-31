export interface iUser {
  id: number;
  name: string;
  email: string;
  password: string;
  job: string;
}

export type tUserRegister = Omit<iUser, 'id'>;

export type tUserLogin = Pick<iUser, 'email' | 'password'>;

export type tUserReturn = Omit<iUser, 'password'>;

export interface iUserRegisterReturn {
  accessToken: string;
  user: tUserReturn;
}

export interface iUserLoginReturn {
  accessToken: string;
  user: tUserReturn;
}
