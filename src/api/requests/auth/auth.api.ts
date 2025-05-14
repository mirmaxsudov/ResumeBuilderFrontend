import $api from "@/api/request";
import Role from "@/enums/Role";
import ApiResponse from "@/types/ApiResponse";
import AuthUserPreviewType from "@/types/auth/AuthUserPreviewType";

const BASE_AUTH_URL: string = "/api/v1/auth";

const login = async (login: string, password: string): Promise<ApiResponse<AuthUserPreviewType>> => {
  const response = await $api.post<ApiResponse<AuthUserPreviewType>>(
    `${BASE_AUTH_URL}/login`,
    { login, password },
  )
  return response.data;
};

const changeRole = async (role: Role): Promise<ApiResponse<AuthUserPreviewType>> => {
  const response = await $api.post<ApiResponse<AuthUserPreviewType>>(
    `${BASE_AUTH_URL}/${role}/change-role`
  )
  return response.data;
}

const logout = async (): Promise<ApiResponse<null>> => {
  const response = await $api.patch<ApiResponse<null>>(
    `${BASE_AUTH_URL}/logout`,
    null,
  );
  return response.data;
};

export { login, logout, changeRole };