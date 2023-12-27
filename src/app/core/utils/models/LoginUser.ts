export interface LoginUser {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  jwt: string;
  email: string;
  name: string;
  code: string;
  type: string;
}
