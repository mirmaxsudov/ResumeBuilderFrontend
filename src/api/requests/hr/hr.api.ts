import ApiResponse from "@/types/ApiResponse";
import $api from "@/api/request";

const BASE_URL: string = "/api/v1/hr";

const amIHr = async (): Promise<ApiResponse<boolean>> => {
    const response = await $api.get(BASE_URL + "/am-i-hr");
    return response.data;
}

export {amIHr};