import $api from "@/api/request";
import ApiResponse from "@/types/ApiResponse";
import { CoverLetterResponseType } from "@/types/coverLetter/CoverLetterType";

const BASE_COVER_LETTER_URL: string = "/api/v1/cover-letter";

const CoverLetterApi = {
    create: async (coverLetter: CoverLetterResponseType): Promise<ApiResponse<CoverLetterResponseType>> => {
        const response = await $api.post<ApiResponse<CoverLetterResponseType>>(BASE_COVER_LETTER_URL + "/create-or-update", coverLetter);
        return response.data;
    },
    getAll: async (size: number, page: number, search: string): Promise<ApiResponse<{
        coverLetters: CoverLetterResponseType[],
        page: number,
        size: number,
        total: number
    }>> => {
        const response = await $api.get<ApiResponse<{
            coverLetters: CoverLetterResponseType[],
            page: number,
            size: number,
            total: number
        }>>(BASE_COVER_LETTER_URL + "/all", {
            params: {
                size,
                page,
                search
            }
        });
        return response.data;
    },
    getById: async (id: number): Promise<ApiResponse<CoverLetterResponseType>> => {
        const response = await $api.get<ApiResponse<CoverLetterResponseType>>(BASE_COVER_LETTER_URL + `/get/${id}`);
        return response.data;
    },
    deleteById: async (id: number): Promise<ApiResponse<string>> => {
        const response = await $api.delete<ApiResponse<string>>(BASE_COVER_LETTER_URL + "/delete/" + id);
        return response.data;
    }
}

export default CoverLetterApi;