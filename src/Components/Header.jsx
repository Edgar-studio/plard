import React, { useState } from "react";

const categories = [
    { key: "Ring", label: "Кольцо" },
    { key: "Necklace", label: "Колье" },
    { key: "Earrings", label: "Серьги" },
    { key: "Chain", label: "Цепь" },
    { key: "Brooch", label: "Брошь" },
    { key: "Pendant", label: "Кулоны" },
    { key: "Bracelet", label: "Браслеты" },
];

const Header = () => {
    const [activeCategory, setActiveCategory] = useState("Ring");
    const [search, setSearch] = useState("");

    const onLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <header className="sticky top-0 z-30 w-full bg-white border-b shadow-sm">
            <div className="max-w-[1280px] mx-auto flex flex-wrap items-center gap-6 py-3 px-4">
                {/* Search */}
                <div className="relative flex-1 min-w-[220px]">
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Поиск"
                        aria-label="Search"
                        className="w-full rounded-full border border-gray-300 py-3 px-5 pl-12 text-sm placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Category Pills */}
                <nav
                    aria-label="Категории"
                    className="flex gap-2 overflow-x-auto whitespace-nowrap py-2 flex-shrink-0"
                >
                    {categories.map(({ key, label }) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setActiveCategory(key)}
                            className={`flex flex-col items-center min-w-[90px] rounded-lg border p-2 text-xs font-medium transition focus:outline-none cursor-pointer ${
                                activeCategory === key
                                    ? "bg-blue-50 border-blue-600 text-blue-600 shadow-sm"
                                    : "bg-white border-gray-300 text-gray-700 hover:shadow-sm"
                            }`}
                            aria-pressed={activeCategory === key}
                        >
                            <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full border text-base font-semibold">
                                {label[0]}
                            </div>
                            <span>{label}</span>
                        </button>
                    ))}
                    <button
                        type="button"
                        className="flex flex-col items-center min-w-[90px] cursor-pointer select-none rounded-lg border bg-gray-100 p-2 text-xs font-medium text-gray-700 hover:bg-gray-200 transition focus:outline-none"
                        aria-label="Добавить категорию"
                    >
                        <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full text-xl font-bold">
                            +
                        </div>
                        <span>Добавить</span>
                    </button>
                </nav>

                {/* Logout */}
                <div className="ml-auto">
                    <button
                        type="button"
                        onClick={onLogout}
                        className="rounded-md bg-red-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
