"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { Input, Button, message, Form } from "antd";
import { MailOutlined, LockOutlined, SafetyOutlined } from "@ant-design/icons";

type VerificationCodeInputProps = {
  value: string;
  onChange: (val: string) => void;
  length?: number;
};

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({ value, onChange, length = 6 }) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/[^0-9a-zA-Z]/g, "").slice(0, 1);
    const newValue = value.split("");
    newValue[idx] = val;
    onChange(newValue.join(""));
    if (val && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      const newValue = value.split("");
      newValue[idx - 1] = "";
      onChange(newValue.join(""));
      inputsRef.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-4 justify-center">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={el => {
            inputsRef.current[idx] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[idx] || ""}
          onChange={e => handleChange(e, idx)}
          onKeyDown={e => handleKeyDown(e, idx)}
          className="w-12 h-12 text-center border rounded-md text-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      ))}
    </div>
  );
};

export type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isVerificationSent, setIsVerificationSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showMessage = (message: string, type: NoticeType = "error") => {
    switch (type) {
      case "info": {
        messageApi.info(message);
        break;
      }
      case "success": {
        messageApi.success(message);
        break;
      }
      case "error": {
        messageApi.error(message);
        break;
      }
      case "warning": {
        messageApi.warning(message);
        break;
      }
      case "loading": {
        messageApi.loading(message);
        break;
      }
      default: {
        messageApi.error(message);
        break;
      }
    }
  }

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = async (values: any) => {
    try {
      if (!isVerificationSent) {
        if (!validateEmail(email)) {
          showMessage("Please enter a valid email address", "error");
          return;
        }
        if (!validatePassword(password)) {
          showMessage("Password must be at least 8 characters long", "error");
          return;
        }

        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        showMessage("Verification code sent to your email!", "success");
        setIsVerificationSent(true);
      } else {
        if (verificationCode.length !== 6) {
          showMessage("Please enter the complete verification code", "error");
          return;
        }

        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        showMessage("Registration successful!", "success");
      }
    } catch (error) {
      showMessage("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = () => {
    if (!validateEmail(email)) {
      showMessage("Please enter a valid email address", "error");
      return;
    }
    showMessage("Sending new verification code...", "loading");
    setTimeout(() => {
      showMessage("New verification code sent!", "success");
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
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-gray-700 text-base">Verification code sent to:</span>
                  <span className="font-semibold text-lg text-indigo-600">{email}</span>
                </div>
                <VerificationCodeInput
                  value={verificationCode}
                  onChange={setVerificationCode}
                  length={6}
                />
                <p className="text-sm text-gray-500 text-center">
                  We've sent a verification code to your email. Please check your inbox.
                </p>
                <Button
                  type="link"
                  onClick={handleResendCode}
                  className="w-full text-indigo-600"
                >
                  Didn't receive the code? Resend
                </Button>
                <div className="flex gap-2 mt-4">
                  <Button
                    type="default"
                    className="w-1/2"
                    onClick={() => {
                      setIsVerificationSent(false);
                      setVerificationCode("");
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-1/2 bg-indigo-600 hover:bg-indigo-700"
                  >
                    Verify & Register
                  </Button>
                </div>
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