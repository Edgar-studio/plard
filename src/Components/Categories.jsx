import React, { useEffect, useState } from 'react';
import {FiFilter, FiPlus} from "react-icons/fi";
import axios from "axios";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("ring");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:4000/categories");
                setCategories(await response.data);
            } catch (e) {
                console.log(e.message);
            }
        };
        fetchCategories();
    }, []);

    return (
        <nav className="max-w-[1280px] mx-auto px-4 py-3 border-b">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ${
                            activeCategory === category.id
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        {category.name}
                    </button>
                ))}
                <button className="flex items-center rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">
                    <FiPlus className="mr-1" size={16} />
                    Добавить
                </button>
            </div>
        </nav>
    );
};

export default Categories;
