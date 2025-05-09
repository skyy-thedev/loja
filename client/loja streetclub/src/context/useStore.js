import { create } from 'zustand';

const useStore = create((set, get) => ({
  cart: [],

  // Adiciona um item ao carrinho
  addToCart: (productWithOptions) => {
    const cart = get().cart;

    const { selectedSize, color, stock, id } = productWithOptions;

    // Logs de depuração
    console.log('selectedSize no useStore.js:', selectedSize);
    console.log('product.stock:', stock);

    const isProductAvailable = stock?.[selectedSize];

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
      // Se já existe, incrementa a quantidade
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
      // Se não existe, adiciona com quantidade 1
      set({
        cart: [...cart, { ...productWithOptions, quantity: 1 }],
      });
    }
  },

  // Remove item do carrinho
  removeFromCart: (productId, selectedSize) =>
    set({
      cart: get().cart.filter(
        (item) => !(item.id === productId && item.selectedSize === selectedSize)
      ),
    }),

  // Atualiza quantidade manualmente
  updateQuantity: (productId, selectedSize, quantity) =>
    set({
      cart: get().cart.map((item) =>
        item.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      ),
    }),

  // Limpa o carrinho
  clearCart: () => set({ cart: [] }),
}));

export default useStore;