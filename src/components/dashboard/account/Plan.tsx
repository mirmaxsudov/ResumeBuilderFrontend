import { Button, notification } from "antd";

const Plan = () => {
    const [api] = notification.useNotification();

    const openNotification = () => {
        api.open({
            message: 'Notification Title',
            description:
                'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
            duration: 0,
        });
    };

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
                    <Button type="primary" onClick={openNotification}>
                        Upgrade
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Plan;