import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { useAuthStore } from './store/authStore';

import { Navbar } from './components/Navbar';
import { SignIn } from './pages/auth/SignIn';
import { SignUp } from './pages/auth/SignUp';
import { Home } from './pages/Home';
import BuyerDashboard from './pages/buyer/Categories';
import { ProductSelection } from './pages/buyer/ProductSelection';
import { BuyerDetails } from './pages/buyer/BuyerDetails';
import { StoreList } from './pages/buyer/StoreList';
import { OrderConfirmation } from './pages/buyer/OrderConfirmation';
import { SellerDashboard } from './pages/seller/Dashboard';

import ChatbotWidget from './components/ChatbotWidget'; // ✅ Chatbot Widget import

const AppContent: React.FC = () => {
  const location = useLocation();
  const hideChatbotOnRoutes = ['/signin', '/signup']; // Routes where chatbot is hidden
  const showChatbot = !hideChatbotOnRoutes.includes(location.pathname);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/buyer/categories" element={<BuyerDashboard />} />
          <Route path="/buyer/details" element={<BuyerDetails />} />
          <Route path="/buyer/stores" element={<StoreList />} />
          <Route path="/buyer/confirmation" element={<OrderConfirmation />} />
          <Route path="/buyer/category/:category/products" element={<ProductSelection />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
        </Routes>
      </div>

      {/* ✅ Conditionally render Chatbot */}
      {showChatbot && <ChatbotWidget />}
    </>
  );
};

const App: React.FC = () => {
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
      if (user) {
        const userData = {
          name: user.displayName ?? 'User',
          email: user.email ?? 'unknown@example.com',
          type: 'buyer' as 'buyer',
          uid: user.uid,
          signedInAt: serverTimestamp(),
          metadata: {
            createdAt: user.metadata.creationTime,
            lastSignInAt: user.metadata.lastSignInTime,
          },
        };

        setUser(userData);

        try {
          await setDoc(doc(db, 'users', user.uid), userData, { merge: true });
        } catch (error) {
          console.error('Error saving user sign-in data:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
