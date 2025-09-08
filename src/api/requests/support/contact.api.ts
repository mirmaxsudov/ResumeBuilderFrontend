import $api from "@/api/request";
import ApiResponse from "@/types/ApiResponse";
import { ContactRequestType } from "@/types/support/contactType";

const CONTACT_BASE_URL: string = "/api/v1/support/contact";

const newContact = async (request: ContactRequestType): Promise<ApiResponse<string>> => {
    const response = await $api.post<ApiResponse<string>>(CONTACT_BASE_URL + "/new", request);
    return response.data;
}

export { newContact };