import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";

// Dynamic imports for better performance
const BlogHero = dynamic(() => import("@/components/blog/BlogHero"));
const BlogSearch = dynamic(() => import("@/components/blog/BlogSearch"));
const BlogCategories = dynamic(() => import("@/components/blog/BlogCategories"));
const FeaturedArticles = dynamic(() => import("@/components/blog/FeaturedArticles"));
const BlogGrid = dynamic(() => import("@/components/blog/BlogGrid"));
const BlogNewsletter = dynamic(() => import("@/components/blog/BlogNewsletter"));
const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

export const metadata: Metadata = {
  title: "Blog - Resume Builder | Career Tips, Resume Advice & Job Search",
  description: "Discover expert career advice, resume writing tips, interview strategies, and job search insights. Stay updated with the latest trends in professional development.",
  keywords: "resume tips, career advice, job search, interview tips, professional development, resume writing",
  openGraph: {
    title: "Blog - Resume Builder | Career Tips & Professional Advice",
    description: "Expert career advice, resume writing tips, and job search strategies to help you succeed in your professional journey.",
    type: "website",
  },
};

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        <BlogHero />
        <BlogSearch />
        <BlogCategories />
        <FeaturedArticles />  
        <BlogGrid />
        <BlogNewsletter />
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
