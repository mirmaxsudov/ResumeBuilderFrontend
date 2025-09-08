"use client";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2, Mail, MapPin, } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSubjectEnum } from "@/enums/ContactSubjectEnum";
import { newContact } from "@/api/requests/support/contact.api";
import type { ContactRequestType } from "@/types/support/contactType";
import useMyNotice from "@/hooks/useMyNotice";
import { NoticeEnum } from "@/enums/NoticeEnum";

const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),
  subject: z.string().trim().min(1, "Subject is required"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be at most 1000 characters"),
});

type ContactFormInput = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  const { showMessage } = useMyNotice();

  const onSubmit = async (values: ContactFormInput) => {
    const payload: ContactRequestType = {
      firstname: values.firstName,
      lastname: values.lastName,
      email: values.email,
      subject: values.subject,
      message: values.message,
    };


    try {
      showMessage("Sending...", NoticeEnum.LOADING);
      await newContact(payload);
      showMessage("Saved", NoticeEnum.SUCCESS);
      reset();
    } catch (e) {
      showMessage("Something went wrong!", NoticeEnum.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Have questions about our resume builder? We're here to help you create the perfect resume.
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        {...register("firstName")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        {...register("lastName")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      {...register("subject")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="GENERAL_INQUIRY">General Inquiry</option>
                      <option value="TECHNICAL_SUPPORT">Technical Support</option>
                      <option value="FEATURE_REQUEST">Feature Request</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-2 text-sm text-red-600">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      {...register("message")}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    {isSubmitting ? <>
                      <div className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </div>
                    </> : "Send Message"}
                  </button>
                </form>
              </div>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                  <p className="text-gray-600 mb-8">
                    We're here to help you create the perfect resume. Reach out to us through any of the channels below.
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Email Us</h3>
                      <p className="text-gray-600 mb-2">abdurahmonmirmaxsudov2804@gmail.com</p>
                      <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Location</h3>
                      <p className="text-gray-600 mb-2">Uzbekistan, Tashkent</p>
                    </div>
                  </div>
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

export default ContactPage;
