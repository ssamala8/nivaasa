import React, { lazy, Suspense } from 'react'; 
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout/Layout';
import ProtectedRoute from './router/ProtectedRoute';
import LoadingOverlay from './components/LoadingOverlay/LoadingOverlay';

// Layouts
import AdminLayout from './layout/AdminLayout/AdminLayout';

// Public Pages
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

// --- Dashboard Root (The "switch") ---
const DashboardPage = lazy(() => import('./pages/DashboardPage/DashboardPage'));

// --- User Dashboard ---
const UserDashboardPage = lazy(() => import('./pages/UserDashboardPage/UserDashboardPage'));

// --- Admin Pages (Lazy Loaded) ---
const AdminOverview = lazy(() => import('./pages/Admin/AdminOverview'));
const AdminFlatsManagement = lazy(() => import('./pages/Admin/AdminFlatsManagement'));
const AdminUsersManagement = lazy(() => import('./pages/Admin/AdminUsersManagement'));
const AdminPayments = lazy(() => import('./pages/Admin/AdminPayments'));
const AdminCommunity = lazy(() => import('./pages/Admin/AdminCommunity'));


function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingOverlay text="Loading Page..." />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* --- Main Dashboard Redirector --- */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* --- User-Facing Dashboard --- */}
          <Route 
            path="/my-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboardPage />
              </ProtectedRoute>
            }
          />
          
          {/* --- Admin Nested Routes --- */}
          <Route 
            path="/admin" 
            element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}
          >
            <Route index path="overview" element={<AdminOverview />} />
            <Route path="flats" element={<AdminFlatsManagement />} />
            <Route path="users" element={<AdminUsersManagement />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="community" element={<AdminCommunity />} />
          </Route>

        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;