export default function Home() {
  const testUsers = [
    {
      name: "Restaurante La Pasta",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&w=400&q=80",
      feedback: "Increíble la facilidad para gestionar nuestros pedidos",
      slug: "restaurante-la-pasta"
    },
    {
      name: "Café del Sol",
      image: "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&w=400&q=80",
      feedback: "Nuestra eficiencia ha mejorado notablemente",
      slug: "cafe-del-sol"
    },
    {
      name: "Pizzería Express",
      image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&w=400&q=80",
      feedback: "La mejor solución para nuestro negocio",
      slug: "pizzeria-express"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Orders App
          </h1>
          <p className="text-xl text-gray-600">
            Tu solución para gestionar pedidos de manera eficiente
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-3xl text-blue-600 mb-4">
              <i className="bi bi-lightning-charge"></i>
            </div>
            <h2 className="text-2xl font-semibold mb-3">Rápido y Eficiente</h2>
            <p className="text-gray-600">
              Procesa pedidos en tiempo real con nuestra interfaz intuitiva y moderna.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-3xl text-green-600 mb-4">
              <i className="bi bi-shield-check"></i>
            </div>
            <h2 className="text-2xl font-semibold mb-3">Seguro y Confiable</h2>
            <p className="text-gray-600">
              Tus datos están protegidos con las más altas medidas de seguridad.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Restaurantes que ya están transformando su negocio</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testUsers.map((user, index) => (
              <a 
                key={index} 
                href={`/${user.slug}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img 
                  src={user.image} 
                  alt={user.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
                  <p className="text-gray-600 italic">"{user.feedback}"</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
