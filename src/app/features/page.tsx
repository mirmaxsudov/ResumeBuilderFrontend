import React from "react";
import dynamic from "next/dynamic";

const FeaturesPage = dynamic(() => import("@/components/features/FeaturesPage"));
const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

const Features = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <FeaturesPage />
      <Footer />
    </div>
  );
};

export default Features;
