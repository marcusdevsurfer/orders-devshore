"use client";
import { useState } from "react";

const mockProducts = [
    // Pizzas
    {
        id: 1,
        name: "Pizza Margherita",
        description: "Salsa de tomate, mozzarella, albahaca fresca",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Pizzas"
    },
    {
        id: 2,
        name: "Pizza Pepperoni",
        description: "Salsa de tomate, mozzarella, pepperoni picante",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Pizzas"
    },
    {
        id: 3,
        name: "Pizza Hawaiana",
        description: "Salsa de tomate, mozzarella, jamón, piña",
        price: 15.99,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Pizzas"
    },
    // Hamburguesas
    {
        id: 4,
        name: "Hamburguesa Clásica",
        description: "Carne de res, lechuga, tomate, cebolla y salsa especial",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Hamburguesas"
    },
    {
        id: 5,
        name: "Hamburguesa Doble",
        description: "Doble carne, doble queso, bacon, salsa BBQ",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1586816001966-79b736744398?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Hamburguesas"
    },
    {
        id: 6,
        name: "Hamburguesa Vegetariana",
        description: "Medallón de garbanzos, aguacate, espinacas, salsa de yogur",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Hamburguesas"
    },
    // Sushi
    {
        id: 7,
        name: "Roll California",
        description: "Cangrejo, aguacate, pepino, tobiko",
        price: 11.99,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Sushi"
    },
    {
        id: 8,
        name: "Roll Tempura",
        description: "Camarón tempura, aguacate, salsa de anguila",
        price: 13.99,
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Sushi"
    },
    {
        id: 9,
        name: "Roll Salmón",
        description: "Salmón fresco, aguacate, cebollín",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Sushi"
    },
    // Ensaladas
    {
        id: 10,
        name: "Ensalada César",
        description: "Lechuga romana, pollo a la parrilla, crutones, parmesano",
        price: 7.99,
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Ensaladas"
    },
    {
        id: 11,
        name: "Ensalada Griega",
        description: "Lechuga, tomate, pepino, aceitunas, queso feta",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Ensaladas"
    },
    {
        id: 12,
        name: "Ensalada de Atún",
        description: "Lechuga, atún fresco, aguacate, tomate cherry",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Ensaladas"
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
    const [selectedCategory, setSelectedCategory] = useState("Pizzas");

    // Agrupar productos por categoría
    const productsByCategory = mockProducts.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    const categories = Object.keys(productsByCategory);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-8">
            {/* Productos */}
            <div className="xl:col-span-2">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">Nuestro Menú</h2>
                
                {/* Categorías */}
                <div className="flex space-x-2 md:space-x-4 mb-4 md:mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full whitespace-nowrap transition-colors text-sm md:text-base ${
                                selectedCategory === category
                                    ? "bg-blue-800 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Productos de la categoría seleccionada */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {productsByCategory[selectedCategory].map((product) => {
                        const quantity = getProductQuantity(product.id);
                        return (
                            <div key={product.id} className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg overflow-hidden border border-gray-100">
                                <div className="flex">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-24 h-24 md:w-32 md:h-32 object-cover"
                                    />
                                    <div className="p-3 md:p-4 flex-1">
                                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                                        <p className="text-xs md:text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-base md:text-lg font-bold text-blue-800">${product.price}</span>
                                            {quantity === 0 ? (
                                                <button
                                                    onClick={() => onAddToCart(product)}
                                                    className="bg-blue-800 text-white px-2 md:px-3 py-1 rounded-lg hover:bg-blue-900 transition-colors text-xs md:text-sm"
                                                >
                                                    Agregar
                                                </button>
                                            ) : (
                                                <div className="flex items-center gap-1 md:gap-2">
                                                    <button
                                                        onClick={() => onRemoveFromCart(product.id)}
                                                        className="bg-gray-100 text-gray-700 px-1.5 md:px-2 py-1 rounded-lg hover:bg-gray-200 transition-colors text-xs md:text-sm"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="font-semibold text-sm md:text-base">{quantity}</span>
                                                    <button
                                                        onClick={() => onAddToCart(product)}
                                                        className="bg-blue-800 text-white px-1.5 md:px-2 py-1 rounded-lg hover:bg-blue-900 transition-colors text-xs md:text-sm"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Carrito */}
            <div className="xl:sticky xl:top-24">
                <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg p-3 md:p-4">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                        <h2 className="text-base md:text-lg font-semibold text-gray-800">Tu Pedido</h2>
                        <span className="text-xs md:text-sm text-gray-500">{cart.length} items</span>
                    </div>
                    <div className="space-y-1.5 md:space-y-2 max-h-[50vh] md:max-h-[calc(100vh-300px)] overflow-y-auto">
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg text-xs md:text-sm">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                                    <div className="flex items-center gap-1 md:gap-2">
                                        <span className="text-gray-600">x{item.quantity}</span>
                                        <span className="text-gray-600">·</span>
                                        <span className="text-gray-600">${item.price}</span>
                                    </div>
                                </div>
                                <p className="font-semibold text-gray-900 ml-2">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 pt-2 md:pt-3 mt-2 md:mt-3">
                        <div className="flex justify-between items-center mb-2 md:mb-3">
                            <span className="font-semibold text-gray-900">Total</span>
                            <span className="text-lg md:text-xl font-bold text-blue-800">${cartTotal.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={onNextStep}
                            disabled={cart.length === 0}
                            className={`w-full py-1.5 md:py-2 px-3 md:px-4 rounded-lg text-sm md:text-base font-semibold transition-colors ${
                                cart.length === 0
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-blue-800 text-white hover:bg-blue-900"
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