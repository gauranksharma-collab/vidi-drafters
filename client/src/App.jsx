import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import ServicePage from './pages/ServicePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Profile from './pages/auth/Profile';

import DraftCatalog from './pages/draft/DraftCatalog';
import DraftCategoryPage from './pages/draft/DraftCategoryPage';
import DraftDocumentForm from './pages/draft/DraftDocumentForm';
import DraftCart from './pages/draft/DraftCart';
import DraftCheckout from './pages/draft/DraftCheckout';
import DraftOrders from './pages/draft/DraftOrders';
import DraftOrderDetail from './pages/draft/DraftOrderDetail';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRegistrations from './pages/admin/AdminRegistrations';
import AdminContactMessages from './pages/admin/AdminContactMessages';
import AdminLegacyData from './pages/admin/AdminLegacyData';
import AdminAdmins from './pages/admin/AdminAdmins';
import AdminChangePassword from './pages/admin/AdminChangePassword';
import AdminDraftOrders from './pages/admin/AdminDraftOrders';
import AdminDraftOrderDetail from './pages/admin/AdminDraftOrderDetail';

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="registrations" element={<AdminRegistrations />} />
        <Route path="contact-messages" element={<AdminContactMessages />} />
        <Route path="legacy-data" element={<AdminLegacyData />} />
        <Route path="admins" element={<AdminAdmins />} />
        <Route path="change-password" element={<AdminChangePassword />} />
        <Route path="draft-orders" element={<AdminDraftOrders />} />
        <Route path="draft-orders/:orderNumber" element={<AdminDraftOrderDetail />} />
      </Route>

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/draft" element={<DraftCatalog />} />
        <Route path="/draft/category/:categorySlug" element={<DraftCategoryPage />} />
        <Route path="/draft/document/:slug" element={<DraftDocumentForm />} />
        <Route path="/draft/cart" element={<DraftCart />} />
        <Route path="/draft/checkout" element={<DraftCheckout />} />
        <Route path="/draft/orders" element={<DraftOrders />} />
        <Route path="/draft/orders/:orderNumber" element={<DraftOrderDetail />} />
        <Route path="/:slug" element={<ServicePage />} />
      </Route>
    </Routes>
  );
}
