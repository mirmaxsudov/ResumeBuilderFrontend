import $api from "@/api/request";
import ApiResponse from "@/types/ApiResponse";
import { CareerBase, CareerProfileType } from "@/types/careerProfile/CareerProfileType";

const BASE_URL: string = "/api/v1/career-profile";

export const getCareerProfile = async (): Promise<ApiResponse<CareerProfileType>> => {
    const response = await $api.get<ApiResponse<CareerProfileType>>(BASE_URL);
    return response.data;
}

export const getCareerProfileMyResumes = async (careerProfileId: number): Promise<ApiResponse<CareerBase[]>> => {
    const response = await $api.get<ApiResponse<CareerBase[]>>(BASE_URL + "/my-resumes-for-career-profile/" + careerProfileId);
    return response.data;
}