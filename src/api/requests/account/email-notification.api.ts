import $api from "@/api/request";
import ApiResponse from "@/types/ApiResponse";
import {EmailNotificationRequest, EmailNotificationResponse} from "@/types/account/EmailNotificationType";

const BASE_URL: string = "/api/v1/email-notifications";

const get = async (): Promise<ApiResponse<EmailNotificationResponse>> => {
    const response = await $api.get<ApiResponse<EmailNotificationResponse>>(BASE_URL);
    return response.data;
}

const update = async (req: EmailNotificationRequest): Promise<ApiResponse<string>> => {
    const response = await $api.put(BASE_URL, req);
    return response.data;
}

export {get, update};