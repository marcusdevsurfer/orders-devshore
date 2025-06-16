"use client";
import { motion } from "framer-motion";

const steps = [
    { id: "products", title: "Selección de Productos", icon: "ui-checks-grid" },
    { id: "customer", title: "Información del Cliente", icon: "person" },
    { id: "delivery", title: "Tipo de Entrega", icon: "truck" },
    { id: "review", title: "Revisión del Pedido", icon: "bag-check" },
];

export default function ProgressBar({ currentStep }) {
    return (
        <div className="mb-8">
            <div className="flex justify-between mb-2">
                {steps.map((step, index) => (
                    <div
                        key={step.id}
                        className={`flex-1 text-center ${index <= currentStep ? "text-blue-800" : "text-gray-400"}`}
                    >
                        <i className={`text-sm lg:text-lg  bi bi-${step.icon}`}></i>
                        <div className="text-sm text-wrap lg:text-lg font-medium">{step.title}</div>
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
    );
} 