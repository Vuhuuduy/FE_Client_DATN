export interface IDiscount {
  _id: string;
  code: string;
  discount_type: "%" | "vnd";
  discount_value: number;
  minOrderValue: number;
  date: string[]; // [start, end]
  status: "active" | "inactive";
}

export interface IUserVoucher {
  _id: string;
  userId: string;
  discountId: IDiscount | string; // BE trả về object khi populate
  used: boolean;
}