import $api from "@/api/request";
import Role from "@/enums/Role";
import ApiResponse from "@/types/ApiResponse";
import AuthUserPreviewType from "@/types/auth/AuthUserPreviewType";
import { MyRoleResponse } from "@/types/auth/MyRoleResponse";

const BASE_AUTH_URL: string = "/api/v1/auth";

const login = async (login: string, password: string): Promise<ApiResponse<AuthUserPreviewType>> => {
  const response = await $api.post<ApiResponse<AuthUserPreviewType>>(
    `${BASE_AUTH_URL}/login`,
    { login, password },
  )

  console.log(response.data);

  return response.data;
};

const changeRole = async (role: Role | string, password: string): Promise<ApiResponse<AuthUserPreviewType>> => {
  const response = await $api.patch<ApiResponse<AuthUserPreviewType>>(
    `${BASE_AUTH_URL}/${role}/change-role`,
    null,
    {
      params: {
        password
      }
    }
  )
  return response.data;
}

const getMe = async (): Promise<ApiResponse<AuthUserPreviewType>> => {
  const response = await $api.get<ApiResponse<AuthUserPreviewType>>(BASE_AUTH_URL + "/me");
  return response.data;
}

const logout = async (): Promise<ApiResponse<null>> => {
  const response = await $api.post<ApiResponse<null>>(
    `${BASE_AUTH_URL}/logout`,
    null,
  );
  return response.data;
};

const getMyRoles = async (): Promise<ApiResponse<MyRoleResponse[]>> => {
  const response = await $api.get(BASE_AUTH_URL + "/my-roles");
  return response.data;
}

export { login, logout, changeRole, getMyRoles, getMe };