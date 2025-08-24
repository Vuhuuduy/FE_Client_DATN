export interface IAddress {
  city?: string;
  district?: string;
  detail?: string;
  default?: boolean;
}

export interface IUser {
  _id?: string;
  fullname: string;
  email: string;
  phoneNumber?: string;
  address?: IAddress[]; // luôn là mảng để đồng bộ khi update
  role?: "user" | "admin";
  avatar?: string;
}

export interface IAuthResponse {
  token: string;
  user: IUser; // Đồng bộ với IUser để khi login gán thẳng không bị mất field
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  fullname: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: IAddress[]; // Đồng bộ với IUser
}

export interface ISocialLoginPayload {
  provider: "google" | "facebook" | "github";
  token: string;
}
