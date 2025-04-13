import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store as StoreIcon, MapPin, Star, Tag, CheckCircle } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  location: string;
  distance: string;
  rating: number;
  availability: number;
  discount?: {
    percentage: number;
    description: string;
  };
}

export const StoreList: React.FC = () => {
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState<any>(null);

  useEffect(() => {
    const details = sessionStorage.getItem('productSelection');
    if (!details) {
      navigate('/buyer/categories');
      return;
    }
    setProductDetails(JSON.parse(details));
  }, [navigate]);

  // Mock store data
  const stores: Store[] = [
    {
      id: '1',
      name: 'SuperMart',
      location: '123 Main Street',
      distance: '0.5 km',
      rating: 4.5,
      availability: 50,
      discount: {
        percentage: 10,
        description: '10% off on all items'
      }
    },
    {
      id: '2',
      name: 'QuickStore',
      location: '456 Oak Avenue',
      distance: '0.8 km',
      rating: 4.8,
      availability: 25
    },
    {
      id: '3',
      name: 'LocalMart',
      location: '789 Pine Road',
      distance: '1.2 km',
      rating: 4.7,
      availability: 100,
      discount: {
        percentage: 15,
        description: '15% off on selected items'
      }
    }
  ];

  const handleStoreSelect = (store: Store) => {
    sessionStorage.setItem('selectedStore', JSON.stringify(store));
    navigate('/buyer/confirmation');
  };

  if (!productDetails) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Nearby Stores with {productDetails.product.name}
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <StoreIcon className="h-6 w-6 text-indigo-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">{store.name}</h2>
                </div>
                <div className="flex items-center bg-indigo-50 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 text-indigo-600 mr-1" fill="currentColor" />
                  <span className="text-indigo-600 font-medium">{store.rating}</span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{store.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Stock Available: {store.availability} units</span>
                </div>

                {store.discount && (
                  <div className="flex items-center text-green-600">
                    <Tag className="h-5 w-5 mr-2" />
                    <span>{store.discount.description}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-6">
                <span className="text-sm text-gray-500">{store.distance} away</span>
                <button
                  onClick={() => handleStoreSelect(store)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                >
                  Select Store
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};