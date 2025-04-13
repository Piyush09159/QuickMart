import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Store, Truck } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to <span className="text-indigo-600">QuickMart</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            A fast and easy way to connect buyers and sellers
          </p>
          <div className="mt-10 flex justify-center space-x-6">
            <Link
              to="/buyer/categories"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Now
            </Link>
            <Link
              to="/seller/dashboard"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white border-indigo-600 hover:bg-indigo-50"
            >
              <Store className="mr-2 h-5 w-5" />
              Sell Products
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="flex justify-center">
                  <ShoppingBag className="h-12 w-12 text-indigo-600" />
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">Wide Selection</h3>
                <p className="mt-2 text-gray-500">
                  Browse through grocery, stationery, and medical products
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center">
                  <Store className="h-12 w-12 text-indigo-600" />
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">Local Stores</h3>
                <p className="mt-2 text-gray-500">
                  Connect with nearby stores and get the best deals
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center">
                  <Truck className="h-12 w-12 text-indigo-600" />
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">Easy Pickup</h3>
                <p className="mt-2 text-gray-500">
                  Choose your pickup date and location
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};