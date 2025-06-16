"use client";

export default function CustomerInfo({ formData, onUpdateFormData, onNextStep, onPrevStep }) {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Información del Cliente</h2>
            <form onSubmit={(e) => { e.preventDefault(); onNextStep(); }} className="space-y-6">
                <div>
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre del Cliente
                    </label>
                    <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={(e) => onUpdateFormData({ customerName: e.target.value })}
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
                        onChange={(e) => onUpdateFormData({ phone: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ingrese el número de teléfono"
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