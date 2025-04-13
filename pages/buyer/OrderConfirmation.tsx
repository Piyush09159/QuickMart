import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Package, User, MapPin, Store as StoreIcon, Calendar, Tag } from 'lucide-react';

interface OrderDetails {
  product: {
    name: string;
    price: number;
  };
  quantity: number;
  pickupDate: string;
  buyer: {
    name: string;
    location: string;
    address: string;
    phone: string;
  };
  store: {
    name: string;
    location: string;
    distance: string;
    discount?: {
      percentage: number;
      description: string;
    };
  };
}

export const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const productSelection = JSON.parse(sessionStorage.getItem('productSelection') || '{}');
    const buyerDetails = JSON.parse(sessionStorage.getItem('buyerDetails') || '{}');
    const selectedStore = JSON.parse(sessionStorage.getItem('selectedStore') || '{}');
    
    if (!productSelection.product || !buyerDetails.name || !selectedStore.name) {
      navigate('/buyer/categories');
      return;
    }

    setOrderDetails({
      product: productSelection.product,
      quantity: productSelection.quantity,
      pickupDate: productSelection.pickupDate,
      buyer: buyerDetails,
      store: selectedStore
    });
  }, [navigate]);

  const handleConfirm = () => {
    // Clear session storage
    sessionStorage.removeItem('productSelection');
    sessionStorage.removeItem('buyerDetails');
    sessionStorage.removeItem('selectedStore');
    // Redirect to home page
    navigate('/');
  };

  if (!orderDetails) return null;

  const calculateTotal = () => {
    const basePrice = orderDetails.product.price * orderDetails.quantity;
    if (orderDetails.store.discount) {
      const discount = basePrice * (orderDetails.store.discount.percentage / 100);
      return basePrice - discount;
    }
    return basePrice;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-8">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Order Summary</h1>
        </div>

        <div className="space-y-6">
          <div className="border-t border-b border-gray-200 py-4">
            <div className="flex items-center mb-4">
              <Package className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Product Details</h2>
            </div>
            <div className="ml-7 space-y-2">
              <p><span className="font-medium">Item:</span> {orderDetails.product.name}</p>
              <p><span className="font-medium">Quantity:</span> {orderDetails.quantity}</p>
              <p><span className="font-medium">Base Price:</span> ₹{orderDetails.product.price * orderDetails.quantity}</p>
              {orderDetails.store.discount && (
                <p className="text-green-600">
                  <Tag className="h-4 w-4 inline mr-1" />
                  {orderDetails.store.discount.description}
                </p>
              )}
              <p className="text-lg font-bold">
                <span className="font-medium">Final Price:</span> ₹{calculateTotal()}
              </p>
            </div>
          </div>

          <div className="border-b border-gray-200 py-4">
            <div className="flex items-center mb-4">
              <StoreIcon className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Store Details</h2>
            </div>
            <div className="ml-7 space-y-2">
              <p><span className="font-medium">Store:</span> {orderDetails.store.name}</p>
              <p><span className="font-medium">Distance:</span> {orderDetails.store.distance}</p>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-1" />
                <p>{orderDetails.store.location}</p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 py-4">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Buyer Details</h2>
            </div>
            <div className="ml-7 space-y-2">
              <p><span className="font-medium">Name:</span> {orderDetails.buyer.name}</p>
              <p><span className="font-medium">Phone:</span> {orderDetails.buyer.phone}</p>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-1" />
                <div>
                  <p className="font-medium">Delivery Address:</p>
                  <p>{orderDetails.buyer.address}</p>
                  <p>{orderDetails.buyer.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 py-4">
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Pickup Details</h2>
            </div>
            <div className="ml-7">
              <p>{new Date(orderDetails.pickupDate).toLocaleDateString()}</p>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};