import React from "react";
import dynamic from "next/dynamic";

// Dynamic imports for better performance
const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

const CookiesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Learn how we use cookies and similar technologies to enhance your experience on our website.
            </p>
            <p className="text-sm text-blue-200 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </section>

        {/* Cookie Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What Are Cookies?</h2>
                <p className="text-gray-600 mb-6">
                  Cookies are small text files that are stored on your device when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences, 
                  analyzing how you use our site, and personalizing content.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">How We Use Cookies</h2>
                <p className="text-gray-600 mb-4">
                  We use cookies for several purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>To provide essential website functionality</li>
                  <li>To remember your preferences and settings</li>
                  <li>To analyze how our website is used</li>
                  <li>To improve our services and user experience</li>
                  <li>To provide personalized content and recommendations</li>
                  <li>To ensure security and prevent fraud</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">Types of Cookies We Use</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Cookies</h3>
                <p className="text-gray-600 mb-4">
                  These cookies are necessary for the website to function properly. They enable basic functions 
                  like page navigation, access to secure areas, and form submissions.
                </p>
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Examples:</strong> Authentication cookies, session management, security features
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Cookies</h3>
                <p className="text-gray-600 mb-4">
                  These cookies help us understand how visitors interact with our website by collecting 
                  and reporting information anonymously.
                </p>
                <div className="bg-green-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-green-800">
                    <strong>Examples:</strong> Google Analytics, page view tracking, user behavior analysis
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Preference Cookies</h3>
                <p className="text-gray-600 mb-4">
                  These cookies remember your choices and preferences to provide a more personalized experience.
                </p>
                <div className="bg-purple-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-purple-800">
                    <strong>Examples:</strong> Language preferences, theme settings, resume template preferences
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Marketing Cookies</h3>
                <p className="text-gray-600 mb-4">
                  These cookies are used to track visitors across websites to display relevant advertisements.
                </p>
                <div className="bg-orange-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-orange-800">
                    <strong>Examples:</strong> Social media pixels, advertising networks, retargeting
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">Third-Party Cookies</h2>
                <p className="text-gray-600 mb-4">
                  We may use third-party services that place cookies on your device:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li><strong>Google Analytics:</strong> To analyze website usage and performance</li>
                  <li><strong>Social Media Platforms:</strong> For social sharing and login features</li>
                  <li><strong>Payment Processors:</strong> To process secure payments</li>
                  <li><strong>Customer Support Tools:</strong> To provide live chat and support</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">Cookie Duration</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Session Cookies</h3>
                <p className="text-gray-600 mb-4">
                  These cookies are temporary and are deleted when you close your browser. They are used 
                  to maintain your session while you browse our website.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Persistent Cookies</h3>
                <p className="text-gray-600 mb-6">
                  These cookies remain on your device for a set period or until you delete them. 
                  They remember your preferences and settings for future visits.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">Managing Your Cookie Preferences</h2>
                <p className="text-gray-600 mb-4">
                  You have several options for managing cookies:
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Browser Settings</h3>
                <p className="text-gray-600 mb-4">
                  Most web browsers allow you to control cookies through their settings. You can:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Block all cookies</li>
                  <li>Allow only essential cookies</li>
                  <li>Delete existing cookies</li>
                  <li>Set preferences for specific websites</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cookie Consent</h3>
                <p className="text-gray-600 mb-4">
                  When you first visit our website, you'll see a cookie consent banner that allows you to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Accept all cookies</li>
                  <li>Customize your cookie preferences</li>
                  <li>Reject non-essential cookies</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Opt-Out Links</h3>
                <p className="text-gray-600 mb-6">
                  For third-party cookies, you can often opt out directly through the service provider's website.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">Impact of Disabling Cookies</h2>
                <p className="text-gray-600 mb-4">
                  If you choose to disable cookies, some features of our website may not work properly:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>You may need to log in repeatedly</li>
                  <li>Your preferences won't be remembered</li>
                  <li>Some features may be unavailable</li>
                  <li>Website performance may be affected</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">Updates to This Policy</h2>
                <p className="text-gray-600 mb-6">
                  We may update this Cookie Policy from time to time to reflect changes in our practices 
                  or for other operational, legal, or regulatory reasons. We will notify you of any material 
                  changes by posting the updated policy on this page.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about our use of cookies, please contact us:
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-600 mb-2">
                    <strong>Email:</strong> privacy@resumebuilder.com
                  </p>
                  {/* <p className="text-gray-600 mb-2">
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p> */}
                  <p className="text-gray-600 mb-2">
                    <strong>Address:</strong> 123 Resume Street, Uzbekistan, Tashkent 94105
                  </p>
                </div>

                <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> By continuing to use our website, you consent to our use of cookies 
                    as described in this policy. You can change your cookie preferences at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiesPage;
