import React from "react";
import Hero from "./Hero";
import AboutPage from "./AboutPage";
import Courses from "./Courses";
import HowItWorks from "./HowItWorks";
import JoinCommunity from "./JoinCommunity";
import Footer from "./Footer";
import Testimonials from "./Testimonials";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutPage />
      <Courses />
      <HowItWorks />
      <JoinCommunity />
     <Testimonials />
      <Footer />
    </>
  );
};

export default HomePage;
