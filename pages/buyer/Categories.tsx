import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, BookOpen, ChevronFirst as FirstAid } from 'lucide-react';

const Categories: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'grocery',
      name: 'Grocery',
      icon: ShoppingBag,
      description: 'Fresh produce, pantry items, and household essentials',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'stationery',
      name: 'Stationery',
      icon: BookOpen,
      description: 'Office supplies, school materials, and art supplies',
      image: 'https://images.unsplash.com/photo-1527176930608-09cb256ab504?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'medical',
      name: 'Medical',
      icon: FirstAid,
      description: 'Over-the-counter medicines and healthcare products',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Choose a Category</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => navigate(`/buyer/category/${category.id}/products`)}
          >
            <div className="relative h-48">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <category.icon className="h-16 w-16 text-white" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
