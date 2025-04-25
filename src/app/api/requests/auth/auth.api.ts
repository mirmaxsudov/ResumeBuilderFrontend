import $api from "@/app/api/request";
import ApiResponse from "@/app/types/ApiResponse";

const BASE_AUTH_URL: string = "/api/v1/auth";

const authenticate = async (code: string, password: string): Promise<ApiResponse<null> | null> => {
    const response = await $api.post<ApiResponse<null>>(`${BASE_AUTH_URL}/authenticate`, undefined, {
        params: {code, password}
    });
    return response.data;
}

export {authenticate};