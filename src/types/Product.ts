// types/Product.ts
import { Variant } from "./Variant";

export interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  images: string[];
  slug?: string;
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
  rating: number;
  reviews: number;
  soldCount?: number;
  isNew?: boolean;
  originalPrice: number;
  
  brand?: string;
  sku?: string;
  colors: string[];
  sizes: string[];
  vouchers?: Voucher[];
  isAccessory?: boolean;
  variants: Variant[];
  stock: number;
  status: string;
}

export interface Voucher {
  title: string;
  condition: string;
  expiry: string;
}
