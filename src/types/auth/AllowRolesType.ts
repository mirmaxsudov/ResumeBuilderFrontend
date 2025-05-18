import Role from "@/enums/Role";

type AllowRolesType = {
    withAuth: boolean;
    allowedRoles: Role[];
}

export default AllowRolesType;