import $api from "@/api/request";
import ApiResponse from "@/types/ApiResponse";
import { ImageAttachmentResponse } from "@/types/attachment/ImageAttachmentType";
import { CareerBase, CareerProfileResponseType, UpdateContactRequestType } from "@/types/careerProfile/CareerProfileType";

const BASE_URL: string = "/api/v1/career-profile";

export const getCareerProfile = async (): Promise<ApiResponse<CareerProfileResponseType>> => {
    const response = await $api.get<ApiResponse<CareerProfileResponseType>>(BASE_URL);
    return response.data;
}

export const getCareerProfileMyResumes = async (careerProfileId: number): Promise<ApiResponse<CareerBase[]>> => {
    const response = await $api.get<ApiResponse<CareerBase[]>>(BASE_URL + "/my-resumes-for-career-profile/" + careerProfileId);
    return response.data;
}

// Updates

export const updateContact = async (req: UpdateContactRequestType, id: number): Promise<ApiResponse<string>> => {
    const response = await $api.put(BASE_URL + "/update-contact/" + id, req);
    return response.data;
}

export const updateSummary = async (careerId: number, summary: string, title: string): Promise<ApiResponse<string>> => {
    const response = await $api.put<ApiResponse<string>>(BASE_URL + "/update-summary/" + careerId, summary, {
        params: {
            title
        }
    });
    return response.data;
}

export const updateCareerImages = async (
    careerId: number,
    imageAttachmentId: number,
    type: "THUMBNAIL_IMAGE" | "PROFILE_IMAGE"): Promise<ApiResponse<ImageAttachmentResponse>> => {
    const response = await $api.put(BASE_URL + "/" + careerId + "/image/" + imageAttachmentId, null, {
        params: {
            type
        }
    });
    return response.data;
}