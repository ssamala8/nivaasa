// 1. Import lazy and Suspense from React
import React, { lazy, Suspense } from 'react'; 
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout/Layout';
import ProtectedRoute from './router/ProtectedRoute';
import LoadingOverlay from './components/LoadingOverlay/LoadingOverlay';
// --- Public Pages (load immediately) ---
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

// --- Protected Pages (load on demand) ---
// 3. Use React.lazy to import the DashboardPage
const DashboardPage = lazy(() => import('./pages/DashboardPage/DashboardPage'));

function App() {
  return (
    <Layout>
      {/* 4. Wrap your Routes in a Suspense component */}
      <Suspense fallback={<LoadingOverlay text="Loading Page..." />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;