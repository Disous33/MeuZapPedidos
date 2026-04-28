import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FirebaseProvider, useFirebase } from '@/src/lib/FirebaseProvider';
import { Toaster } from '@/components/ui/sonner';
import LandingPage from '@/src/pages/LandingPage';
import Dashboard from '@/src/pages/Dashboard';
import StoreManagement from '@/src/pages/StoreManagement';
import ProductManagement from '@/src/pages/ProductManagement';
import Orders from '@/src/pages/Orders';
import MenuPage from '@/src/pages/MenuPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useFirebase();

  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/" />;

  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <FirebaseProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/store/:id" element={
              <ProtectedRoute>
                <StoreManagement />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/products/:id" element={
              <ProtectedRoute>
                <ProductManagement />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/orders/:storeId" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />
            <Route path="/:slug" element={<MenuPage />} />
          </Routes>
          <Toaster />
        </div>
      </FirebaseProvider>
    </Router>
  );
}
