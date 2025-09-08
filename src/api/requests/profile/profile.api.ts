import $api from "@/api/request";
import ApiResponse from "@/types/ApiResponse";
import { ImageAttachmentResponse } from "@/types/attachment/ImageAttachmentType";
import { CareerBase, CareerProfileResponseType, ExperienceItemResponse, ExperienceResponseType, LanguageResponseType, UpdateContactRequestType, UpdateEducationType, UpdateExperienceType, UpdateLanguageRequestType } from "@/types/careerProfile/CareerProfileType";

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

export const updateSkills = async (
    careerId: number,
    body: {
        title: string,
        skills: string[]
    }
) => {
    const response = await $api.put(BASE_URL + "/update-skills/" + careerId, body);
    return response.data;
}

export const updateLanguages = async (
    careerId: number,
    requestBody: UpdateLanguageRequestType
): Promise<ApiResponse<LanguageResponseType>> => {
    const respone = await $api.put<ApiResponse<LanguageResponseType>>(BASE_URL + "/update-languages/" + careerId, requestBody);
    return respone.data;
}

export const updateExperience = async (
    careerId: number,
    requestBody: UpdateExperienceType
) => {
    const response = await $api.put<ApiResponse<ExperienceResponseType>>(BASE_URL + "/update-experience/" + careerId, requestBody)
    return response.data;
}

export const updateEducation = async (
    careerId: number,
    requestBody: UpdateEducationType
) => {
    const response = await $api.put<ApiResponse<CareerProfileResponseType["education"]>>(BASE_URL + "/update-education/" + careerId, requestBody);
    return response.data;
}

// Deletes

export const deleteProfileImage = async (
    careerId: number
) => {
    const response = await $api.delete<ApiResponse<String>>(BASE_URL + "/delete-profile/" + careerId);
    return response.data;
}
