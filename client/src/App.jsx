import { Routes, Route, Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { setNavigate } from "./utils/api";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import Toast from "./components/common/Toast";
import LoadingScreen from "./components/common/LoadingScreen";
import AdminLayout from "./pages/admin/AdminLayout";

// ===================
// Public Pages
// ===================
const Home = lazy(() => import("./pages/Home"));

// ===================
// Admin Pages
// ===================
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects"));
const AdminSkills = lazy(() => import("./pages/admin/AdminSkills"));
const AdminExperience = lazy(() => import("./pages/admin/AdminExperience"));
const AdminEducation = lazy(() => import("./pages/admin/AdminEducation"));
const AdminCertificates = lazy(() => import("./pages/admin/AdminCertificates"));
const AdminMessages = lazy(() => import("./pages/admin/AdminMessages"));
const AdminProfile = lazy(() => import("./pages/admin/AdminProfile"));

// ===================
// Protected Route
// ===================
function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

// ===================
// Public Route
// ===================
function PublicRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? <Navigate to="/admin" replace /> : children;
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { setNavigate(navigate); }, [navigate]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); }
        else { requestAnimationFrame(tryScroll); }
      };
      requestAnimationFrame(tryScroll);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-dark-950 text-white font-sans transition-colors duration-300">
      <ScrollToTop />
      <Toast />

      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Public Home */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />

          {/* Admin Login */}
          <Route
            path="/admin/login"
            element={
              <PublicRoute>
                <AdminLogin />
              </PublicRoute>
            }
          />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="skills" element={<AdminSkills />} />
              <Route path="experience" element={<AdminExperience />} />
              <Route path="education" element={<AdminEducation />} />
              <Route path="certificates" element={<AdminCertificates />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
          </Route>

          {/* 404 Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;