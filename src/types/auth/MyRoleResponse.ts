import Role from "@/enums/Role"

export type MyRoleResponse = {
    role: string,
    origin: Role,
    lastLoginAt: Date,
    current: boolean
}