import React from "react";
import dynamic from "next/dynamic";
import { getCountOfResumes } from "@/api/requests/home/home.api";

const TemplatesPage = dynamic(() => import("@/components/templates/TemplatesPage"));
const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

const Templates = async () => {
  const countOfResumes = await getCountOfResumes();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <TemplatesPage countOfResumes={countOfResumes.data} />
      <Footer />
    </div>
  );
};

export default Templates;
