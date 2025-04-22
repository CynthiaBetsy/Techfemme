import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import AuthModal from "./Component/AuthModal";
import Navbar from "./Component/Navbar";
import Courses from "./Component/Courses";
import Hero from "./Component/Hero";
import AboutPage from "./Component/AboutPage";
import HowItWorks from "./Component/HowItWorks";
import JoinCommunity from "./Component/JoinCommunity";
import Footer from "./Component/Footer";
import Newsletter from "./Component/Newsletter";

const App: React.FC = () => {
  const [modalType, setModalType] = useState<"signin" | "signup" | null>(null);

  const closeModal = () => setModalType(null);

  return (
    <>
      <Navbar setShowAuthModal={setModalType} />
      <Routes>
        <Route path="/courses" element={<Courses/>} />
      </Routes>
      <Hero/>
      <AboutPage/>
      <Courses/>
      <HowItWorks/>
      <JoinCommunity/>
      <Newsletter/>
      <Footer/>


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
