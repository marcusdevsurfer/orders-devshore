"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import { getCart, getCartTotal, addToCart, removeFromCart, getProductQuantity } from "../utils/cartStorage";

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

const steps = [
    { id: "products", title: "Selección de Productos" },
    { id: "customer", title: "Información del Cliente" },
    { id: "delivery", title: "Tipo de Entrega" },
    { id: "review", title: "Revisión del Pedido" },
];

export default function RestaurantPage({ params }) {
    const restaurantNameRaw = decodeURIComponent(params.restaurant);
    const restaurantName = restaurantNameRaw
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const [currentStep, setCurrentStep] = useState(0);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [formData, setFormData] = useState({
        customerName: "",
        phone: "",
        orderType: "pickup",
        address: "",
        notes: ""
    });

    useEffect(() => {
        const cartData = getCart();
        setCart(cartData);
        setCartTotal(getCartTotal());
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        const updatedCart = getCart();
        setCart(updatedCart);
        setCartTotal(getCartTotal());
    };

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
        const updatedCart = getCart();
        setCart(updatedCart);
        setCartTotal(getCartTotal());
    };

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const updateFormData = (data) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Pedido final:", { ...formData, products: cart });
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
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
                                                            onClick={() => handleAddToCart(product)}
                                                            className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
                                                        >
                                                            Agregar
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                onClick={() => handleRemoveFromCart(product.id)}
                                                                className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="font-semibold">{quantity}</span>
                                                            <button
                                                                onClick={() => handleAddToCart(product)}
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
                                        onClick={nextStep}
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
            case 1:
                return (
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Información del Cliente</h2>
                        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
                            <div>
                                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre del Cliente
                                </label>
                                <input
                                    type="text"
                                    id="customerName"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={(e) => updateFormData({ customerName: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ingrese el nombre del cliente"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Número de Teléfono
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={(e) => updateFormData({ phone: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ingrese el número de teléfono"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-colors shadow-lg"
                                >
                                    Atrás
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-800 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-blue-900 transition-colors shadow-lg hover:shadow-xl"
                                >
                                    Continuar
                                </button>
                            </div>
                        </form>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tipo de Entrega</h2>
                        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800">¿Cómo deseas recibir tu pedido?</h3>
                                
                                <div className="flex gap-6">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="orderType"
                                            value="pickup"
                                            checked={formData.orderType === "pickup"}
                                            onChange={(e) => updateFormData({ orderType: e.target.value })}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-gray-700">Para Recoger</span>
                                    </label>

                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="orderType"
                                            value="delivery"
                                            checked={formData.orderType === "delivery"}
                                            onChange={(e) => updateFormData({ orderType: e.target.value })}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-gray-700">A Domicilio</span>
                                    </label>
                                </div>
                            </div>

                            {formData.orderType === "delivery" && (
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                        Dirección de Entrega
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={(e) => updateFormData({ address: e.target.value })}
                                        required
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Ingrese la dirección completa de entrega"
                                    />
                                </div>
                            )}

                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                                    Notas Adicionales
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={(e) => updateFormData({ notes: e.target.value })}
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Instrucciones especiales o notas adicionales"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-colors shadow-lg"
                                >
                                    Atrás
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-800 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-blue-900 transition-colors shadow-lg hover:shadow-xl"
                                >
                                    Continuar
                                </button>
                            </div>
                        </form>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Revisión del Pedido</h2>
                        
                        <div className="space-y-8">
                            {/* Información del Cliente */}
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Información del Cliente</h3>
                                <div className="space-y-2">
                                    <p className="text-gray-700">
                                        <span className="font-medium">Nombre:</span> {formData.customerName}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-medium">Teléfono:</span> {formData.phone}
                                    </p>
                                </div>
                            </div>

                            {/* Tipo de Entrega */}
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tipo de Entrega</h3>
                                <div className="space-y-2">
                                    <p className="text-gray-700">
                                        <span className="font-medium">Método:</span>{" "}
                                        {formData.orderType === "pickup" ? "Para Recoger" : "A Domicilio"}
                                    </p>
                                    {formData.orderType === "delivery" && (
                                        <p className="text-gray-700">
                                            <span className="font-medium">Dirección:</span> {formData.address}
                                        </p>
                                    )}
                                    {formData.notes && (
                                        <p className="text-gray-700">
                                            <span className="font-medium">Notas:</span> {formData.notes}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Productos */}
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Productos Seleccionados</h3>
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium text-gray-900">{item.name}</p>
                                                <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-gray-900">Total</span>
                                            <span className="text-xl font-bold text-blue-800">
                                                ${cartTotal.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Botones */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-colors shadow-lg"
                                >
                                    Atrás
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="flex-1 bg-blue-800 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-blue-900 transition-colors shadow-lg hover:shadow-xl"
                                >
                                    Confirmar Pedido
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Header />
            <div className="max-w-7xl mx-auto px-6 py-16 pt-24">
                {/* Hero Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">
                        {restaurantName}
                    </h1>
                    <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
                        Descubre nuestra deliciosa selección de platillos preparados con los mejores ingredientes
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className={`flex-1 text-center ${
                                    index <= currentStep ? "text-blue-800" : "text-gray-400"
                                }`}
                            >
                                <div className="text-sm font-medium">{step.title}</div>
                            </div>
                        ))}
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                        <motion.div
                            className="h-full bg-blue-800 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                {/* Step Content */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}