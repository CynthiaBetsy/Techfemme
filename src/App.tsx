import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import AuthModal from "./Component/AuthModal";
import Navbar from "./Component/Navbar";
import About from "./Component/About";
import Courses from "./Component/Courses";

const App: React.FC = () => {
  const [modalType, setModalType] = useState<"signin" | "signup" | null>(null);

  const closeModal = () => setModalType(null);

  return (
    <>
      <Navbar setShowAuthModal={setModalType} />
      <Routes>
        <Route path="/courses" element={<Courses/>} />
      </Routes>
      <About/>

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
