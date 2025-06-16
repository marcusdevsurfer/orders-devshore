"use client";

const mockProducts = [
    {
        id: 1,
        name: "Hamburguesa Clásica",
        description: "Carne de res, lechuga, tomate, cebolla y salsa especial",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        name: "Pizza Margherita",
        description: "Salsa de tomate, mozzarella, albahaca fresca",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        name: "Ensalada César",
        description: "Lechuga romana, pollo a la parrilla, crutones, parmesano",
        price: 7.99,
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
];

export default function ProductSelection({ 
    cart, 
    cartTotal, 
    onAddToCart, 
    onRemoveFromCart, 
    getProductQuantity, 
    onNextStep 
}) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Productos */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Nuestro Menú</h2>
                <div className="space-y-6">
                    {mockProducts.map((product) => {
                        const quantity = getProductQuantity(product.id);
                        return (
                            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                                    <p className="text-gray-600 mb-4">{product.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-blue-800">${product.price}</span>
                                        {quantity === 0 ? (
                                            <button
                                                onClick={() => onAddToCart(product)}
                                                className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
                                            >
                                                Agregar
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => onRemoveFromCart(product.id)}
                                                    className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="font-semibold">{quantity}</span>
                                                <button
                                                    onClick={() => onAddToCart(product)}
                                                    className="bg-blue-800 text-white px-3 py-2 rounded-lg hover:bg-blue-900 transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Carrito */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tu Pedido</h2>
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                                    <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                                </div>
                                <p className="font-semibold text-gray-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                        <div className="border-t border-gray-200 pt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-semibold text-gray-900">Total</span>
                                <span className="text-2xl font-bold text-blue-800">${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <button
                            onClick={onNextStep}
                            disabled={cart.length === 0}
                            className={`w-full py-3 px-6 rounded-xl text-lg font-semibold transition-colors shadow-lg ${
                                cart.length === 0
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-blue-800 text-white hover:bg-blue-900 hover:shadow-xl"
                            }`}
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 