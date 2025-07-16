import {LoadingOutlined} from "@ant-design/icons";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {Label} from "../ui/label";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {useEffect, useState} from "react";
import useMyNotice from "@/hooks/useMyNotice";
import {NoticeEnum} from "@/enums/NoticeEnum";
import {update} from "@/api/requests/account/account.api";
import {AccountRequest} from "@/types/account/AccountType";
import {setValues} from "@/store/auth/authSlice";

const ManageAccount = () => {
    const {user, token} = useAppSelector(state => state.auth);
    const [loading, setLoading] = useState<boolean>(false);
    const [buttonDisable, setButtonDisable] = useState<boolean>(false);
    const [reqClone, setReqClone] = useState<AccountRequest>({
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastname
    });
    const {contextHolder, showMessage} = useMyNotice();
    const [req, setReq] = useState<AccountRequest>({
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastname
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        setButtonDisable(reqClone.firstname === req.firstname && reqClone.lastname === req.lastname);
    }, [req.firstname, req.lastname, reqClone.firstname, reqClone.lastname]);

    const handleSave = async () => {
        setLoading(true);

        try {
            const response = await update(req);
            const data = response.data;

            dispatch(setValues({
                token,
                user: {
                    ...user,
                    firstName: data.firstname,
                    lastname: data.lastname
                }
            }))
            setReqClone({
                ...req
            })
            showMessage(response.message, NoticeEnum.SUCCESS);
        } catch (e) {
            showMessage("Something went wrong", NoticeEnum.ERROR);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1 className="text-1xl font-normal text-gray-500 mt-[20px]">
                Account
            </h1>
            <div
                className="bg-[#fff] p-[20px] rounded-[10px] flex justify-between flex-col items-center gap-[2 0px] shadow-md mt-[10px]">
                <div className="grid grid-cols-2 gap-[20px] w-full">
                    <Label className="text-gray-500 text-sm font-normal w-full">
                        First Name
                        <Input onChange={e => setReq({...req, firstname: e.target.value})} type="text"
                               className="mt-[5px] w-full text-[#000]" defaultValue={user.firstName}
                               placeholder="Enter your first name"/>
                    </Label>
                    <Label className="text-gray-500 text-sm font-normal w-full">
                        Last Name
                        <Input onChange={e => setReq({...req, lastname: e.target.value})} type="text"
                               className="mt-[5px] w-full text-[#000]" defaultValue={user.lastname}
                               placeholder="Enter your last name"/>
                    </Label>
                </div>
                <div className="w-full grid grid-cols-2 gap-[20px] items-center my-[20px]">
                    <Label className="text-gray-500 text-sm font-normal w-full">
                        Email
                        <Input disabled onChange={e => setReq({...req, email: e.target.value})} type="email"
                               className="mt-[5px] w-full text-[#000]" defaultValue={user.email}
                               placeholder="Enter your email"/>
                    </Label>
                    <div>
                        <p className="text-gray-500 text-[12px] font-normal w-full mt-[20px]">
                            Use this email to log in to our Resume Builder account and receive notifications.
                        </p>
                    </div>
                </div>
                <div className="flex justify-end w-full">
                    <Button
                        disabled={buttonDisable}
                        variant={"outline"}
                        className="bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
                        onClick={() => handleSave()}
                    >
                        Save {loading && <>
                        <LoadingOutlined className="transition-all duration-300"/>
                    </>}
                    </Button>
                </div>
                {contextHolder}
            </div>
        </>
    )
}

export default ManageAccount;