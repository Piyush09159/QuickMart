import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Store, LogIn, UserPlus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Navbar: React.FC = () => {
  const { user, setUser } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingCart className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">QuickMart</span>
            </Link>
          </div>

          {/* Right: Auth/Links */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Dashboard/Shop link */}
                <Link
                  to={user.type === 'seller' ? '/seller/dashboard' : '/buyer/categories'}
                  className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
                >
                  <Store className="h-5 w-5" />
                  <span>{user.type === 'seller' ? 'Dashboard' : 'Shop'}</span>
                </Link>

                {/* Profile Dropdown */}
                <div className="relative inline-block text-left">
                  <div
                    className="flex items-center space-x-3 cursor-pointer group"
                    onClick={() => setMenuOpen((prev) => !prev)}
                  >
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" // 🔁 Replace with `user.image` if available
                      alt="Profile"
                      className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
                    />
                    <span className="text-gray-800 font-medium group-hover:text-indigo-600">
                      {user.name}
                    </span>
                  </div>

                  {menuOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
