import AuthChecker from "@/components/auth/AuthChecker";
import Role from "@/enums/Role";

const Template = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthChecker roles={[...Object.values(Role)]} withAuth={true}>
            {children}
        </AuthChecker>
    )
}

export default Template;