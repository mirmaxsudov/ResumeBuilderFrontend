"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Input, Button, Form } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { NoticeEnum } from "@/enums/NoticeEnum";
import useMyNotice from "@/hooks/useMyNotice";
import validateEmail from "@/helpers/validateEmail";
import validatePassword from "@/helpers/validatePassword";
import VerificationCode from "@/components/auth/register/VerificationCode";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isVerificationSent, setIsVerificationSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { showMessage, contextHolder } = useMyNotice();

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
        await new Promise(resolve => setTimeout(resolve, 1000));
        showMessage("Verification code sent to your email!", NoticeEnum.SUCCESS);
        setIsVerificationSent(true);
      } else {
        if (verificationCode.length !== 6) {
          showMessage("Please enter the complete verification code", NoticeEnum.ERROR);
          return;
        }

        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        showMessage("Registration successful!", NoticeEnum.SUCCESS);
      }
    } catch (error) {
      showMessage("Something went wrong. Please try again.", NoticeEnum.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = () => {
    if (!validateEmail(email)) {
      showMessage("Please enter a valid email address", NoticeEnum.ERROR);
      return;
    }
    showMessage("Sending new verification code...", NoticeEnum.LOADING);
    setTimeout(() => {
      showMessage("New verification code sent!", NoticeEnum.SUCCESS);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {contextHolder}

      <div
        className="hidden md:flex w-1/2 bg-cover bg-center items-center justify-center text-white p-10"
        style={{ backgroundImage: `url('/images/auth/bgOfAuth.png')` }}
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
            Welcome to the{" "}
            <span className="text-indigo-600 font-bold">Resume Builder</span>
          </h2>

          <div className="flex gap-4">
            <button
              type="button"
              className="flex-1 py-2 border rounded-md flex items-center justify-center gap-2 text-sm hover:bg-gray-50"
            >
              <Image
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="google"
                className="w-4 h-4"
                width={20}
                height={20}
              />
              Register with Google
            </button>
            <button
              type="button"
              className="flex-1 py-2 border rounded-md flex items-center justify-center gap-2 text-sm hover:bg-gray-50"
            >
              <FaGithub />
              Register with Github
            </button>
          </div>

          <div className="space-y-4">
            {!isVerificationSent ? (
              <>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" }
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Email"
                    prefix={<MailOutlined className="text-gray-400" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                    { min: 8, message: "Password must be at least 8 characters!" }
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Password"
                    prefix={<LockOutlined className="text-gray-400" />}
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
                  Send Verification Code
                </Button>
              </>
            ) : (
              <>
                <VerificationCode
                  email={email}
                  verificationCode={verificationCode}
                  setVerificationCode={setVerificationCode}
                  handleResendCode={handleResendCode}
                  setIsVerificationSent={setIsVerificationSent}
                  loading={loading}
                />
              </>
            )}
          </div>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 font-semibold">
              LOG IN
            </a>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;