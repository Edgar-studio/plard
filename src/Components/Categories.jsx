import React, { useEffect, useState } from 'react';
import { FiPlus, FiX } from "react-icons/fi";
import axios from "axios";

const Categories = ({ activeCategory, setActiveCategory, onItemAdded }) => {
    const [categories, setCategories] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newItem, setNewItem] = useState({
        title: "",
        price: "",
        sku: "",
        category: activeCategory,
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:4000/categories");
                setCategories(response.data);
            } catch (e) {
                console.log(e.message);
            }
        };
        fetchCategories();
    }, []);

    const handleInputChange = (field, value) => {
        setNewItem((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddItem = async () => {
        try {
            await axios.post("http://localhost:4000/items", newItem);
            setShowAddModal(false);
            setNewItem({
                title: "",
                price: "",
                sku: "",
                category: activeCategory,
            });
            if (onItemAdded) onItemAdded(); // 🔑 tell Home to refetch
        } catch (error) {
            console.error("Error adding item:", error);
            alert("Не удалось добавить товар");
        }
    };

    return (
        <nav className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`whitespace-nowrap rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200 ${
                            activeCategory === category.id
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                        }`}
                    >
                        {category.name}
                    </button>
                ))}

                {/* Add New Item Button */}
                <div className="relative">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200"
                    >
                        <FiPlus className="w-4 h-4" />
                        Добавить
                    </button>

                    {/* Modal */}
                    {showAddModal && (
                        <>
                            {/* Backdrop */}
                            <div
                                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                                onClick={() => setShowAddModal(false)}
                            />

                            {/* Modal Content */}
                            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-xl shadow-2xl border min-w-[320px] z-50">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold text-gray-800">Добавить товар</h3>
                                    <button
                                        onClick={() => setShowAddModal(false)}
                                        className="p-1 hover:bg-gray-100 rounded-full transition-all"
                                    >
                                        <FiX className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <input
                                        placeholder="Название товара"
                                        value={newItem.title}
                                        onChange={(e) =>
                                            handleInputChange("title", e.target.value)
                                        }
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                    <input
                                        placeholder="Артикул (SKU)"
                                        value={newItem.sku}
                                        onChange={(e) =>
                                            handleInputChange("sku", e.target.value)
                                        }
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                    <input
                                        placeholder="Цена"
                                        type="number"
                                        value={newItem.price}
                                        onChange={(e) =>
                                            handleInputChange("price", e.target.value)
                                        }
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />

                                    {/* Category select */}
                                    <select
                                        value={newItem.category}
                                        onChange={(e) =>
                                            handleInputChange("category", e.target.value)
                                        }
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="flex gap-3 pt-2">
                                        <button
                                            onClick={() => setShowAddModal(false)}
                                            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                                        >
                                            Отмена
                                        </button>
                                        <button
                                            onClick={handleAddItem}
                                            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                                        >
                                            Добавить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Categories;
