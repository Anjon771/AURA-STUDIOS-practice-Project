export type ProductCategory = 'furniture' | 'lighting' | 'apparel' | 'tech' | 'objects';

export interface ProductVariantColor {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  badge?: 'Bestseller' | 'New Arrival' | 'Limited Edition' | 'Staff Pick' | 'Archival';
  inStock: boolean;
  stockQuantity: number;
  colors: ProductVariantColor[];
  sizes?: string[];
  description: string;
  highlights: string[];
  specifications: Record<string, string>;
  shippingInfo: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isOffer?: boolean;
  reviewsList?: Review[];
}

export interface CartItem {
  id: string; // product id + color + size hash
  product: Product;
  quantity: number;
  selectedColor: ProductVariantColor;
  selectedSize?: string;
}

export interface UserAddress {
  id: string;
  isDefault: boolean;
  fullName: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface PaymentMethod {
  id: string;
  isDefault: boolean;
  type: 'card' | 'apple_pay' | 'google_pay';
  cardBrand: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expiry: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  colorName: string;
  size?: string;
  price: number;
  quantity: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  shippingAddress: UserAddress;
  paymentMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'customer' | 'admin';
  phone?: string;
  addresses: UserAddress[];
  paymentMethods: PaymentMethod[];
}

export type Currency = 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // relative to USD
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message?: string;
}
