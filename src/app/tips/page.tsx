import React from "react";
import dynamic from "next/dynamic";

const TipsPage = dynamic(() => import("@/components/tips/TipsPage"));
const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

const Tips = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <TipsPage />
      <Footer />
    </div>
  );
};

export default Tips;
