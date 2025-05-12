import { Switch } from "@mui/material";
import { Button } from "../ui/button";
import { useState } from "react";

const EmailNotifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Updates and Offers",
            description: "Discounts, special offers, new features and more",
            enabled: false
        }, {
            id: 2,
            title: "Resume Analytics",
            description: "Get insights into your resume's performance",
            enabled: false
        }, {
            id: 3,
            title: "Resume and Job Tips Newsletter",
            description: "Receive weekly tips and insights to improve your resume and job search",
            enabled: false
        }
    ]);

    const handleToggle = (id: number) => {
        const updatedNotifications = notifications.map(notification =>
            notification.id === id ? { ...notification, enabled: !notification.enabled } : notification
        );
        setNotifications(updatedNotifications);
    };

    return (
        <>
            <h1 className="text-1xl font-normal text-gray-500 mt-[20px]">
                Email Notifications
            </h1>
            <div className="bg-[#fff] p-[20px] rounded-[10px] flex flex-col gap-[20px] shadow-md mt-[20px]">
                {notifications.map((notification, index) => (
                    <>
                        <div className="flex justify-between items-center">
                            <div className="flex-1">
                                <h5 className="text-1xl font-medium">
                                    {notification.title}
                                </h5>
                                <p className="text-gray-500 text-sm font-normal">
                                    {notification.description}
                                </p>
                            </div>
                            <div>
                                <Switch checked={notification.enabled} onChange={() => handleToggle(notification.id)} />
                            </div>
                        </div>
                        {<div className="w-full h-[1px] bg-gray-200" />}
                    </>
                ))}
                <div className="flex justify-between items-center">
                    <div className="flex-1">
                        <h5 className="text-1xl font-medium">
                            Job alerts
                        </h5>
                        <p className="text-gray-500 text-sm font-normal">
                            Get notified when new jobs match your criteria
                        </p>
                    </div>
                    <div>
                        <Button variant="ghost" className="text-blue-500 text-sm font-medium">
                            Manage
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmailNotifications;