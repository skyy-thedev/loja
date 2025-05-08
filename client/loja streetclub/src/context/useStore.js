// src/context/useStore.js
import { create } from 'zustand';

const useStore = create((set, get) => ({
  cart: [],

  // Adiciona um item ao carrinho
  addToCart: (product) => {
    const cart = get().cart;
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      // Se já existe, apenas incrementa a quantidade
      set({
        cart: cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      });
    } else {
      // Se não existe, adiciona com quantidade 1
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },

  // Remove item do carrinho
  removeFromCart: (productId) =>
    set({
      cart: get().cart.filter(item => item.id !== productId)
    }),

  // Atualiza quantidade manualmente
  updateQuantity: (productId, quantity) =>
    set({
      cart: get().cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    }),

  // Limpa o carrinho
  clearCart: () => set({ cart: [] }),
}));

export default useStore;