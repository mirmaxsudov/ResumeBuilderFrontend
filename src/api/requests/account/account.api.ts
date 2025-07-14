import $api from "@/api/request";
import {AccountRequest, AccountResponse} from "@/types/account/AccountType";
import ApiResponse from "@/types/ApiResponse";

const BASE_ACCOUNT_URL: string = "/api/v1/account";

const update = async (accountReq: AccountRequest): Promise<ApiResponse<AccountResponse>> => {
    const response = await $api.put<ApiResponse<AccountResponse>>(BASE_ACCOUNT_URL, accountReq);
    return response.data;
}

export {update};