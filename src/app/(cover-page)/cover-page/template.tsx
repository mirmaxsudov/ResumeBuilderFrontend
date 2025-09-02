import AuthChecker from "@/components/auth/AuthChecker";
import Role from "@/enums/Role";
import { Toaster } from "sonner";

const Template = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <AuthChecker roles={[Role.ADMIN, Role.USER]} withAuth={true}>
                {children}
            </AuthChecker>
            <Toaster richColors position={"top-center"} />
        </>
    )
}

export default Template;