import React from "react";
import Hero from "./Hero";
import AboutPage from "./AboutPage";
import Courses from "./Courses";
import HowItWorks from "./HowItWorks";
import JoinCommunity from "./JoinCommunity";
import Footer from "./Footer";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutPage />
      <Courses />
      <HowItWorks />
      <JoinCommunity />
      <Footer />
    </>
  );
};

export default HomePage;
