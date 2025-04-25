import Link from "next/link";

export type GenerateBreadCrumbsProps = {
    values: {
        value: string;
        link: string;
    }[];
    current: string;
};

const GenerateBreadCrumbs = ({values, current}: GenerateBreadCrumbsProps) => {
    return (
        <div className="flex items-center gap-[10px]">
            {values.map((value, index) => (
                <>
                    <Link
                        key={index}
                        href={value.link}
                        className={`capitalize ${
                            value.value === current ? "text-[#3E323280]" : "text-[#3E3232]"
                        }`}
                    >
                        {value.value}
                    </Link>
                    {values.length - 1 !== index && (
                        <svg
                            width="7"
                            height="10"
                            viewBox="0 0 7 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1.5 10C1.28906 10 1.10156 9.92969 0.960938 9.78906C0.65625 9.50781 0.65625 9.01562 0.960938 8.73438L4.17188 5.5L0.960938 2.28906C0.65625 2.00781 0.65625 1.51562 0.960938 1.23438C1.24219 0.929688 1.73438 0.929688 2.01562 1.23438L5.76562 4.98438C6.07031 5.26562 6.07031 5.75781 5.76562 6.03906L2.01562 9.78906C1.875 9.92969 1.6875 10 1.5 10Z"
                                fill="#3E3232"
                                fill-opacity="0.5"
                            />
                        </svg>
                    )}
                </>
            ))}
        </div>
    );
};

export default GenerateBreadCrumbs;