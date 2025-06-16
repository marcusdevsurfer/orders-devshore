// Funciones para manejar el carrito en localStorage
export const getCart = () => {
    if (typeof window !== 'undefined') {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }
    return [];
};

export const saveCart = (cart) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
};

export const addToCart = (product) => {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart(cart);
    return cart;
};

export const removeFromCart = (productId) => {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity === 1) {
            const newCart = cart.filter(item => item.id !== productId);
            saveCart(newCart);
            return newCart;
        } else {
            existingItem.quantity -= 1;
            saveCart(cart);
            return cart;
        }
    }
    
    return cart;
};

export const getProductQuantity = (productId) => {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
};

export const getCartCount = () => {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
};

export const getCartTotal = () => {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const clearCart = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
    }
}; 