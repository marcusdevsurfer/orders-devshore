"use client";
import { motion } from "framer-motion";

const HeroSection = ({ restaurantName }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg md:rounded-xl shadow-sm md:shadow-md p-4 md:p-8 mb-6 md:mb-8"
        >
            <motion.h1 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
                {restaurantName}
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 text-lg mb-6"
            >
                Descubre nuestra selección de productos frescos y de calidad, preparados con los mejores ingredientes.
            </motion.p>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 items-center text-sm text-gray-600"
            >
                <div className="flex items-center gap-1">
                    <i className="bi bi-star-fill text-yellow-400"></i>
                    <span>4.5</span>
                    <span className="text-gray-400">(120 reseñas)</span>
                </div>
                <div className="flex items-center gap-1">
                    <i className="bi bi-clock"></i>
                    <span>25-35 min</span>
                </div>
                <div className="flex items-center gap-1">
                    <i className="bi bi-truck"></i>
                    <span>Envío gratis desde $20</span>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default HeroSection; 