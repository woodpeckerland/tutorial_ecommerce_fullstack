import { create } from "zustand";

// 1. define product type
export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

// 2. define CartItem with quantity
export interface CartItem {
  product: Product;
  quantity: number;
}

// 3. define Zustand state
export interface CartState {
  resetCart: any;
  items: CartItem[];
  addProduct: (product: Product) => void;
}

// 4. create Zustand
export const useCart = create<CartState>((set) => ({
  items: [],

  addProduct: (product) =>
    // TODO: check if product already exists in cart and increment quantity
    set((state) => ({
      items: [...state.items, { product, quantity: 1 }],
    })),

  resetCart: () => set({ items: [] }),
}));
