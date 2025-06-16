"use client";

export default function OrderReview({ formData, cart, cartTotal, onPrevStep, onSubmit }) {
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
                            <>
                                <p className="text-gray-700">
                                    <span className="font-medium">Dirección:</span> {formData.address}
                                </p>
                                {formData.location && (
                                    <p className="text-gray-700">
                                        <span className="font-medium">Coordenadas:</span>{" "}
                                        {formData.location.lat.toFixed(6)}, {formData.location.lng.toFixed(6)}
                                    </p>
                                )}
                            </>
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
                        onClick={onPrevStep}
                        className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-colors shadow-lg"
                    >
                        Atrás
                    </button>
                    <button
                        onClick={onSubmit}
                        className="flex-1 bg-blue-800 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-blue-900 transition-colors shadow-lg hover:shadow-xl"
                    >
                        Confirmar Pedido
                    </button>
                </div>
            </div>
        </div>
    );
} 