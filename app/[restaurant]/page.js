import Header from "../components/Header";

const mockProducts = [
    {
        id: 1,
        name: "Pizza Margherita",
        price: 12,
        image:
            "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&w=400&q=80",
    },
    {
        id: 2,
        name: "Pepperoni Pizza",
        price: 14,
        image:
            "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&w=400&q=80",
    },
    {
        id: 3,
        name: "Veggie Pizza",
        price: 13,
        image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    },
];

export default function RestaurantPage({ params }) {
    // Decodifica el nombre del restaurante para evitar %20 en el texto
    const restaurantNameRaw = decodeURIComponent(params.restaurant);

    // Capitaliza la primera letra y la segunda parte del nombre del restaurante si tiene
    const restaurantName = restaurantNameRaw
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
        

    return (
        <>
            <Header cartCount={0} />
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 drop-shadow">
                    Welcome to{" "}
                    <span className="text-green-600">{restaurantName}</span>
                </h1>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Menu</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    {mockProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="rounded-t-xl h-40 object-cover"
                            />
                            <div className="flex-1 flex flex-col justify-between p-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {product.name}
                                    </h3>
                                    <p className="text-green-700 font-semibold text-xl mt-2">
                                        ${product.price}
                                    </p>
                                </div>
                                <button className="mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    Select
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center">
                    <a
                        href={`/${params.restaurant}/create-order`}
                        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow hover:bg-green-700 transition-colors"
                    >
                        Create Order
                    </a>
                </div>
            </div>
        </>
    );
}