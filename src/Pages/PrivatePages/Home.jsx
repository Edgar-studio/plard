import React, { useEffect, useState } from "react";
import { FiPlus, FiFilter, FiX } from "react-icons/fi";
import Header from "../../Components/Header.jsx";
import axios from "axios";
import ImageUploading from 'react-images-uploading';


const Home = () => {
    const [items, setItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState("ring");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [catModalOpen, setCatModalOpen] = useState(false);


    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };


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


    const [filters, setFilters] = useState({
        dateFrom: "",
        dateTo: "",
        priceFrom: "",
        priceTo: "",
    });
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams({
                    category: activeCategory,
                    q: searchQuery,
                    ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
                    ...(filters.dateTo && { dateTo: filters.dateTo }),
                    ...(filters.priceFrom && { priceFrom: filters.priceFrom }),
                    ...(filters.priceTo && { priceTo: filters.priceTo }),
                });

                const response = await fetch(
                    `http://localhost:4000/items?${queryParams.toString()}`
                );
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchItems, 300);
        return () => clearTimeout(debounceTimer);
    }, [activeCategory, searchQuery, filters]);

    const handleFilterChange = (e) => {
        const { id, value } = e.target;
        setFilters((prev) => ({ ...prev, [id]: value }));
    };

    const resetFilters = () => {
        setFilters({
            dateFrom: "",
            dateTo: "",
            priceFrom: "",
            priceTo: "",
        });
    };

    const applyFilters = () => {
        setMobileFiltersOpen(false);
    };

    const onLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };




    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onLogout={onLogout}
            />

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
                    <div className='relative overflow-y-hidden z-30'>
                        <button
                            onClick={() => {
                                setCatModalOpen(!catModalOpen);

                            }}
                            className="flex items-center rounded-lg bg-red-600
                            px-3 py-2 text-sm font-medium text-gray-700">
                            <FiPlus className="mr-1" size={16} />
                            Добавить
                        </button>
                        {catModalOpen && (
                            <div
                                className='absolute top-0 left-0 p-4 z-[200]
                                 mt-2 text-black
                                 bg-red-500 shadow-md rounded-lg'>
                                Modal
                            </div>
                        )}
                    </div>

                </div>
            </nav>

            <button
                onClick={() => setMobileFiltersOpen(true)}
                className="md:hidden fixed bottom-6 right-6 z-10 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
                aria-label="Open filters"
            >
                <FiFilter size={24} />
            </button>

            <div className="flex max-w-[1280px] mx-auto">
                <aside className="hidden w-72 flex-col border-r bg-white p-6 gap-6 md:flex">
                    <header className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Фильтр</h2>
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="text-sm text-blue-600 hover:underline focus:outline-none focus:ring-1 focus:ring-blue-600 rounded"
                        >
                            Сброс
                        </button>
                    </header>

                    <div className="space-y-4">
                        <label htmlFor="dateFrom" className="block text-xs font-medium mb-1">
                            Дата от
                        </label>
                        <input
                            type="date"
                            id="dateFrom"
                            value={filters.dateFrom}
                            onChange={handleFilterChange}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label htmlFor="dateTo" className="block text-xs font-medium mb-1">
                            Дата до
                        </label>
                        <input
                            type="date"
                            id="dateTo"
                            value={filters.dateTo}
                            onChange={handleFilterChange}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="priceFrom" className="block text-xs font-medium mb-1">
                            Цена от
                        </label>
                        <input
                            type="number"
                            id="priceFrom"
                            placeholder="От"
                            value={filters.priceFrom}
                            onChange={handleFilterChange}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label htmlFor="priceTo" className="block text-xs font-medium mb-1">
                            Цена до
                        </label>
                        <input
                            type="number"
                            id="priceTo"
                            placeholder="До"
                            value={filters.priceTo}
                            onChange={handleFilterChange}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={applyFilters}
                        className="mt-auto rounded-md bg-blue-600 py-2 text-white font-medium transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Применить
                    </button>
                </aside>

                {mobileFiltersOpen && (
                    <div className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden">
                        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
                            <div className="p-4 flex justify-between items-center border-b">
                                <h2 className="text-lg font-semibold">Фильтры</h2>
                                <button
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>
                            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-60px)]">
                                <div className="space-y-4">
                                    <label htmlFor="mobileDateFrom" className="block text-sm font-medium">
                                        Дата от
                                    </label>
                                    <input
                                        type="date"
                                        id="mobileDateFrom"
                                        value={filters.dateFrom}
                                        onChange={handleFilterChange}
                                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label htmlFor="mobileDateTo" className="block text-sm font-medium">
                                        Дата до
                                    </label>
                                    <input
                                        type="date"
                                        id="mobileDateTo"
                                        value={filters.dateTo}
                                        onChange={handleFilterChange}
                                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="mobilePriceFrom" className="block text-sm font-medium">
                                        Цена от
                                    </label>
                                    <input
                                        type="number"
                                        id="mobilePriceFrom"
                                        placeholder="От"
                                        value={filters.priceFrom}
                                        onChange={handleFilterChange}
                                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="mobilePriceTo" className="block text-sm font-medium">
                                        Цена до
                                    </label>
                                    <input
                                        type="number"
                                        id="mobilePriceTo"
                                        placeholder="До"
                                        value={filters.priceTo}
                                        onChange={handleFilterChange}
                                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                    />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
                                <div className="flex gap-3">
                                    <button
                                        onClick={resetFilters}
                                        className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Сбросить
                                    </button>
                                    <button
                                        onClick={applyFilters}
                                        className="flex-1 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700"
                                    >
                                        Применить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <main className="flex-1 p-4 md:p-6">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center text-gray-500">
                            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                            Загрузка...
                        </div>
                    ) : items.length === 0 ? (
                        <div className="col-span-full py-20 text-center text-gray-500">
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={onChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                            >
                                {({
                                      imageList,
                                      onImageUpload,
                                      onImageRemoveAll,
                                      onImageUpdate,
                                      onImageRemove,
                                      isDragging,
                                      dragProps,
                                  }) => (
                                    // write your building UI
                                    <div className="upload__image-wrapper">
                                        <button
                                            style={isDragging ? { color: 'red' } : undefined}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            Click or Drop here
                                        </button>
                                        &nbsp;
                                        <button onClick={onImageRemoveAll}>Remove all images</button>
                                        {imageList.map((image, index) => (
                                            <div key={index} className="image-item">
                                                <img src={image['data_url']} alt="" width="100" />
                                                <div className="image-item__btn-wrapper">
                                                    <button onClick={() => onImageUpdate(index)}>Update</button>
                                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ImageUploading>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {items.map(({ id, image, title, price, sku }) => (
                                <article
                                    key={id}
                                    className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
                                >
                                    <div className="relative h-48 overflow-hidden bg-gray-100">
                                        <img
                                            src={image || "https://via.placeholder.com/300x220?text=No+Image"}
                                            alt={title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            onError={(e) =>
                                                (e.currentTarget.src =
                                                    "https://via.placeholder.com/300x220?text=No+Image")
                                            }
                                        />
                                        <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                           {price}$
                                    </span>
                                    </div>
                                    <div className="flex flex-1 flex-col p-4">
                                        <span className="text-xs text-gray-500 mb-1">{sku}</span>
                                        <h3 className="text-sm font-semibold mb-3 line-clamp-2">{title}</h3>
                                        <button
                                            type="button"
                                            className="mt-auto w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Подробнее
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Home;