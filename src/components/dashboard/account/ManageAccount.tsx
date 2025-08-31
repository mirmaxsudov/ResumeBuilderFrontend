import { LoadingOutlined } from "@ant-design/icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect, useState } from "react";
import useMyNotice from "@/hooks/useMyNotice";
import { NoticeEnum } from "@/enums/NoticeEnum";
import { update } from "@/api/requests/account/account.api";
import { AccountRequest } from "@/types/account/AccountType";
import { setValues } from "@/store/auth/authSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { User, Mail, Save, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

const ManageAccount = () => {
    const { user, token } = useAppSelector(state => state.auth);
    const [loading, setLoading] = useState<boolean>(false);
    const [buttonDisable, setButtonDisable] = useState<boolean>(false);
    const [reqClone, setReqClone] = useState<AccountRequest>({
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastname
    });
    const { showMessage } = useMyNotice();
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
        <div className="space-y-6 max-w-full">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Account Settings</h2>
                <p className="text-muted-foreground">
                    Manage your personal information and account details
                </p>
            </div>
            
            <Card className="shadow-sm border-0 bg-gradient-to-br from-white to-gray-50/50">
                <CardHeader>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-medium">Personal Information</CardTitle>
                            <CardDescription>
                                Update your name and contact details
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="firstname" className="text-sm font-medium text-gray-700">
                                First Name
                            </Label>
                            <Input 
                                id="firstname"
                                value={req.firstname}
                                onChange={e => setReq({...req, firstname: e.target.value})} 
                                type="text"
                                className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastname" className="text-sm font-medium text-gray-700">
                                Last Name
                            </Label>
                            <Input 
                                id="lastname"
                                value={req.lastname}
                                onChange={e => setReq({...req, lastname: e.target.value})} 
                                type="text"
                                className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Enter your last name"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email Address
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input 
                                    id="email"
                                    disabled 
                                    value={req.email}
                                    onChange={e => setReq({...req, email: e.target.value})} 
                                    type="email"
                                    className="h-11 pl-10 border-gray-200 bg-gray-50 text-gray-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                        
                        <Alert className="border-blue-200 bg-blue-50">
                            <AlertCircle className="h-4 w-4 text-blue-600" />
                            <AlertDescription className="text-blue-800">
                                Use this email to log in to your Resume Builder account and receive notifications.
                            </AlertDescription>
                        </Alert>
                    </div>
                    
                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <Button
                            disabled={buttonDisable || loading}
                            variant="default"
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                            onClick={handleSave}
                        >
                            {loading ? (
                                <>
                                    <LoadingOutlined className="mr-2" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ManageAccount;