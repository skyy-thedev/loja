import { create } from 'zustand';

const useStore = create((set, get) => ({
  cart: [],

  addToCart: (productWithOptions) => {
    const cart = get().cart;
    const { selectedSize, color, stock, id } = productWithOptions;

    console.log('selectedSize no useStore.js:', selectedSize);
    console.log('product.stock:', stock);

    // Verifica se o stock é um objeto (com tamanhos) ou não
    let isProductAvailable = true;

    if (typeof stock === 'object' && stock !== null) {
      // Para produtos com tamanhos (camiseta, bermuda)
      isProductAvailable = stock[selectedSize] > 0;
    } else if (typeof stock === 'string') {
      // Para produtos com tamanho único (ex: 'Único')
      isProductAvailable = stock === 'Único';
    }

    if (!isProductAvailable) {
      console.log('Produto não disponível.');
      return;
    }

    console.log('Produto disponível.');

    const existing = cart.find(
      (item) =>
        item.id === id &&
        item.color === color &&
        item.selectedSize === selectedSize
    );

    if (existing) {
      set({
        cart: cart.map((item) =>
          item.id === id &&
          item.color === color &&
          item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        cart: [...cart, { ...productWithOptions, quantity: 1 }],
      });
    }
  },

  removeFromCart: (productId, selectedSize) =>
    set({
      cart: get().cart.filter(
        (item) => !(item.id === productId && item.selectedSize === selectedSize)
      ),
    }),

  updateQuantity: (productId, selectedSize, quantity) =>
    set({
      cart: get().cart.map((item) =>
        item.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      ),
    }),

  clearCart: () => set({ cart: [] }),
}));

export default useStore;