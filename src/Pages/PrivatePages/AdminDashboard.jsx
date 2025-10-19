import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Package, 
  Tag, 
  Plus, 
  Edit, 
  Trash2, 
  Upload,
  Save,
  X,
  ArrowLeft,
  Image as ImageIcon
} from 'lucide-react';
import { 
  fetchCategoriesAdmin, 
  fetchProductsAdmin, 
  createCategory, 
  updateCategory, 
  deleteCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  setActiveTab,
  clearError
} from '../../store/slices/adminSlice';
import { imageUploadService } from '../../services/imageUploadService';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, products, isLoading, error, activeTab } = useSelector(state => state.admin);
  
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [categoryForm, setCategoryForm] = useState({
    id: '',
    name: ''
  });

  const [productForm, setProductForm] = useState({
    id: '',
    title: '',
    price: '',
    category: '',
    image: '',
    rating: 4.5,
    discount: 0,
    isNew: false,
    description: '',
    sku: ''
  });

  useEffect(() => {
    dispatch(fetchCategoriesAdmin());
    dispatch(fetchProductsAdmin());
  }, [dispatch]);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (editingCategory) {
      dispatch(updateCategory({ id: editingCategory.id, data: categoryForm }));
    } else {
      dispatch(createCategory(categoryForm));
    }
    setShowCategoryModal(false);
    setEditingCategory(null);
    setCategoryForm({ id: '', name: '' });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...productForm,
      price: parseFloat(productForm.price),
      rating: parseFloat(productForm.rating),
      discount: parseInt(productForm.discount)
    };
    
    if (editingProduct) {
      dispatch(updateProduct({ id: editingProduct.id, data: productData }));
    } else {
      dispatch(createProduct(productData));
    }
    setShowProductModal(false);
    setEditingProduct(null);
    setProductForm({
      id: '',
      title: '',
      price: '',
      category: '',
      image: '',
      rating: 4.5,
      discount: 0,
      isNew: false,
      description: '',
      sku: ''
    });
  };

  const handleImageUpload = async (file) => {
    setUploadingImage(true);
    const result = await imageUploadService.uploadImage(file);
    if (result.success) {
      setProductForm(prev => ({ ...prev, image: result.url }));
    }
    setUploadingImage(false);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm(category);
    setShowCategoryModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      ...product,
      price: product.price.toString(),
      rating: product.rating.toString(),
      discount: product.discount.toString()
    });
    setShowProductModal(true);
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту категорию?')) {
      dispatch(deleteCategory(id));
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 p-6 relative">
      {/* Background blur overlay */}
      <div className="fixed inset-0 bg-black/5 backdrop-blur-sm pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-purple-500/10 p-6 mb-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-800">Админ панель</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Управление магазином украшений
              </div>
              <button
                onClick={handleClose}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 hover:scale-105 shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Закрыть</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 shadow-lg">
            {error}
            <button 
              onClick={() => dispatch(clearError())}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-purple-500/10 mb-6 border border-white/20">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => dispatch(setActiveTab('products'))}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'products'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Package className="w-4 h-4 inline mr-2" />
                Товары ({products.length})
              </button>
              <button
                onClick={() => dispatch(setActiveTab('categories'))}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'categories'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Tag className="w-4 h-4 inline mr-2" />
                Категории ({categories.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-purple-500/10 border border-white/20">
          {activeTab === 'products' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Управление товарами</h2>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setProductForm({
                      id: '',
                      title: '',
                      price: '',
                      category: '',
                      image: '',
                      rating: 4.5,
                      discount: 0,
                      isNew: false,
                      description: '',
                      sku: ''
                    });
                    setShowProductModal(true);
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Добавить товар
                </button>
              </div>

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <p className="mt-2 text-gray-600">Загрузка...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                      <p className="text-gray-600 mb-2">{product.description}</p>
                      <p className="text-purple-600 font-bold mb-4">{product.price}₽</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Редактировать
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Управление категориями</h2>
                <button
                  onClick={() => {
                    setEditingCategory(null);
                    setCategoryForm({ id: '', name: '' });
                    setShowCategoryModal(true);
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Добавить категорию
                </button>
              </div>

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <p className="mt-2 text-gray-600">Загрузка...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <div key={category.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-lg mb-4">{category.name}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Редактировать
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Category Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md shadow-2xl border border-white/20">
              <h3 className="text-lg font-semibold mb-4">
                {editingCategory ? 'Редактировать категорию' : 'Добавить категорию'}
              </h3>
              <form onSubmit={handleCategorySubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название категории
                  </label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Сохранить
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Product Modal */}
        {showProductModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 w-full max-w-2xl my-8 shadow-2xl border border-white/20">
              <h3 className="text-lg font-semibold mb-4">
                {editingProduct ? 'Редактировать товар' : 'Добавить товар'}
              </h3>
              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Название товара
                    </label>
                    <input
                      type="text"
                      value={productForm.title}
                      onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Цена (₽)
                    </label>
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Категория
                    </label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">Выберите категорию</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Артикул
                    </label>
                    <input
                      type="text"
                      value={productForm.sku}
                      onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Рейтинг
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={productForm.rating}
                      onChange={(e) => setProductForm({ ...productForm, rating: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Скидка (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={productForm.discount}
                      onChange={(e) => setProductForm({ ...productForm, discount: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Описание
                  </label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Изображение
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          handleImageUpload(file);
                        }
                      }}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-200 flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      {uploadingImage ? 'Загрузка...' : 'Загрузить изображение'}
                    </label>
                    {productForm.image && (
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">Изображение загружено</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isNew"
                    checked={productForm.isNew}
                    onChange={(e) => setProductForm({ ...productForm, isNew: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="isNew" className="text-sm text-gray-700">
                    Новый товар
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Сохранить
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
