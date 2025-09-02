import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Dynamic imports
const BlogPostContent = dynamic(() => import("@/components/blog/BlogPostContent"));
const BlogSidebar = dynamic(() => import("@/components/blog/BlogSidebar"));
const RelatedArticles = dynamic(() => import("@/components/blog/RelatedArticles"));
const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

// Mock blog post data - in a real app, this would come from a CMS or API
const getBlogPost = (slug: string) => {
    const posts = {
        "10-resume-mistakes-costing-interviews": {
            title: "10 Resume Mistakes That Are Costing You Interviews",
            excerpt: "Discover the most common resume mistakes that hiring managers see every day and learn how to avoid them to increase your interview chances.",
            content: `
        <h2>Introduction</h2>
        <p>Your resume is often the first impression you make on a potential employer. In today's competitive job market, even small mistakes can cost you valuable opportunities. This comprehensive guide will help you identify and avoid the most common resume mistakes that could be preventing you from landing interviews.</p>
        
        <h2>1. Generic Resume for All Applications</h2>
        <p>One of the biggest mistakes job seekers make is using the same resume for every job application. Each position has unique requirements, and your resume should reflect how your experience aligns with the specific role.</p>
        <ul>
          <li>Customize your resume for each job application</li>
          <li>Highlight relevant skills and experiences</li>
          <li>Use keywords from the job description</li>
        </ul>
        
        <h2>2. Poor Formatting and Layout</h2>
        <p>Recruiters spend an average of 6-7 seconds reviewing a resume. Poor formatting can make your resume difficult to read and cause it to be rejected immediately.</p>
        <ul>
          <li>Use consistent formatting throughout</li>
          <li>Choose a clean, professional font</li>
          <li>Ensure proper spacing and margins</li>
          <li>Use bullet points for easy scanning</li>
        </ul>
        
        <h2>3. Including Irrelevant Information</h2>
        <p>Your resume should focus on information that's relevant to the position you're applying for. Including irrelevant details can distract from your key qualifications.</p>
        
        <h2>4. Weak Action Verbs</h2>
        <p>Using weak or passive language can make your accomplishments seem less impressive. Strong action verbs help convey your impact and achievements.</p>
        
        <h2>5. Missing Quantifiable Results</h2>
        <p>Numbers speak louder than words. Including quantifiable results helps demonstrate your impact and achievements.</p>
        
        <h2>6. Spelling and Grammar Errors</h2>
        <p>Spelling and grammar mistakes are a major red flag for employers. They suggest a lack of attention to detail and professionalism.</p>
        
        <h2>7. Outdated Contact Information</h2>
        <p>Ensure your contact information is current and professional. Use a professional email address and include your LinkedIn profile if relevant.</p>
        
        <h2>8. Too Long or Too Short</h2>
        <p>Resume length should be appropriate for your experience level. Generally, one page is sufficient for most positions, but senior-level roles may require two pages.</p>
        
        <h2>9. Missing Keywords</h2>
        <p>Many companies use Applicant Tracking Systems (ATS) to screen resumes. Missing relevant keywords can cause your resume to be filtered out.</p>
        
        <h2>10. Not Proofreading</h2>
        <p>Always proofread your resume multiple times and have someone else review it as well. Fresh eyes can catch mistakes you might have missed.</p>
        
        <h2>Conclusion</h2>
        <p>Avoiding these common resume mistakes can significantly improve your chances of landing interviews. Take the time to review and refine your resume regularly, and don't hesitate to seek feedback from professionals in your field.</p>
      `,
            author: {
                name: "Sarah Johnson",
                title: "Senior Career Coach",
                avatar: "/api/placeholder/100/100",
                bio: "Sarah has over 10 years of experience helping professionals advance their careers through effective resume writing and interview preparation."
            },
            publishDate: "2024-01-15",
            readTime: "8 min read",
            category: "Resume Writing",
            tags: ["ATS Optimization", "Resume Tips", "Job Search", "Career Advice"],
            views: "12.5k",
            featured: true
        }
    };

    return posts[slug as keyof typeof posts] || null;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = getBlogPost(params.slug);

    if (!post) {
        return {
            title: "Blog Post Not Found",
            description: "The requested blog post could not be found."
        };
    }

    return {
        title: `${post.title} - Resume Builder Blog`,
        description: post.excerpt,
        keywords: post.tags.join(", "),
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.publishDate,
            authors: [post.author.name],
        },
    };
}

const BlogPostPage = ({ params }: BlogPostPageProps) => {
    const post = getBlogPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            <main className="pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <BlogPostContent post={post} />
                            <RelatedArticles currentSlug={params.slug} />
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <BlogSidebar />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BlogPostPage;