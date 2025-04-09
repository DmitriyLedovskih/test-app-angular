export interface IUser {
  id: number;
  avatar: string | null;
  email: string;
  first_name: string;
  last_name: string;
}

export interface IUserEdit {
  email: string;
  first_name: string;
  last_name: string;
  ava: string;
}

export interface IUsersFetch {
  data: IUser[];
}

export interface IUserFetch {
  data: IUser;
}

export interface IRegisterUser {
  id: number;
  email: string;
}
