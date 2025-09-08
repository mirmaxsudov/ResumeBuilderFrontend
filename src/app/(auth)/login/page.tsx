"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { Input, Button, Form } from "antd";
import { MailOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { NoticeEnum } from "@/enums/NoticeEnum";
import useMyNotice from "@/hooks/useMyNotice";
import validateEmail from "@/helpers/validateEmail";
import validatePassword from "@/helpers/validatePassword";
import { login } from "@/api/requests/auth/auth.api";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setValues } from "@/store/auth/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { registerWithGoogle } from "@/helpers/registerWithGoogle";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const { showMessage } = useMyNotice();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { token } = useAppSelector((state) => state.auth);
    const searchParams = useSearchParams();

    useEffect(() => {
        const redirectParam = searchParams.get('redirect');
        if (redirectParam && redirectParam.startsWith('/')) {
            try {
                localStorage.setItem('redirectAfterLogin', redirectParam);
            } catch (e) {
            }
        }
    }, [searchParams]);

    useEffect(() => {
        if (token) {
            let target = '/dashboard';
            try {
                const saved = localStorage.getItem('redirectAfterLogin');
                const param = searchParams.get('redirect');
                const candidate = param || saved;
                if (candidate && candidate.startsWith('/')) {
                    target = candidate;
                }
                if (saved) localStorage.removeItem('redirectAfterLogin');
            } catch (e) {
            }
            router.push(target);
        }
    }, [token, router, searchParams]);

    const handleSubmit = async (values: any) => {
        try {
            if (!validateEmail(email)) {
                showMessage("Please enter a valid email address", NoticeEnum.ERROR);
                return;
            }
            if (!validatePassword(password)) {
                showMessage("Password must be at least 8 characters long", NoticeEnum.ERROR);
                return;
            }

            setLoading(true);
            const response = await login(email, password);

            if (!response.success) {
                showMessage(response.message, NoticeEnum.ERROR);
                return;
            }

            showMessage("Successfully logged in!", NoticeEnum.SUCCESS);

            dispatch(setValues({
                token: response.data.accessToken,
                user: response.data
            }));

            // Resolve redirect target
            let target = '/dashboard';
            try {
                const saved = localStorage.getItem('redirectAfterLogin');
                const param = searchParams.get('redirect');
                const candidate = param || saved;
                if (candidate && candidate.startsWith('/')) {
                    target = candidate;
                }
                if (saved) localStorage.removeItem('redirectAfterLogin');
            } catch (e) {
            }

            router.push(target);
        } catch (error: any) {
            showMessage(error.response?.data?.message || "Failed to login", NoticeEnum.ERROR);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="relative flex min-h-screen">
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 relative overflow-hidden">
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
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h1 className="text-4xl font-bold mb-4">
                                    Welcome Back to Resume Builder
                                </h1>
                                <p className="text-xl opacity-90 leading-relaxed">
                                    Create professional resumes that get you hired.
                                    Join thousands of professionals who trust our platform.
                                </p>
                            </div>
                            <div className="space-y-4 text-left">
                                <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-white opacity-90">ATS-Optimized Templates</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-white opacity-90">AI-Powered Suggestions</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-white opacity-90">Real-time Preview</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full lg:w-1/2 bg-white justify-center items-center p-8">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-gray-600">
                                Sign in to your account to continue building your career
                            </p>
                        </div>
                        <div className="space-y-3 mb-8">
                            <button
                                type="button"
                                className="w-full py-3 px-4 border border-gray-300 rounded-xl flex items-center justify-center gap-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                                onClick={() => registerWithGoogle()}
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
                                onClick={() => window.location.href = "/oauth2/authorization/github"}
                            >
                                <FaGithub className="w-5 h-5" />
                                Continue with GitHub
                            </button>
                        </div>
                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                            </div>
                        </div>
                        <Form
                            form={form}
                            onFinish={handleSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: "Please input your email!" },
                                        { type: "email", message: "Please enter a valid email!" }
                                    ]}
                                    className="mb-0"
                                >
                                    <Input
                                        size="large"
                                        placeholder="Enter your email"
                                        prefix={<MailOutlined className="text-gray-400" />}
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
                                        { required: true, message: "Please input your password!" },
                                        { min: 8, message: "Password must be at least 8 characters!" }
                                    ]}
                                    className="mb-0"
                                >
                                    <Input.Password
                                        size="large"
                                        placeholder="Enter your password"
                                        prefix={<LockOutlined className="text-gray-400" />}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-12 rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                        iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                                    />
                                </Form.Item>
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                <a href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                                    Forgot password?
                                </a>
                            </div>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 border-0 rounded-xl font-semibold text-base"
                            >
                                Sign In
                            </Button>
                        </Form>
                        <div className="text-center mt-8">
                            <p className="text-gray-600">
                                Don't have an account?{" "}
                                <a href="/register" className="text-indigo-600 hover:text-indigo-500 font-semibold">
                                    Sign up for free
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;