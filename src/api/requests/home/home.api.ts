import $api from "@/api/request";
import ApiResponse from "@/types/ApiResponse";

const HOME_BASE_URL = "/api/v1/home/statistics";


const getCountOfUsers = async (): Promise<ApiResponse<number>> => {
    const response = await $api.get(HOME_BASE_URL + "/count-users");
    return response.data;
}

const getCountOfResumes = async (): Promise<ApiResponse<number>> => {
    const response = await $api.get(HOME_BASE_URL + "/count-resume");
    return response.data;
}

export { getCountOfUsers, getCountOfResumes };