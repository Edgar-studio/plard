import React, { useEffect, useState } from "react";

const tabs = ["Ring", "Wedding", "Cocktail", "Engagement"];

const Home = () => {
    const [items, setItems] = useState([]);
    const [active, setActive] = useState("Ring");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3001/items?category=${encodeURIComponent(active)}`)
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [active]);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="hidden w-72 flex-col border-r bg-white p-6 gap-6 md:flex">
                <header className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Фильтр</h2>
                    <button
                        type="button"
                        className="text-sm text-blue-600 hover:underline focus:outline-none focus:ring-1 focus:ring-blue-600 rounded"
                    >
                        Сброс
                    </button>
                </header>

                <div className="space-y-4">
                    <label htmlFor="date-from" className="block text-xs font-medium mb-1">
                        Дата от
                    </label>
                    <input
                        type="date"
                        id="date-from"
                        aria-label="From date"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label htmlFor="date-to" className="block text-xs font-medium mb-1">
                        Дата до
                    </label>
                    <input
                        type="date"
                        id="date-to"
                        aria-label="To date"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="price-from" className="block text-xs font-medium mb-1">
                        Цена от
                    </label>
                    <input
                        type="number"
                        id="price-from"
                        placeholder="От"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label htmlFor="price-to" className="block text-xs font-medium mb-1">
                        Цена до
                    </label>
                    <input
                        type="number"
                        id="price-to"
                        placeholder="До"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="button"
                    className="mt-auto rounded-md bg-blue-600 py-2 text-white font-medium transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Сохранить
                </button>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6">
                {/* Tabs */}
                <nav
                    aria-label="Категории"
                    className="mb-6 flex overflow-x-auto gap-4"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActive(tab)}
                            aria-pressed={active === tab}
                            className={`whitespace-nowrap rounded-t-lg border-b-2 px-6 py-2 text-sm font-medium transition focus:outline-none ${
                                active === tab
                                    ? "border-blue-600 bg-white text-blue-600"
                                    : "border-transparent text-gray-700 hover:text-blue-600"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}

                    <button
                        type="button"
                        aria-label="Добавить категорию"
                        className="whitespace-nowrap rounded-lg bg-gray-200 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300 focus:outline-none"
                    >
                        +
                    </button>
                </nav>

                {/* Loading / Items */}
                {loading ? (
                    <div className="py-20 text-center text-gray-500">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-gray-500">
                        Нет товаров в этой категории.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        {items.map(({ id, image, title, price }) => (
                            <article
                                key={id}
                                tabIndex={0}
                                className="card flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <div className="h-44 overflow-hidden bg-gray-100">
                                    <img
                                        src={"../../assets/images"}
                                        alt={title}
                                        loading="lazy"
                                        className="h-full w-full object-cover"
                                        onError={(e) =>
                                            (e.currentTarget.src =
                                                "https://via.placeholder.com/300x220?text=No+Image")
                                        }
                                    />
                                </div>
                                <div className="flex flex-1 flex-col p-3">
                                    <div className="mb-1 text-[10px] text-gray-500">A555</div>
                                    <h3 className="flex-1 truncate text-sm font-semibold">{title}</h3>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-base font-bold">{price}$</span>
                                        <button
                                            type="button"
                                            className="rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
