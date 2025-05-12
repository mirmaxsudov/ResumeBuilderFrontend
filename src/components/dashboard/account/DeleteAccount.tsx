import { Button } from "../ui/button";

const DeleteAccount = () => {
    return (
        <>
            <h1 className="text-1xl font-normal text-gray-500 mt-[20px]">
                Delete Account
            </h1>
            <div className="bg-[#fff] p-[20px] rounded-[10px] flex justify-between items-center gap-[100px] shadow-md mt-[20px]">
                <p className="text-gray-500 text-sm font-normal">
                    Once you delete your account, it cannot be undone. This is permanent.
                </p>
                <Button type="button" variant="ghost" className="text-red-500 text-[16px] font-medium">
                    Delete Account
                </Button>
            </div>
        </>
    )
}

export default DeleteAccount;
