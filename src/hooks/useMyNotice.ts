import { NoticeEnum } from "@/enums/NoticeEnum";
import { message } from "antd";

const useMyNotice = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const showMessage = (message: string, type: NoticeEnum = NoticeEnum.ERROR) => {
        switch (type) {
            case NoticeEnum.INFO:
                messageApi.info(message);
                break;
            case NoticeEnum.SUCCESS:
                messageApi.success(message);
                break;
            case NoticeEnum.ERROR:
                messageApi.error(message);
                break;
            case NoticeEnum.WARNING:
                messageApi.warning(message);
                break;
            case NoticeEnum.LOADING:
                messageApi.loading(message);
                break;
            default:
                messageApi.error(message);
                break;
        }
    };

    return { showMessage, contextHolder };
};

export default useMyNotice;
