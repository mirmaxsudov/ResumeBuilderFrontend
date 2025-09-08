import React from "react";
import dynamic from "next/dynamic";

// Dynamic imports for better performance
const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Please read these terms carefully before using our resume builder services.
            </p>
            <p className="text-sm text-blue-200 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Acceptance of Terms</h2>
                <p className="text-gray-600 mb-6">
                  By accessing and using Resume Builder ("Service"), you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">2. Description of Service</h2>
                <p className="text-gray-600 mb-4">
                  Resume Builder provides an online platform for creating, editing, and managing professional resumes. 
                  Our services include:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Resume templates and design tools</li>
                  <li>Cover letter creation</li>
                  <li>Resume optimization and ATS compatibility</li>
                  <li>Document storage and management</li>
                  <li>Export and sharing capabilities</li>
                  <li>Career advice and resources</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">3. User Accounts</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Creation</h3>
                <p className="text-gray-600 mb-4">
                  To access certain features of our Service, you must create an account. You agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your account information</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Termination</h3>
                <p className="text-gray-600 mb-6">
                  We reserve the right to terminate or suspend your account at any time for violations of these terms 
                  or for any other reason at our sole discretion.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">4. User Content</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Content</h3>
                <p className="text-gray-600 mb-4">
                  You retain ownership of all content you create using our Service. By using our Service, you grant us 
                  a limited license to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Store and process your content to provide our services</li>
                  <li>Use your content for service improvement and analytics</li>
                  <li>Backup and secure your content</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Guidelines</h3>
                <p className="text-gray-600 mb-4">
                  You agree not to create, upload, or share content that:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Is illegal, harmful, or violates any laws</li>
                  <li>Infringes on intellectual property rights</li>
                  <li>Contains malware, viruses, or harmful code</li>
                  <li>Is spam, misleading, or fraudulent</li>
                  <li>Harasses, abuses, or discriminates against others</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">5. Subscription and Payment</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Free and Premium Plans</h3>
                <p className="text-gray-600 mb-4">
                  We offer both free and premium subscription plans. Premium features require payment.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Terms</h3>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>All fees are non-refundable except as required by law</li>
                  <li>Subscriptions automatically renew unless cancelled</li>
                  <li>We may change pricing with 30 days notice</li>
                  <li>You are responsible for all applicable taxes</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cancellation</h3>
                <p className="text-gray-600 mb-6">
                  You may cancel your subscription at any time through your account settings. 
                  Cancellation takes effect at the end of your current billing period.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">6. Intellectual Property</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Rights</h3>
                <p className="text-gray-600 mb-4">
                  Resume Builder and its original content, features, and functionality are owned by us and are 
                  protected by international copyright, trademark, patent, trade secret, and other intellectual 
                  property laws.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Templates and Designs</h3>
                <p className="text-gray-600 mb-6">
                  Our resume templates and designs are provided for your use under license. You may use them 
                  to create your resumes, but you may not redistribute, sell, or modify them for commercial purposes.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">7. Privacy and Data Protection</h2>
                <p className="text-gray-600 mb-6">
                  Your privacy is important to us. Our collection and use of personal information is governed 
                  by our Privacy Policy, which is incorporated into these Terms by reference.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">8. Disclaimers and Limitations</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Availability</h3>
                <p className="text-gray-600 mb-4">
                  We strive to provide reliable service but cannot guarantee uninterrupted access. 
                  We may temporarily suspend service for maintenance or updates.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">No Warranty</h3>
                <p className="text-gray-600 mb-4">
                  The Service is provided "as is" without warranties of any kind. We disclaim all warranties, 
                  express or implied, including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Warranties of merchantability and fitness for a particular purpose</li>
                  <li>Warranties that the service will meet your specific requirements</li>
                  <li>Warranties that the service will be uninterrupted or error-free</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
                <p className="text-gray-600 mb-6">
                  In no event shall Resume Builder be liable for any indirect, incidental, special, 
                  consequential, or punitive damages, including without limitation, loss of profits, data, 
                  use, goodwill, or other intangible losses.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">9. Indemnification</h2>
                <p className="text-gray-600 mb-6">
                  You agree to defend, indemnify, and hold harmless Resume Builder from and against any claims, 
                  damages, obligations, losses, liabilities, costs, or debt arising from your use of the Service 
                  or violation of these Terms.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">10. Governing Law</h2>
                <p className="text-gray-600 mb-6">
                  These Terms shall be governed by and construed in accordance with the laws of the State of 
                  California, without regard to its conflict of law provisions.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">11. Changes to Terms</h2>
                <p className="text-gray-600 mb-6">
                  We reserve the right to modify these Terms at any time. We will notify users of any material 
                  changes by posting the new Terms on this page. Your continued use of the Service after such 
                  modifications constitutes acceptance of the updated Terms.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">12. Contact Information</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-600 mb-2">
                    <strong>Email:</strong> legal@resumebuilder.com
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
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

export default TermsPage;
