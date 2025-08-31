import {Switch} from "../ui/switch";
import {Button} from "../ui/button";
import {useEffect, useState} from "react";
import {get, update} from "@/api/requests/account/email-notification.api";
import useMyNotice from "@/hooks/useMyNotice";
import {NoticeEnum} from "@/enums/NoticeEnum";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card";
import {Separator} from "../ui/separator";
import {Bell, TrendingUp, Mail, Briefcase} from "lucide-react";

const EmailNotifications = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Updates and Offers",
            description: "Discounts, special offers, new features and more",
            enabled: false,
            icon: Bell
        }, {
            id: 2,
            title: "Resume Analytics",
            description: "Get insights into your resume's performance",
            enabled: false,
            icon: TrendingUp
        }, {
            id: 3,
            title: "Resume and Job Tips Newsletter",
            description: "Receive weekly tips and insights to improve your resume and job search",
            enabled: false,
            icon: Mail
        }
    ]);
    const {showMessage} = useMyNotice();

    useEffect(() => {
        if (loading)
            fetchData();
    }, [loading]);

    const fetchData = async () => {
        try {
            const response = await get();
            const data = response.data;

            setNotifications([
                {...notifications[0], enabled: data.updateAndOffers},
                {...notifications[1], enabled: data.resumeAnalytics},
                {...notifications[2], enabled: data.resumeAndJobTipsNewsletter},
            ])
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    const handleToggle = async (id: number) => {
        const updatedNotifications = notifications.map(notification =>
            notification.id === id ? {...notification, enabled: !notification.enabled} : notification
        );

        try {
            const response = await update({
                updateAndOffers: notifications[0].enabled,
                resumeAnalytics: notifications[1].enabled,
                resumeAndJobTipsNewsletter: notifications[2].enabled,
                careerPlans: false
            })
            showMessage(response.message, NoticeEnum.SUCCESS);
            setNotifications(updatedNotifications);
        } catch (e) {
            showMessage("Something went wrong!");
        }
    };

    return (
        <div className="space-y-6 max-w-full">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Email Notifications</h2>
                <p className="text-muted-foreground">
                    Manage your email preferences and stay updated with the latest features and opportunities.
                </p>
            </div>
            
            <Card className="shadow-sm border-0 bg-gradient-to-br from-white to-gray-50/50">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-medium">Notification Preferences</CardTitle>
                    <CardDescription>
                        Choose which emails you'd like to receive from us
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-0">
                    {notifications.map((notification, index) => {
                        const IconComponent = notification.icon;
                        return (
                            <div key={notification.id}>
                                <div className="flex items-center justify-between py-4">
                                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                            <IconComponent className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-gray-900 truncate">
                                                {notification.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1 break-words">
                                                {notification.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 ml-4">
                                        <Switch 
                                            checked={notification.enabled} 
                                            onCheckedChange={() => handleToggle(notification.id)}
                                            className="data-[state=checked]:bg-blue-600 ring-offset-1 ring-blue-600 ring-1"
                                        />
                                    </div>
                                </div>
                                {index < notifications.length - 1 && (
                                    <Separator className="my-0" />
                                )}
                            </div>
                        );
                    })}
                </CardContent>
            </Card>

            <Card className="shadow-sm border-0 bg-gradient-to-br from-white to-gray-50/50">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-gray-900 truncate">
                                    Job Alerts
                                </h3>
                                <p className="text-sm text-gray-500 mt-1 break-words">
                                    Get notified when new jobs match your criteria
                                </p>
                            </div>
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-shrink-0 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                        >
                            Manage
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default EmailNotifications;