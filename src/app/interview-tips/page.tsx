import React from "react";
import dynamic from "next/dynamic";

const InterviewTipsPage = dynamic(() => import("@/components/interview-tips/InterviewTipsPage"));
const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

const InterviewTips = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <InterviewTipsPage />
      <Footer />
    </div>
  );
};

export default InterviewTips;
