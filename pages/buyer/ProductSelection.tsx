import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Package, Calendar } from 'lucide-react';

interface ProductFormData {
  itemId: string;
  quantity: number;
  pickupDate: string;
}

export const ProductSelection: React.FC = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [formData, setFormData] = useState<ProductFormData>({
    itemId: '',
    quantity: 1,
    pickupDate: ''
  });

  // Mock products data based on category
  const products = {
    grocery: [
      { id: 'g1', name: 'Fresh Apples', price: 80 },
      { id: 'g2', name: 'Whole Wheat Bread', price: 40 },
      { id: 'g3', name: 'Organic Milk', price: 60 }
    ],
    stationery: [
      { id: 's1', name: 'Notebook Set', price: 120 },
      { id: 's2', name: 'Premium Pen Pack', price: 50 },
      { id: 's3', name: 'Art Supplies Kit', price: 200 }
    ],
    medical: [
      { id: 'm1', name: 'First Aid Kit', price: 300 },
      { id: 'm2', name: 'Bandages Pack', price: 80 },
      { id: 'm3', name: 'Pain Relief Tablets', price: 100 }
    ]
  };

  const categoryProducts = products[category as keyof typeof products] || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedProduct = categoryProducts.find(p => p.id === formData.itemId);
    // Store product selection in session storage
    sessionStorage.setItem('productSelection', JSON.stringify({
      ...formData,
      category,
      product: selectedProduct
    }));
    navigate('/buyer/details');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Select {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category'} Items
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Item
            </label>
            <select
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.itemId}
              onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
            >
              <option value="">Choose an item</option>
              {categoryProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - ₹{product.price}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Quantity
              </div>
            </label>
            <input
              type="number"
              required
              min="1"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Preferred Pickup Date
              </div>
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.pickupDate}
              onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Proceed to Details
          </button>
        </form>
      </div>
    </div>
  );
};