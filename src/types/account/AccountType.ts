export interface AccountRequest {
    email: string;
    firstname: string;
    lastname: string;
}

export interface AccountResponse extends AccountRequest {
    userId: number;
}