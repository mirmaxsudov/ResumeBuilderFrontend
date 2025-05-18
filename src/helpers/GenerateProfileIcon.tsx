import clsx from "clsx";

const GenerateProfileIcon = ({ firstName, lastName, size = 50, isRound = false }: { firstName: string, lastName: string, size?: number, isRound?: boolean }) => {
    let initials = "";

    if (firstName)
        initials = `${firstName.charAt(0)}`;
    else if (lastName)
        initials = `${lastName.charAt(0)}`;
    else
        initials = "UR";

    return (
        <div className={
            clsx(
                "size-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-sm",
                isRound && "rounded-full"
            )
        }>
            <span className={`text-white text-[${size}px] font-medium`}>{initials}</span>
        </div>
    )
}

export default GenerateProfileIcon;