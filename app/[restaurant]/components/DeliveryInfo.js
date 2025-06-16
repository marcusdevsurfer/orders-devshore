"use client";

export default function DeliveryInfo({ formData, onUpdateFormData, onNextStep, onPrevStep }) {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tipo de Entrega</h2>
            <form onSubmit={(e) => { e.preventDefault(); onNextStep(); }} className="space-y-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">¿Cómo deseas recibir tu pedido?</h3>
                    
                    <div className="flex gap-6">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="orderType"
                                value="pickup"
                                checked={formData.orderType === "pickup"}
                                onChange={(e) => onUpdateFormData({ orderType: e.target.value })}
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
                                onChange={(e) => onUpdateFormData({ orderType: e.target.value })}
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
                            onChange={(e) => onUpdateFormData({ address: e.target.value })}
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
                        onChange={(e) => onUpdateFormData({ notes: e.target.value })}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Instrucciones especiales o notas adicionales"
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onPrevStep}
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
} 