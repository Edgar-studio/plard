import React, { useState, useEffect } from 'react';
import Categories from "../../Components/Categories.jsx";
import { ShoppingCart, Heart } from 'lucide-react';

const Home = ({ addToCart, favorites, setFavorites, searchQuery, activeCategory, setActiveCategory }) => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mockData = {
                    categories: [
                        { id: "ring", name: "Кольца" },
                        { id: "wedding", name: "Свадебные" },
                        { id: "cocktail", name: "Коктейльные" },
                        { id: "engagement", name: "Помолвочные" }
                    ],
                    items: [
                        { id: 1, title: "A555 Diamond Ring", price: 2500, category: "ring", image: "/assets/ring1.jpg", rating: 4.8, discount: 10, isNew: true, description: "Элегантное кольцо из коллекции A555", sku: "RNG-001" },
                        { id: 2, title: "A555 Gold Ring", price: 2500, category: "ring", image: "/assets/ring2.jpg", rating: 4.7, discount: 0, isNew: false, description: "Классическое кольцо из коллекции A555", sku: "RNG-002" },
                        { id: 3, title: "A555 Platinum Ring", price: 2500, category: "ring", image: "/assets/ring3.jpg", rating: 4.9, discount: 15, isNew: true, description: "Изысканное кольцо из коллекции A555", sku: "RNG-003" },
                        { id: 4, title: "Wedding Diamond Set", price: 5000, category: "wedding", image: "/assets/wedding1.jpg", rating: 4.9, discount: 20, isNew: true, description: "Роскошный свадебный набор", sku: "WDG-001" },
                        { id: 5, title: "Cocktail Ring", price: 1800, category: "cocktail", image: "/assets/cocktail1.jpg", rating: 4.6, discount: 5, isNew: false, description: "Стильное коктейльное кольцо", sku: "CKT-001" },
                        { id: 6, title: "Engagement Ring", price: 3200, category: "engagement", image: "/assets/engagement1.jpg", rating: 4.9, discount: 12, isNew: true, description: "Помолвочное кольцо премиум класса", sku: "ENG-001" }
                    ]
                };

                setCategories(mockData.categories);
                setItems(mockData.items);
                setFilteredItems(mockData.items);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filtered = items;

        if (activeCategory && activeCategory !== 'all') {
            filtered = filtered.filter(item => item.category === activeCategory);
        }

        if (searchQuery) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.sku.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredItems(filtered);
    }, [activeCategory, searchQuery, items]);

    const toggleFavorite = (itemId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(itemId)) {
                newFavorites.delete(itemId);
            } else {
                newFavorites.add(itemId);
            }
            return newFavorites;
        });
    };

    return (
        <div>
            <Categories
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchQuery={searchQuery}
            />

            <div className="grid grid-cols-3 gap-6 p-6">
                {filteredItems.map(item => (
                    <div key={item.id} className="border p-4 rounded-xl shadow-lg">
                        <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-lg" />
                        <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                        <p className="mt-2 font-bold">{item.price}₽</p>
                        <div className="flex justify-between mt-3">
                            <button
                                onClick={() => addToCart(item)}
                                className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                            >
                                <ShoppingCart size={18} /> В корзину
                            </button>
                            <button
                                onClick={() => toggleFavorite(item.id)}
                                className={`px-4 py-2 rounded-lg ${favorites.has(item.id) ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                            >
                                <Heart size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
