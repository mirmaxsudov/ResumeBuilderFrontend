import React from "react";
import dynamic from "next/dynamic";

const PricingPage = dynamic(() => import("@/components/pricing/PricingPage"));
const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <PricingPage />
      <Footer />
    </div>
  );
};

export default Pricing;
