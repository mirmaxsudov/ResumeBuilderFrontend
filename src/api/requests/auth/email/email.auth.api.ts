import $api from "@/api/request";
import ApiResponse from "@/types/ApiResponse";
import AuthUserPreviewType from "@/types/auth/AuthUserPreviewType";

const BASE_EMAIL_URL = "/api/v1/email-register";

const register = async (email: string, password: string): Promise<ApiResponse<string>> => {
    const response = await $api.post<Promise<ApiResponse<string>>>(BASE_EMAIL_URL + "/register", null, {
        params: {
            email,
            password
        }
    })

    return response.data;
}

const verifyEmail = async (email: string, code: string): Promise<ApiResponse<AuthUserPreviewType>> => {
    const response = await $api.post<Promise<ApiResponse<AuthUserPreviewType>>>(BASE_EMAIL_URL + "/verify-email", null, {
        params: {
            email,
            code
        }
    })

    return response.data;
}

const resendCode = async (email: string, password: string): Promise<ApiResponse<string>> => {
    const response = await $api.post<Promise<ApiResponse<string>>>(BASE_EMAIL_URL + "/resend-code", null, {
        params: {
            email,
            password
        }
    })

    return response.data;
}

export { register, verifyEmail, resendCode };