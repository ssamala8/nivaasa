// src/App.js

import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout/Layout'; // Main app layout (Header/Footer wrapper)
import ProtectedRoute from './router/ProtectedRoute'; // Component to guard routes
import LoadingOverlay from './components/LoadingOverlay/LoadingOverlay'; // Spinner overlay for lazy loading

// --- Layouts ---
// Import AdminLayout directly as it contains the Outlet for nested routes
import AdminLayout from './layout/AdminLayout/AdminLayout';

// --- Public Pages (Load Immediately) ---
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

// --- Dashboard Root (The "switch" that redirects based on role) ---
// Lazy load this page as it's only needed after login attempt
const DashboardPage = lazy(() => import('./pages/DashboardPage/DashboardPage'));

// --- User Dashboard Page (Owner/Tenant) ---
// Lazy load as it's protected
const UserDashboardPage = lazy(() => import('./pages/UserDashboardPage/UserDashboardPage'));

// --- Admin Pages (Lazy Loaded for performance) ---
const AdminOverview = lazy(() => import('./pages/Admin/AdminOverview'));
const AdminApartmentsManagement = lazy(() => import('./pages/Admin/AdminApartmentsManagement'));
const AdminFlatsManagement = lazy(() => import('./pages/Admin/AdminFlatsManagement'));
const AdminUsersManagement = lazy(() => import('./pages/Admin/AdminUsersManagement'));
const AdminPayments = lazy(() => import('./pages/Admin/AdminPayments'));
const AdminCommunity = lazy(() => import('./pages/Admin/AdminCommunity'));
// Add imports for any future admin pages here

function App() {
  return (
    // Main Layout wraps the entire application
    <Layout>
      {/* Suspense handles the loading state for lazy-loaded components */}
      <Suspense fallback={<LoadingOverlay text="Loading Page..." />}>
        <Routes>
          {/* --- Public Routes --- */}
          {/* Accessible whether logged in or not */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* --- Protected Routes --- */}

          {/* 1. Main Dashboard Redirector */}
          {/* This route is protected. Once loaded, it checks the user role */}
          {/* and redirects to either /my-dashboard or /admin/overview */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* 2. User-Facing Dashboard (Owner/Tenant) */}
          {/* This route is protected. Only accessible if logged in. */}
          <Route
            path="/my-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* 3. Admin Section Nested Routes */}
          {/* This parent route is protected AND checks for the 'admin' role. */}
          {/* It renders the AdminLayout (Sidebar + Content Area). */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Child routes render inside AdminLayout's <Outlet /> */}
            {/* The 'index' route defaults to overview */}
            <Route index path="overview" element={<AdminOverview />} />
            <Route path="apartments" element={<AdminApartmentsManagement />} />
            <Route path="flats" element={<AdminFlatsManagement />} />
            <Route path="users" element={<AdminUsersManagement />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="community" element={<AdminCommunity />} />
            {/* Add future admin sub-routes here */}
            {/* Example: <Route path="settings" element={<AdminSettings />} /> */}
          </Route>

          {/* --- Fallback Route (Optional) --- */}
          {/* Consider adding a 404 Not Found page */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}

        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;