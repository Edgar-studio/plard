import React from "react";

const Header = ({ searchQuery, setSearchQuery, onLogout }) => {
    return (
        <header className="sticky top-0 z-30 w-full bg-white border-b shadow-sm">
            <div className="max-w-[1280px] mx-auto flex items-center gap-6 py-3 px-4">
                {/* Single Search Input */}
                <div className="relative flex-1 min-w-[220px]">
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Поиск"
                        className="w-full rounded-full border border-gray-300 py-3 px-5 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                {/* Logout Button */}
                <button
                    onClick={onLogout}
                    className="ml-auto rounded-md cursor-pointer hover:bg-red-800 bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600"
                >
                    Выйти
                </button>
            </div>
        </header>
    );
};

export default Header;