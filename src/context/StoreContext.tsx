import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  CartItem,
  UserProfile,
  Order,
  OrderStatus,
  Currency,
  CurrencyConfig,
  ToastMessage,
  ProductVariantColor,
  Review
} from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

const CURRENCY_CONFIGS: Record<Currency, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
};

const DEMO_USER: UserProfile = {
  id: 'usr-001',
  name: 'Sophia Vance',
  email: 'sophia.vance@studio.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'customer',
  phone: '+1 (555) 234-8901',
  addresses: [
    {
      id: 'addr-1',
      isDefault: true,
      fullName: 'Sophia Vance',
      street: '428 Mercer Street',
      apartment: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10013',
      country: 'United States',
      phone: '+1 (555) 234-8901'
    }
  ],
  paymentMethods: [
    {
      id: 'pm-1',
      isDefault: true,
      type: 'card',
      cardBrand: 'visa',
      last4: '4242',
      expiry: '08/28'
    }
  ]
};

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1029',
    orderNumber: 'AUR-91823',
    date: '2026-03-24',
    items: [
      {
        productId: 'prod-002',
        productName: 'Brushed Brass Horizon Pendant',
        productImage: INITIAL_PRODUCTS[1].image,
        colorName: 'Brushed Brass',
        price: 340,
        quantity: 1
      },
      {
        productId: 'prod-006',
        productName: 'Cast Bronze Incense Burner & Vessel',
        productImage: INITIAL_PRODUCTS[5].image,
        colorName: 'Antiqued Bronze',
        price: 145,
        quantity: 1
      }
    ],
    subtotal: 485,
    discount: 48.5,
    shipping: 0,
    tax: 34.9,
    total: 471.4,
    status: 'shipped',
    shippingAddress: DEMO_USER.addresses[0],
    paymentMethod: 'Visa ending in 4242',
    trackingNumber: '1Z9999999999999999',
    estimatedDelivery: 'March 31, 2026'
  },
  {
    id: 'ord-1028',
    orderNumber: 'AUR-80412',
    date: '2026-02-10',
    items: [
      {
        productId: 'prod-004',
        productName: 'Japanese Selvedge Raw Cotton Overshirt',
        productImage: INITIAL_PRODUCTS[3].image,
        colorName: 'Indigo Deep Wash',
        size: 'L',
        price: 220,
        quantity: 1
      }
    ],
    subtotal: 220,
    discount: 0,
    shipping: 0,
    tax: 17.6,
    total: 237.6,
    status: 'delivered',
    shippingAddress: DEMO_USER.addresses[0],
    paymentMethod: 'Visa ending in 4242',
    trackingNumber: '1Z8888888888888888'
  }
];

export type NavigationTarget =
  | 'home'
  | 'shop'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'account'
  | 'admin'
  | 'auth'
  | 'wishlist';

interface StoreContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addReviewToProduct: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: ProductVariantColor, size?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  couponCode: string;
  discountPercentage: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTax: number;
  cartTotal: number;
  cartItemCount: number;
  freeShippingThreshold: number;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInUSD: number) => string;

  currentView: NavigationTarget;
  setCurrentView: (view: NavigationTarget) => void;
  selectedProductId: string | null;
  navigateToProduct: (productId: string) => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  user: UserProfile | null;
  login: (email: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;

  orders: Order[];
  createOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  lastCompletedOrder: Order | null;
  setLastCompletedOrder: (order: Order | null) => void;

  toasts: ToastMessage[];
  addToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  recentlyViewedIds: string[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state with localStorage caching
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('aura_products');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aura_cart');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'prod-002-Brushed Brass',
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        selectedColor: INITIAL_PRODUCTS[1].colors[0]
      }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aura_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['prod-001', 'prod-003'];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('aura_orders');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ORDERS;
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('aura_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEMO_USER;
  });

  const [currency, setCurrency] = useState<Currency>('USD');
  const [currentView, setCurrentView] = useState<NavigationTarget>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(['prod-001', 'prod-002', 'prod-003']);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist state changes
  useEffect(() => {
    try {
      localStorage.setItem('aura_products', JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_user', JSON.stringify(user));
    } catch {}
  }, [user]);

  // Toast dispatch helper
  const addToast = (title: string, message?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Price formatting with active currency
  const formatPrice = (priceInUSD: number): string => {
    const config = CURRENCY_CONFIGS[currency];
    const converted = priceInUSD * config.rate;
    return `${config.symbol}${Math.round(converted).toLocaleString()}`;
  };

  // Cart operations
  const addToCart = (
    product: Product,
    quantity: number = 1,
    color?: ProductVariantColor,
    size?: string
  ) => {
    const activeColor = color || product.colors[0];
    const cartItemId = `${product.id}-${activeColor.name}-${size || 'default'}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          quantity,
          selectedColor: activeColor,
          selectedSize: size
        }
      ];
    });

    addToast(`Added to Bag`, `${product.name} (${activeColor.name})`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    addToast('Item Removed', 'The item was removed from your bag.', 'info');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Coupon handling
  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'AURA15') {
      setCouponCode('AURA15');
      setDiscountPercentage(15);
      addToast('Promo Applied', '15% luxury curation discount applied.');
      return { success: true, message: '15% discount applied.' };
    }
    if (trimmed === 'WELCOME10') {
      setCouponCode('WELCOME10');
      setDiscountPercentage(10);
      addToast('Promo Applied', '10% welcome discount applied.');
      return { success: true, message: '10% welcome discount applied.' };
    }
    if (trimmed === 'VIP20') {
      setCouponCode('VIP20');
      setDiscountPercentage(20);
      addToast('VIP Access', '20% collector tier discount applied.');
      return { success: true, message: '20% collector discount applied.' };
    }
    addToast('Invalid Code', 'Try AURA15 or WELCOME10', 'error');
    return { success: false, message: 'Code not recognized.' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercentage(0);
    addToast('Promo Removed', 'Discount removed from bag.', 'info');
  };

  // Cart calculations
  const freeShippingThreshold = 150;
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartDiscount = (cartSubtotal * discountPercentage) / 100;
  const cartShipping = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 25;
  const cartTax = Number(((cartSubtotal - cartDiscount) * 0.08).toFixed(2));
  const cartTotal = Number((cartSubtotal - cartDiscount + cartShipping + cartTax).toFixed(2));
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const product = products.find(p => p.id === productId);
    const productName = product ? product.name : 'Item';

    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from Wishlist', `${productName} removed.`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast('Saved to Wishlist', `${productName} saved to your curated list.`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Navigation & Product Detail View
  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Track recently viewed
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 6);
    });
  };

  // Review submission
  const addReviewToProduct = (productId: string, review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: 'rev-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      verified: true
    };

    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const updatedReviews = [newReview, ...(p.reviewsList || [])];
          const newAvgRating = Number(
            (
              updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
              updatedReviews.length
            ).toFixed(1)
          );
          return {
            ...p,
            rating: newAvgRating,
            reviewCount: updatedReviews.length,
            reviewsList: updatedReviews
          };
        }
        return p;
      })
    );
    addToast('Review Submitted', 'Thank you for sharing your experience.');
  };

  // User Profile & Authentication
  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role,
      addresses: DEMO_USER.addresses,
      paymentMethods: DEMO_USER.paymentMethods
    };
    setUser(newUser);
    addToast(`Signed in as ${newUser.name}`, role === 'admin' ? 'Store Administrator mode' : 'Welcome back');
  };

  const logout = () => {
    setUser(null);
    setCurrentView('home');
    addToast('Signed Out', 'You have been safely signed out.', 'info');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    setUser(prev => (prev ? { ...prev, ...updates } : null));
    addToast('Profile Updated', 'Your changes have been saved.');
  };

  // Orders
  const createOrder = (orderData: Partial<Order>): Order => {
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: 'AUR-' + Math.floor(10000 + Math.random() * 90000),
      date: new Date().toISOString().split('T')[0],
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        colorName: item.selectedColor.name,
        size: item.selectedSize,
        price: item.product.price,
        quantity: item.quantity
      })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      tax: cartTax,
      total: cartTotal,
      status: 'processing',
      shippingAddress: orderData.shippingAddress || (user?.addresses[0] as any),
      paymentMethod: orderData.paymentMethod || 'Credit Card ending in 4242',
      trackingNumber: '1Z' + Math.floor(100000000000 + Math.random() * 900000000000),
      estimatedDelivery: '3–5 Business Days'
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastCompletedOrder(newOrder);
    clearCart();
    removeCoupon();
    addToast('Order Placed Successfully', `Confirmation #${newOrder.orderNumber}`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
    addToast('Order Status Updated', `Order marked as ${status}.`);
  };

  // Product CRUD (Admin)
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: 'prod-' + Date.now()
    };
    setProducts(prev => [newProduct, ...prev]);
    addToast('Product Added', `${newProduct.name} has been published.`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    addToast('Product Updated', 'Changes saved to live storefront.');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast('Product Deleted', 'Item removed from catalog.', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        addReviewToProduct,

        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,

        couponCode,
        discountPercentage,
        applyCoupon,
        removeCoupon,

        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTax,
        cartTotal,
        cartItemCount,
        freeShippingThreshold,

        wishlist,
        toggleWishlist,
        isInWishlist,

        currency,
        setCurrency,
        formatPrice,

        currentView,
        setCurrentView,
        selectedProductId,
        navigateToProduct,

        quickViewProduct,
        setQuickViewProduct,

        user,
        login,
        logout,
        updateProfile,

        orders,
        createOrder,
        updateOrderStatus,
        lastCompletedOrder,
        setLastCompletedOrder,

        toasts,
        addToast,
        removeToast,

        recentlyViewedIds,
        searchQuery,
        setSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        isSearchOpen,
        setIsSearchOpen
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
