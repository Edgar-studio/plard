import React, { useEffect, useState, useCallback } from "react";
import { FiFilter, FiX, FiShoppingCart } from "react-icons/fi";
import Header from "../../Components/Header.jsx";
import Categories from "../../Components/Categories.jsx";
import axios from "axios";

const Home = () => {
    const [items, setItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState("ring");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:4000/items");
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    // Filtering
    const filteredItems = items.filter((item) => {
        const matchCategory =
            !activeCategory ||
            (item.category &&
                item.category.toLowerCase() === activeCategory.toLowerCase());

        const matchSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.sku &&
                item.sku.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchCategory && matchSearch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <Categories
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                onItemAdded={fetchItems} // 🔑 refresh items when new added
            />

            <div className="max-w-7xl mx-auto px-4 pb-8">
                {loading ? (
                    <p>Загрузка...</p>
                ) : filteredItems.length === 0 ? (
                    <p>Нет товаров</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-32 h-32 object-cover mb-4"
                                />
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-gray-500">{item.sku}</p>
                                <p className="text-lg font-bold">{item.price}₽</p>
                                <button className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                    <FiShoppingCart /> В корзину
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
