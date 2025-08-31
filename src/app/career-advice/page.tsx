import React from "react";
import dynamic from "next/dynamic";

const CareerAdvicePage = dynamic(() => import("@/components/career-advice/CareerAdvicePage"));
const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

const CareerAdvice = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <CareerAdvicePage />
      <Footer />
    </div>
  );
};

export default CareerAdvice;
