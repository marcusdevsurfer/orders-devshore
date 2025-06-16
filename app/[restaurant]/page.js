"use client";
import { useState } from "react";
import Header from "../components/Header";

const mockProducts = [
    {
        id: 1,
        name: "Pizza Margherita",
        price: 12,
        image:
            "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&w=400&q=80",
        description: "Salsa de tomate, mozzarella fresca, albahaca y aceite de oliva"
    },
    {
        id: 2,
        name: "Pepperoni Pizza",
        price: 14,
        image:
            "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&w=400&q=80",
        description: "Salsa de tomate, mozzarella y pepperoni picante"
    },
    {
        id: 3,
        name: "Veggie Pizza",
        price: 13,
        image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
        description: "Mezcla de vegetales frescos sobre masa crujiente"
    },
];

export default function RestaurantPage({ params }) {
    // Decodifica el nombre del restaurante para evitar %20 en el texto
    const restaurantNameRaw = decodeURIComponent(params.restaurant);

    // Capitaliza la primera letra de cada palabra y reemplaza guiones por espacios para mostrar
    const restaurantName = restaurantNameRaw
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
        
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === productId);
            
            if (existingItem.quantity === 1) {
                return prevCart.filter(item => item.id !== productId);
            }
            
            return prevCart.map(item =>
                item.id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        });
    };

    const getProductQuantity = (productId) => {
        const item = cart.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Header cartCount={cartCount} />
            <div className="max-w-6xl mx-auto px-6 py-16 pt-24">
                {/* Hero Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">
                        {restaurantName}
                    </h1>
                    <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
                        Descubre nuestra deliciosa selección de platillos preparados con los mejores ingredientes
                    </p>
                </div>

                {/* Menu Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Nuestro Menú</h2>
                        <a
                            href={`/${params.restaurant}/create-order`}
                            className="hidden md:flex bg-blue-900 text-white text-center px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-900 transition-colors hover:shadow-xl items-center gap-2"
                        >
                            <i className="bi bi-bag-check"></i>
                            Crear Pedido ({cartCount} items)
                        </a>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {mockProducts.map((product) => {
                            const quantity = getProductQuantity(product.id);
                            return (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                                >
                                    <div className="relative">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                                            <span className="text-gray-900 font-bold text-lg">${product.price}</span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-600 mb-6">
                                            {product.description}
                                        </p>
                                        {quantity === 0 ? (
                                            <button 
                                                onClick={() => addToCart(product)}
                                                className="w-full flex items-center justify-center gap-2 bg-blue-800 text-white px-6 py-4 rounded-xl text-lg font-semibold hover:bg-blue-900 transition-colors shadow-md hover:shadow-lg"
                                            >
                                                <i className="bi bi-plus-lg"></i>
                                                Agregar al Carrito
                                            </button>
                                        ) : (
                                            <div className="flex items-center justify-between gap-3">
                                                <button 
                                                    onClick={() => removeFromCart(product.id)}
                                                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-4 rounded-xl hover:bg-gray-200 transition-colors shadow-md"
                                                >
                                                    <i className="bi bi-dash-lg"></i>
                                                    Quitar
                                                </button>
                                                <span className="flex items-center justify-center w-14 h-14 bg-gray-50 rounded-xl font-bold text-gray-700 text-xl">
                                                    {quantity}
                                                </span>
                                                <button 
                                                    onClick={() => addToCart(product)}
                                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-800 text-white px-4 py-4 rounded-xl hover:bg-blue-900 transition-colors shadow-md"
                                                >
                                                    <i className="bi bi-plus-lg"></i>
                                                    Agregar
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Floating Order Button for Mobile */}
                <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
                    <a
                        href={`/${params.restaurant}/create-order`}
                        className="block w-full bg-blue-800 text-white text-center px-8 py-5 rounded-2xl text-xl font-semibold shadow-xl hover:bg-blue-900 transition-colors hover:shadow-2xl"
                    >
                        <i className="bi bi-bag-check mr-2"></i>
                        Crear Pedido ({cartCount} items)
                    </a>
                </div>
            </div>
        </div>
    );
}