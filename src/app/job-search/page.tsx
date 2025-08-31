import React from "react";
import dynamic from "next/dynamic";

const JobSearchPage = dynamic(() => import("@/components/job-search/JobSearchPage"));
const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

const JobSearch = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <JobSearchPage />
      <Footer />
    </div>
  );
};

export default JobSearch;
