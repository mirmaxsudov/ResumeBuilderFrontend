"use client";

import Image from "next/image";
import React, {useState, useEffect} from "react";
import {FaGithub} from "react-icons/fa";
import {Input, Button, Form} from "antd";
import {MailOutlined, LockOutlined} from "@ant-design/icons";
import {NoticeEnum} from "@/enums/NoticeEnum";
import useMyNotice from "@/hooks/useMyNotice";
import validateEmail from "@/helpers/validateEmail";
import validatePassword from "@/helpers/validatePassword";
import {login} from "@/api/requests/auth/auth.api";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {setValues} from "@/store/auth/authSlice";
import {useRouter} from "next/navigation";
import {registerWithGoogle} from "@/helpers/registerWithGoogle";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const {showMessage} = useMyNotice();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const {token} = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (token) {
            router.push("/dashboard");
        }
    }, [token, router]);

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

            router.push("/dashboard");

        } catch (error: any) {
            showMessage(error.response?.data?.message || "Failed to login", NoticeEnum.ERROR);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div
                className="hidden md:flex w-1/2 bg-cover bg-center items-center justify-center text-white p-10"
                style={{backgroundImage: `url('/images/auth/bgOfAuth.png')`}}
            >
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Online Community For Front-end Developers
                    </h1>
                    <p className="text-lg opacity-90">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt.
                    </p>
                </div>
            </div>

            <div className="flex w-full md:w-1/2 bg-white justify-center items-center p-8">
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    className="w-full max-w-md space-y-6"
                >
                    <h2 className="text-2xl font-semibold text-center">
                        Welcome back to the{" "}
                        <span className="text-indigo-600 font-bold">Resume Builder</span>
                    </h2>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            className="flex-1 py-2 border rounded-md flex items-center justify-center gap-2 text-sm hover:bg-gray-50"
                            onClick={() => registerWithGoogle()}
                        >
                            <Image
                                src="https://www.svgrepo.com/show/355037/google.svg"
                                alt="google"
                                className="w-4 h-4"
                                width={20}
                                height={20}
                            />
                            Log In with Google
                        </button>
                        <button
                            type="button"
                            className="flex-1 py-2 border rounded-md flex items-center justify-center gap-2 text-sm hover:bg-gray-50"
                            onClick={() => window.location.href = "/oauth2/authorization/github"}
                        >
                            <FaGithub/>
                            Log In with Github
                        </button>
                    </div>

                    <div className="space-y-4">
                        <Form.Item
                            name="email"
                            rules={[
                                {required: true, message: "Please input your email!"},
                                {type: "email", message: "Please enter a valid email!"}
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="Email"
                                prefix={<MailOutlined className="text-gray-400"/>}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {required: true, message: "Please input your password!"},
                                {min: 8, message: "Password must be at least 8 characters!"}
                            ]}
                        >
                            <Input.Password
                                size="large"
                                placeholder="Password"
                                prefix={<LockOutlined className="text-gray-400"/>}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full"
                            />
                        </Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="w-full h-10 bg-indigo-600 hover:bg-indigo-700"
                        >
                            LOG IN
                        </Button>
                    </div>

                    <p className="text-center text-sm">
                        No Account yet?{" "}
                        <a href="/register" className="text-indigo-600 font-semibold">
                            SIGN UP
                        </a>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default Login;