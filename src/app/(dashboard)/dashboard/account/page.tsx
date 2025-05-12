'use client'

import EmailNotifications from "@/components/dashboard/account/EmailNotifications";
import DeleteAccount from "@/components/dashboard/account/DeleteAccount";
import ManageAccount from "@/components/dashboard/account/ManageAccount";
import Plan from "@/components/dashboard/account/Plan";

const Account = () => {
    return (
        <>
            <section className="account_section">
                <div className="account_container w-[70%] mx-auto">
                    <h1 className="text-3xl font-bold">
                        Account Settings
                    </h1>
                    <p className="text-gray-500 mt-[20px]">
                        Your plan
                    </p>
                    <Plan />
                    <ManageAccount />
                    <EmailNotifications />
                    <DeleteAccount />
                </div>
            </section>
        </>
    )
}

export default Account;