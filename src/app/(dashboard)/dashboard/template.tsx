import AuthChecker from "@/components/auth/AuthChecker";
import Role from "@/enums/Role";

const Template = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthChecker roles={[Role.ADMIN, Role.USER]} withAuth={true}>
            {children}
        </AuthChecker>
    )
}

export default Template;