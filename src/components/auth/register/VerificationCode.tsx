
import { Button } from "antd";
import VerificationCodeInput from "./VerificationCodeInput";

const VerificationCode = ({
    email,
    verificationCode,
    setVerificationCode,
    handleResendCode,
    setIsVerificationSent,
    loading,
}: any) => {
    return <>
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
}

export default VerificationCode;