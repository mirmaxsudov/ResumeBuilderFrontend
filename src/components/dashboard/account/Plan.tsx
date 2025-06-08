import useMyNotice from "@/hooks/useMyNotice";
import { Button } from "../ui/button";
import { NoticeEnum } from "@/enums/NoticeEnum";

const Plan = () => {
    const { contextHolder, showMessage } = useMyNotice();
    return (
        <>
            <div className="bg-[#fff] p-[20px] rounded-[10px] flex justify-between items-center gap-[100px] shadow-md mt-[20px]">
                <div>
                    <h5 className="text-1xl font-medium">
                        Free Account
                    </h5>
                    <p className="text-gray-500 text-sm mt-[10px]">
                        You are on the free plan. You can save your data and search for jobs. Upgrade for PDF downloads & premium features.
                    </p>
                </div>
                <div>
                    <Button variant="outline" className="bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300" onClick={() => showMessage("ASAP, may will be free for all users.", NoticeEnum.INFO)}>
                        Upgrade
                    </Button>
                </div>
                {contextHolder}
            </div>
        </>
    )
}

export default Plan;