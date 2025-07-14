'use client'

import React, {useState} from 'react'
import {useRouter} from 'next/navigation'
import {SwitchRoleCardProps} from './SwitchRoleCard'
import {changeRole} from '@/api/requests/auth/auth.api'
import {useAppDispatch, useAppSelector} from '@/hooks/hooks'
import {setValues} from '@/store/auth/authSlice'
import useMyNotice from '@/hooks/useMyNotice'
import {NoticeEnum} from '@/enums/NoticeEnum'
import {Button} from "@/components/dashboard/ui/button";
import {Input} from "@/components/dashboard/ui/input";
import {Modal} from "antd";

const SwitchRoleModal = ({
                             setIsOpen,
                             item,
                             currentRole
                         }: {
    setIsOpen: (value: boolean) => void
    item: SwitchRoleCardProps
    currentRole: string
}) => {
    const [password, setPassword] = useState('')
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();
    const router = useRouter()
    const {showMessage, contextHolder} = useMyNotice();

    const handleSwitchRole = async () => {
        if (!password) {
            showMessage('Please enter your password')
            return
        }

        try {
            const data = await changeRole(item.role, password, user.email)
            dispatch(setValues({token: data.data.accessToken, user: data.data}))
            showMessage('Role switched successfully', NoticeEnum.SUCCESS)
            router.push('/dashboard')
        } catch (error) {
            showMessage(error?.response.data.message, NoticeEnum.ERROR);
        } finally {
        }
    }

    return (
        <Modal
            title="Switch Role"
            open={true}
            onCancel={() => setIsOpen(false)}
            footer={null}
            width={500}
        >
            <div className="flex items-center justify-between mb-6">
                <div className="text-center flex-1">
                    <div className="text-sm text-gray-500 mb-2">Current Role</div>
                    <div className="border border-gray-300 px-4 py-2 rounded-lg">
                        {currentRole}
                    </div>
                </div>
                <div className="mx-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                        />
                    </svg>
                </div>
                <div className="text-center flex-1">
                    <div className="text-sm text-gray-500 mb-2">New Role</div>
                    <div className="border border-gray-300 px-4 py-2 rounded-lg">
                        {item.role}
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <Input
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                />
            </div>

            <Button
                variant={"outline"}
                onClick={handleSwitchRole}
                className={"bg-[#2563EB] text-[#fff]"}
            >
                Switch Role
            </Button>
            {contextHolder}
        </Modal>
    )
}

export default SwitchRoleModal
