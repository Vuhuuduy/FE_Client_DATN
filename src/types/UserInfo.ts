interface UserInfo {
  id: string;
  fullname: string;
  email: string;
  phoneNumber?: string;
  address?: {
    city: string;
    district: string;
    detail: string;
    default: boolean;
  }[];
  avatar?: string;
  role: string;
}
