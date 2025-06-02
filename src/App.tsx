import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import AuthModal from "./Component/AuthModal";
import Navbar from "./Component/Navbar";
import RegistrationForm from "./Component/RegForm";
import Dashboard from "./Component/Dashboard";
import HomePage from "./Component/HomePage";
import PrivateRoute from "./Component/PrivateRoutes";

// Define modal type for better type safety
type ModalType = "signin" | null;

const App: React.FC = () => {
  const [modalType, setModalType] = useState<ModalType>(null);

  const closeModal = () => setModalType(null);

  return (
    <>
      <Navbar setShowAuthModal={setModalType} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/regform" element={<RegistrationForm />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
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
