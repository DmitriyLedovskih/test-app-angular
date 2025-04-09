export interface IAuth {
  email: string;
  password: string;
}

export interface IRegisterFetch {
  id: number;
  token: string;
}

export interface ILoginFetch {
  token: string;
}
