import Role from "@/enums/Role";

type AuthUserPreviewType = {
    userId: number;
    firstName: string;
    lastname: string;
    email: string;
    accessToken: string;
    role: Role;
    roles: Role[];
}

export default AuthUserPreviewType;