"use client";

export default function HeroSection({ restaurantName }) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">
                {restaurantName}
            </h1>
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
                Descubre nuestra deliciosa selección de platillos preparados con los mejores ingredientes
            </p>
        </div>
    );
} 