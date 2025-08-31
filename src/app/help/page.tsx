import React from "react";
import dynamic from "next/dynamic";

const HelpPage = dynamic(() => import("@/components/help/HelpPage"));
const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

const Help = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HelpPage />
      <Footer />
    </div>
  );
};

export default Help;
