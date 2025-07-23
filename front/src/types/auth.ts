export interface LoginCredentials {
  mail: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  mail: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  mail: string;
  token: string;
}
