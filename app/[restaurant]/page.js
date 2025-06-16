"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import { getCart, getCartTotal, addToCart, removeFromCart, getProductQuantity } from "../utils/cartStorage";
import HeroSection from "./components/HeroSection";
import ProgressBar from "./components/ProgressBar";
import ProductSelection from "./components/ProductSelection";
import CustomerInfo from "./components/CustomerInfo";
import DeliveryInfo from "./components/DeliveryInfo";
import OrderReview from "./components/OrderReview";

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
        setCurrentStep((prev) => Math.min(prev + 1, 3));
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
                    <ProductSelection
                        cart={cart}
                        cartTotal={cartTotal}
                        onAddToCart={handleAddToCart}
                        onRemoveFromCart={handleRemoveFromCart}
                        getProductQuantity={getProductQuantity}
                        onNextStep={nextStep}
                    />
                );
            case 1:
                return (
                    <CustomerInfo
                        formData={formData}
                        onUpdateFormData={updateFormData}
                        onNextStep={nextStep}
                        onPrevStep={prevStep}
                    />
                );
            case 2:
                return (
                    <DeliveryInfo
                        formData={formData}
                        onUpdateFormData={updateFormData}
                        onNextStep={nextStep}
                        onPrevStep={prevStep}
                    />
                );
            case 3:
                return (
                    <OrderReview
                        formData={formData}
                        cart={cart}
                        cartTotal={cartTotal}
                        onPrevStep={prevStep}
                        onSubmit={handleSubmit}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Header />
            <div className="max-w-7xl mx-auto px-6 py-16 pt-24">
                <HeroSection restaurantName={restaurantName} />
                <ProgressBar currentStep={currentStep} />

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