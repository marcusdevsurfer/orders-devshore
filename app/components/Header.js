export default function Header({ cartCount = 0 }) {
    return (
        <header className="flex items-center justify-between py-4 px-6 bg-white shadow mb-8 rounded-xl">
            <h1 className="text-2xl font-bold text-gray-800">Orders App</h1>
            <div className="relative flex items-center">
                <i className="bi bi-cart text-3xl"></i>
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                        {cartCount}
                    </span>
                )}
            </div>
        </header>
    );
}