import React from "react";
import dynamic from "next/dynamic";

// Dynamic imports for better performance
const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-blue-200 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  We collect information you provide directly to us, such as when you create an account, 
                  use our resume builder, or contact us for support.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Account credentials and profile information</li>
                  <li>Resume content and career information</li>
                  <li>Payment and billing information</li>
                  <li>Communication preferences</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Information</h3>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>How you use our services and features</li>
                  <li>Device information and browser type</li>
                  <li>IP address and location data</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">2. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect to provide, maintain, and improve our services.
                </p>
                
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Provide and personalize our resume builder services</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Send important updates and notifications</li>
                  <li>Respond to your questions and support requests</li>
                  <li>Improve our services and develop new features</li>
                  <li>Ensure security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">3. Information Sharing</h2>
                <p className="text-gray-600 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Providers</h3>
                <p className="text-gray-600 mb-4">
                  We may share information with trusted third-party service providers who assist us in 
                  operating our website, processing payments, and providing customer support.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Requirements</h3>
                <p className="text-gray-600 mb-4">
                  We may disclose your information if required by law or to protect our rights, 
                  property, or safety, or that of our users or the public.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">4. Data Security</h2>
                <p className="text-gray-600 mb-4">
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
                
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">5. Your Rights and Choices</h2>
                <p className="text-gray-600 mb-4">
                  You have certain rights regarding your personal information:
                </p>
                
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li><strong>Access:</strong> Request a copy of your personal information</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">6. Cookies and Tracking</h2>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar technologies to enhance your experience, analyze usage, 
                  and provide personalized content.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Types of Cookies</h3>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li><strong>Essential:</strong> Required for basic site functionality</li>
                  <li><strong>Analytics:</strong> Help us understand how visitors use our site</li>
                  <li><strong>Preferences:</strong> Remember your settings and preferences</li>
                  <li><strong>Marketing:</strong> Deliver relevant advertisements</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">7. Children's Privacy</h2>
                <p className="text-gray-600 mb-6">
                  Our services are not intended for children under 13 years of age. We do not knowingly 
                  collect personal information from children under 13. If you believe we have collected 
                  information from a child under 13, please contact us immediately.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">8. International Transfers</h2>
                <p className="text-gray-600 mb-6">
                  Your information may be transferred to and processed in countries other than your own. 
                  We ensure appropriate safeguards are in place to protect your information in accordance 
                  with this privacy policy.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">9. Changes to This Policy</h2>
                <p className="text-gray-600 mb-6">
                  We may update this privacy policy from time to time. We will notify you of any material 
                  changes by posting the new policy on this page and updating the "Last updated" date. 
                  Your continued use of our services after any changes constitutes acceptance of the updated policy.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">10. Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this privacy policy or our data practices, please contact us:
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
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPage;
