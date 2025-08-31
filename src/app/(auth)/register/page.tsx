"use client";

import Image from "next/image";
import React, {useState} from "react";
import {FaGithub} from "react-icons/fa";
import {Input, Button, Form} from "antd";
import {MailOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined} from "@ant-design/icons";
import {NoticeEnum} from "@/enums/NoticeEnum";
import useMyNotice from "@/hooks/useMyNotice";
import validateEmail from "@/helpers/validateEmail";
import validatePassword from "@/helpers/validatePassword";
import VerificationCode from "@/components/auth/register/VerificationCode";
import {registerWithGoogle} from "@/helpers/registerWithGoogle";
import {register, resendCode, verifyEmail} from "@/api/requests/auth/email/email.auth.api";
import {useAppDispatch} from "@/hooks/hooks";
import {setValues} from "@/store/auth/authSlice";

const RegisterPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [verificationCode, setVerificationCode] = useState<string>("");
    const [isVerificationSent, setIsVerificationSent] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const {showMessage} = useMyNotice();
    const dispatch = useAppDispatch();

    const handleSubmit = async (values: any) => {
        try {
            if (!isVerificationSent) {
                if (!validateEmail(email)) {
                    showMessage("Please enter a valid email address", NoticeEnum.ERROR);
                    return;
                }
                if (!validatePassword(password)) {
                    showMessage("Password must be at least 8 characters long", NoticeEnum.ERROR);
                    return;
                }

                setLoading(true);
                await sendVerificationCode();
            } else {
                if (verificationCode.length !== 6) {
                    showMessage("Please enter the complete verification code", NoticeEnum.ERROR);
                    return;
                }

                setLoading(true);
                await verifyEmailHandler();
            }
        } catch (error) {
            showMessage("Something went wrong. Please try again.", NoticeEnum.ERROR);
        } finally {
            setLoading(false);
        }
    };

    const verifyEmailHandler = async () => {
        try {
            const response = await verifyEmail(email, verificationCode);

            if (!response.success) {
                showMessage(response.message, NoticeEnum.ERROR);
                return;
            }

            showMessage("Verification successful!", NoticeEnum.SUCCESS);
            setIsVerificationSent(true);

            dispatch(setValues({
                token: response.data.accessToken,
                user: response.data
            }))

            window.location.href = "/dashboard";

        } catch (error: any) {
            showMessage(error.response.data.message, NoticeEnum.ERROR);
        }
    }

    const sendVerificationCode = async () => {
        try {
            const response = await register(email, password);

            if (!response.success) {
                showMessage(response.message, NoticeEnum.ERROR);
                return;
            }

            showMessage("Verification code sent to your email!", NoticeEnum.SUCCESS);
            setIsVerificationSent(true);
        } catch (error: any) {
            showMessage(error.response.data.message, NoticeEnum.ERROR);
        }
    }

    const handleResendCode = async () => {
        if (!validateEmail(email)) {
            showMessage("Please enter a valid email address", NoticeEnum.ERROR);
            return;
        }
        try {
            showMessage("Sending new verification code...", NoticeEnum.LOADING);

            const response = await resendCode(email, password);

            if (!response.success) {
                showMessage(response.message, NoticeEnum.ERROR);
                return;
            }

            showMessage("Verification code sent successfully!", NoticeEnum.SUCCESS);
        } catch (error: any) {
            showMessage(error.response.data.message, NoticeEnum.ERROR);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            
            <div className="relative flex min-h-screen">
                {/* Left Side - Hero Section */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 relative overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-white opacity-10 rounded-full animate-blob"></div>
                        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-300 opacity-10 rounded-full animate-blob animation-delay-2000"></div>
                        <div className="absolute bottom-20 left-40 w-80 h-80 bg-indigo-300 opacity-10 rounded-full animate-blob animation-delay-4000"></div>
                    </div>
                    
                    <div className="relative z-10 flex items-center justify-center w-full p-12">
                        <div className="text-center text-white max-w-md">
                            <div className="mb-8">
                                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                </div>
                                <h1 className="text-4xl font-bold mb-4">
                                    Join Resume Builder Today
                                </h1>
                                <p className="text-xl opacity-90 leading-relaxed">
                                    Start creating professional resumes that stand out. 
                                    Get hired faster with our AI-powered platform.
                                </p>
                            </div>
                            
                            {/* Benefits */}
                            <div className="space-y-4 text-left">
                                <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-white opacity-90">50+ Professional Templates</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-white opacity-90">Free to Get Started</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-white opacity-90">98% Success Rate</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Register Form */}
                <div className="flex w-full lg:w-1/2 bg-white justify-center items-center p-8">
                    <div className="w-full max-w-md">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Create Your Account
                            </h2>
                            <p className="text-gray-600">
                                Join thousands of professionals building their careers
                            </p>
                        </div>

                        {/* Social Register Buttons */}
                        <div className="space-y-3 mb-8">
                            <button
                                onClick={registerWithGoogle}
                                type="button"
                                className="w-full py-3 px-4 border border-gray-300 rounded-xl flex items-center justify-center gap-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                            >
                                <Image
                                    src="https://www.svgrepo.com/show/355037/google.svg"
                                    alt="google"
                                    className="w-5 h-5"
                                    width={20}
                                    height={20}
                                />
                                Continue with Google
                            </button>
                            <button
                                type="button"
                                className="w-full py-3 px-4 border border-gray-300 rounded-xl flex items-center justify-center gap-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                            >
                                <FaGithub className="w-5 h-5"/>
                                Continue with GitHub
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                            </div>
                        </div>

                        {/* Register Form */}
                        <Form
                            form={form}
                            onFinish={handleSubmit}
                            className="space-y-6"
                        >
                            {!isVerificationSent ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                {required: true, message: "Please input your email!"},
                                                {type: "email", message: "Please enter a valid email!"}
                                            ]}
                                            className="mb-0"
                                        >
                                            <Input
                                                size="large"
                                                placeholder="Enter your email"
                                                prefix={<MailOutlined className="text-gray-400"/>}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="h-12 rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </Form.Item>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {required: true, message: "Please input your password!"},
                                                {min: 8, message: "Password must be at least 8 characters!"}
                                            ]}
                                            className="mb-0"
                                        >
                                            <Input.Password
                                                size="large"
                                                placeholder="Create a password"
                                                prefix={<LockOutlined className="text-gray-400"/>}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="h-12 rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <input 
                                            type="checkbox" 
                                            className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                                        />
                                        <div className="text-sm text-gray-600">
                                            I agree to the{" "}
                                            <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                                                Terms of Service
                                            </a>{" "}
                                            and{" "}
                                            <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                                                Privacy Policy
                                            </a>
                                        </div>
                                    </div>

                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 border-0 rounded-xl font-semibold text-base"
                                    >
                                        Create Account
                                    </Button>
                                </>
                            ) : (
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            Check Your Email
                                        </h3>
                                        <p className="text-gray-600">
                                            We've sent a verification code to <span className="font-medium">{email}</span>
                                        </p>
                                    </div>
                                    
                                    <VerificationCode
                                        email={email}
                                        verificationCode={verificationCode}
                                        setVerificationCode={setVerificationCode}
                                        handleResendCode={handleResendCode}
                                        setIsVerificationSent={setIsVerificationSent}
                                        loading={loading}
                                    />
                                </div>
                            )}
                        </Form>

                        {/* Sign In Link */}
                        <div className="text-center mt-8">
                            <p className="text-gray-600">
                                Already have an account?{" "}
                                <a href="/login" className="text-indigo-600 hover:text-indigo-500 font-semibold">
                                    Sign in here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;