import $api from "@/api/request";
import { ContactSubjectEnum } from "@/enums/ContactSubjectEnum";
import ApiResponse, { PageApiRespone } from "@/types/ApiResponse";
import { ContactMessageResponse, ContactRequestType, ContactResponseType } from "@/types/support/contactType";

const CONTACT_BASE_URL: string = "/api/v1/support/contact";

const SupportContactApis = {
    newContact: async (request: ContactRequestType): Promise<ApiResponse<string>> => {
        const response = await $api.post<ApiResponse<string>>(CONTACT_BASE_URL + "/new", request);
        return response.data;
    },
    answerContact: async (id: number, answer: string): Promise<ApiResponse<string>> => {
        const response = await $api.post(CONTACT_BASE_URL + "/" + id + "/answer", undefined, {
            params: {
                answer
            }
        });
        return response.data;
    },
    getAll: async (page: number = 0, size: number = 10, query: string = "", search: string | ContactSubjectEnum = "ALL",): Promise<PageApiRespone<ContactResponseType[]>> => {
        const response = await $api.get<PageApiRespone<ContactResponseType[]>>(CONTACT_BASE_URL + "/get", {
            params: {
                page, size, query, search
            }
        });
        return response.data;
    },
    getMessagesByContactId: async (page: number = 0, size: number = 10, id: number): Promise<PageApiRespone<ContactMessageResponse[]>> => {
        const response = await $api.get<PageApiRespone<ContactMessageResponse[]>>(`${CONTACT_BASE_URL}/${id}/messages`, {
            params: {
                page, size
            }
        });
        return response.data;
    }
}

export default SupportContactApis;