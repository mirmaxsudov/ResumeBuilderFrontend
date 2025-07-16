import ApiResponse from "@/types/ApiResponse";
import $api from "@/api/request";
import {BecomeHrMessageResponse, BecomeHrResponse} from "@/types/hr/BecomeHrType";

const BASE_URL: string = "/api/v1/become-hr";

const getBecomeHr = async (): Promise<ApiResponse<BecomeHrResponse>> => {
    const response = await $api.get<ApiResponse<BecomeHrResponse>>(BASE_URL);
    return response.data;
}

const newBecomeHr = async (companyName: string, description: string): Promise<ApiResponse<BecomeHrResponse>> => {
    const response = await $api.post<ApiResponse<BecomeHrResponse>>(BASE_URL + "/new", {
        companyName,
        description
    });
    return response.data;
}

const getChatMessages = async (chatId: number): Promise<ApiResponse<BecomeHrMessageResponse[]>> => {
    const response = await $api.get("/api/v1/hr/chats/" + chatId + "/messages");
    return response.data;
}

export {getBecomeHr, newBecomeHr, getChatMessages};