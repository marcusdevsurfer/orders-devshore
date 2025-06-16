"use client";

import { useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para los íconos de Leaflet en Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const defaultCenter = {
    //Manzanillo,Colima
    lat: 19.11695,
    lng: -104.34214
};

// Componente para manejar los eventos del mapa
function MapEvents({ onLocationSelect }) {
    useMapEvents({
        click: (e) => {
            onLocationSelect(e.latlng);
        },
    });
    return null;
}

export default function DeliveryInfo({ formData, onUpdateFormData, onNextStep, onPrevStep }) {
    const [marker, setMarker] = useState(formData.location || defaultCenter);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        // Obtener el carrito del localStorage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            setCart(parsedCart);
            
            // Calcular el total
            const total = parsedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            setCartTotal(total);
        }
    }, []);

    const getAddressFromCoordinates = async (lat, lng) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            return data.display_name;
        } catch (error) {
            console.error('Error getting address:', error);
            return '';
        }
    };

    const handleLocationSelect = useCallback(async (latlng) => {
        const newLocation = {
            lat: latlng.lat,
            lng: latlng.lng
        };
        setMarker(newLocation);
        
        // Obtener la dirección del lugar seleccionado
        const address = await getAddressFromCoordinates(latlng.lat, latlng.lng);
        setSelectedAddress(address);
        
        onUpdateFormData({ 
            location: newLocation,
            address: address,
            coordinates: `${latlng.lat.toFixed(6)},${latlng.lng.toFixed(6)}` // Guardamos las coordenadas formateadas
        });
    }, [onUpdateFormData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Crear el mensaje de WhatsApp
        const whatsappMessage = `🍽️ *Nuevo Pedido* 🍽️

👤 *Información del Cliente:*
• Nombre: ${formData.customerName}
• Teléfono: ${formData.phone}

📍 *Detalles de Entrega:*
• Dirección: ${formData.address}
• Ubicación: https://www.google.com/maps?q=${marker.lat},${marker.lng}
${formData.notes ? `• Notas: ${formData.notes}` : ''}

🛒 *Productos:*
${cart.map(item => `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

💰 *Total:* $${cartTotal.toFixed(2)}`;

        // Crear la URL de WhatsApp
        const whatsappUrl = `https://wa.me/${'+523143536214'}?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Abrir WhatsApp en una nueva pestaña
        window.open(whatsappUrl, '_blank');
        
        // Continuar con el flujo normal
        onNextStep();
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tipo de Entrega</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    <div className="space-y-4">
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
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Selecciona tu ubicación exacta en el mapa
                            </label>
                            <div className="mt-2 h-[300px] rounded-lg overflow-hidden border border-gray-300">
                                <MapContainer
                                    center={[marker.lat, marker.lng]}
                                    zoom={15}
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[marker.lat, marker.lng]} />
                                    <MapEvents onLocationSelect={handleLocationSelect} />
                                </MapContainer>
                            </div>
                            {selectedAddress && (
                                <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">Ubicación seleccionada:</span> {selectedAddress}
                                    </p>
                                    <p className="text-sm text-gray-700 mt-1">
                                        <span className="font-medium">Coordenadas:</span> {marker.lat.toFixed(6)}, {marker.lng.toFixed(6)}
                                    </p>
                                </div>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                Haz clic en el mapa para marcar tu ubicación exacta
                            </p>
                        </div>
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
                        Enviar Pedido por WhatsApp
                    </button>
                </div>
            </form>
        </div>
    );
} 