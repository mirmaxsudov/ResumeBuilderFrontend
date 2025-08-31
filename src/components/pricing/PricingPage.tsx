"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle, 
  X, 
  Star, 
  ArrowRight, 
  Zap, 
  Shield, 
  Users, 
  Crown,
  Download,
  Eye,
  Palette,
  Globe,
  Clock,
  FileText
} from "lucide-react";

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const plans = [
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started",
      price: { monthly: 0, yearly: 0 },
      features: [
        "1 resume template",
        "Basic ATS optimization",
        "PDF export",
        "Email support",
        "Mobile responsive"
      ],
      limitations: [
        "Limited templates",
        "No AI suggestions",
        "Basic formatting",
        "No cover letters"
      ],
      popular: false,
      cta: "Get Started Free",
      ctaLink: "/register"
    },
    {
      id: "pro",
      name: "Pro",
      description: "Most popular for job seekers",
      price: { monthly: 9.99, yearly: 99 },
      features: [
        "50+ professional templates",
        "AI-powered suggestions",
        "ATS optimization",
        "Multiple export formats",
        "Cover letter builder",
        "Resume scoring",
        "Priority support",
        "Unlimited resumes",
        "Custom branding",
        "Version history"
      ],
      limitations: [],
      popular: true,
      cta: "Start Free Trial",
      ctaLink: "/register"
    },
    {
      id: "premium",
      name: "Premium",
      description: "For professionals and teams",
      price: { monthly: 19.99, yearly: 199 },
      features: [
        "Everything in Pro",
        "Advanced AI suggestions",
        "Custom templates",
        "Team collaboration",
        "Advanced analytics",
        "Priority support",
        "API access",
        "White-label options",
        "Bulk operations",
        "Advanced integrations"
      ],
      limitations: [],
      popular: false,
      cta: "Start Free Trial",
      ctaLink: "/register"
    }
  ];

  const features = [
    {
      category: "Templates & Design",
      items: [
        { name: "Professional Templates", free: "1", pro: "50+", premium: "Unlimited" },
        { name: "Custom Branding", free: false, pro: true, premium: true },
        { name: "Color Customization", free: false, pro: true, premium: true },
        { name: "Font Selection", free: false, pro: true, premium: true },
        { name: "Layout Options", free: false, pro: true, premium: true }
      ]
    },
    {
      category: "AI & Smart Features",
      items: [
        { name: "AI Content Suggestions", free: false, pro: true, premium: true },
        { name: "Keyword Optimization", free: false, pro: true, premium: true },
        { name: "Resume Scoring", free: false, pro: true, premium: true },
        { name: "ATS Compatibility Check", free: false, pro: true, premium: true },
        { name: "Industry Insights", free: false, pro: true, premium: true }
      ]
    },
    {
      category: "Export & Sharing",
      items: [
        { name: "PDF Export", free: true, pro: true, premium: true },
        { name: "Word Document", free: false, pro: true, premium: true },
        { name: "Plain Text", free: false, pro: true, premium: true },
        { name: "Print Optimization", free: false, pro: true, premium: true },
        { name: "Cloud Storage", free: false, pro: true, premium: true }
      ]
    },
    {
      category: "Support & Access",
      items: [
        { name: "Email Support", free: true, pro: true, premium: true },
        { name: "Priority Support", free: false, pro: true, premium: true },
        { name: "Live Chat", free: false, pro: false, premium: true },
        { name: "Phone Support", free: false, pro: false, premium: true },
        { name: "24/7 Access", free: true, pro: true, premium: true }
      ]
    }
  ];

  const getCurrentPrice = (plan: any) => {
    return billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly;
  };

  const getSavings = (plan: any) => {
    if (billingCycle === "yearly" && plan.price.yearly > 0) {
      const monthlyTotal = plan.price.monthly * 12;
      const savings = monthlyTotal - plan.price.yearly;
      return savings;
    }
    return 0;
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your career goals. Start free and upgrade when you're ready.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-gray-900" : "text-gray-500"}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingCycle === "yearly" ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === "yearly" ? "text-gray-900" : "text-gray-500"}`}>
                Yearly
                {billingCycle === "yearly" && (
                  <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Save 17%
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? "border-blue-500 scale-105" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    
                    <div className="mb-4">
                      {plan.price.monthly === 0 ? (
                        <div className="text-4xl font-bold text-gray-900">Free</div>
                      ) : (
                        <div>
                          <div className="text-4xl font-bold text-gray-900">
                            ${getCurrentPrice(plan)}
                            <span className="text-lg text-gray-500">
                              /{billingCycle === "monthly" ? "mo" : "year"}
                            </span>
                          </div>
                          {getSavings(plan) > 0 && (
                            <div className="text-sm text-green-600 mt-1">
                              Save ${getSavings(plan)} per year
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <Link href={plan.ctaLink}>
                      <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                        plan.popular
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}>
                        {plan.cta}
                      </button>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations.length > 0 && (
                      <>
                        <h4 className="font-semibold text-gray-900 mb-3 mt-6">Limitations:</h4>
                        {plan.limitations.map((limitation, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <span className="text-gray-500">{limitation}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Compare Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See exactly what each plan includes and choose the one that's right for you.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-6 font-semibold text-gray-900">Features</th>
                  <th className="text-center p-6 font-semibold text-gray-900">Free</th>
                  <th className="text-center p-6 font-semibold text-gray-900 bg-blue-50">Pro</th>
                  <th className="text-center p-6 font-semibold text-gray-900">Premium</th>
                </tr>
              </thead>
              <tbody>
                {features.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="p-4 font-semibold text-gray-900">
                        {category.category}
                      </td>
                    </tr>
                    {category.items.map((item, itemIndex) => (
                      <tr key={itemIndex} className="border-b border-gray-100">
                        <td className="p-6 text-gray-700">{item.name}</td>
                        <td className="p-6 text-center">
                          {typeof item.free === "boolean" ? (
                            item.free ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-red-500 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-700">{item.free}</span>
                          )}
                        </td>
                        <td className="p-6 text-center bg-blue-50">
                          {typeof item.pro === "boolean" ? (
                            item.pro ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-red-500 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-700">{item.pro}</span>
                          )}
                        </td>
                        <td className="p-6 text-center">
                          {typeof item.premium === "boolean" ? (
                            item.premium ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-red-500 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-700">{item.premium}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. You'll continue to have access to your plan features until the end of your current billing period.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Yes! You can start with our free plan and upgrade to Pro or Premium anytime. All paid plans come with a 7-day free trial.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. All payments are processed securely through Stripe.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change my plan later?
              </h3>
              <p className="text-gray-600">
                Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Your Professional Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already created winning resumes. 
            Start free and upgrade when you're ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center space-x-2">
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/templates">
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
                View Templates
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
