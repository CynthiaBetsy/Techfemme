import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import AuthModal from "./Component/AuthModal"; 
import Navbar from "./Component/Navbar";
import RegistrationForm from "./Component/RegForm";
import Dashboard from "./Component/Dashboard";
import HomePage from "./Component/HomePage";
import PrivateRoute from "./Component/PrivateRoutes";
import AdminDashboard from "./Component/AdminDashboard";

// Type for modal
type ModalType = "signin" | null;

const App: React.FC = () => {
  const [modalType, setModalType] = useState<ModalType>(null);

  const closeModal = () => setModalType(null);
  const handleShowAuthModal = (type: "signin" | "signup") =>
    setModalType(type === "signin" ? "signin" : null);

  return (
    <>
      <Navbar setShowAuthModal={handleShowAuthModal} />

      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/regform" element={<RegistrationForm />} />

        {/* Protected user dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Protected admin dashboard */}
        <Route
          path="/admin"
          element={
            <PrivateRoute adminOnly>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* 404 fallback (optional) */}
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>

      {modalType && (
        <AuthModal
          type={modalType}
          onClose={closeModal}
          setModalType={setModalType}
        />
      )}
    </>
  );
};

export default App;
