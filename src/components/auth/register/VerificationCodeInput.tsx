import VerificationCodeInputProps from "@/types/auth/register/VerificationCodeInputProps";
import { useRef } from "react";

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

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/[^0-9a-zA-Z]/g, "").slice(0, length);

        if (pastedData) {
            const newValue = value.split("");
            for (let i = 0; i < pastedData.length; i++) {
                if (i < length) {
                    newValue[i] = pastedData[i];
                }
            }
            onChange(newValue.join(""));

            // Focus the next empty input or the last input
            const nextEmptyIndex = pastedData.length < length ? pastedData.length : length - 1;
            inputsRef.current[nextEmptyIndex]?.focus();
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
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center border rounded-md text-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
            ))}
        </div>
    );
};

export default VerificationCodeInput;