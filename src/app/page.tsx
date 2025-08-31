import React from "react";
import dynamic from "next/dynamic";
import { getCountOfUsers, getCountOfResumes } from "@/api/requests/home/home.api";

// Dynamic imports for better performance
const HeroSection = dynamic(() => import("@/components/home/sections/HeroSection"));
const FeaturesSection = dynamic(() => import("@/components/home/sections/FeaturesSection"));
const TemplatesSection = dynamic(() => import("@/components/home/sections/TemplatesSection"));
const TestimonialsSection = dynamic(() => import("@/components/home/sections/TestimonialsSection"));
const StatsSection = dynamic(() => import("@/components/home/sections/StatsSection"));
const CTASection = dynamic(() => import("@/components/home/sections/CTASection"));
const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

const Home = async () => {
  const [countOfUsers, countOfResumes] = await Promise.all([
    getCountOfUsers(),
    getCountOfResumes()
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main>
        <HeroSection 
          countOfUsers={countOfUsers.data} 
          countOfResumes={countOfResumes.data} 
        />
        <StatsSection 
          countOfUsers={countOfUsers.data} 
          countOfResumes={countOfResumes.data} 
        />
        <FeaturesSection />
        <TemplatesSection />
        <TestimonialsSection />
        <CTASection countOfUsers={countOfUsers.data} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
