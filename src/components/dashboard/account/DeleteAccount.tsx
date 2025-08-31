import { Button } from "../ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card";
import {AlertTriangle, Trash2} from "lucide-react";
import {Alert, AlertDescription} from "../ui/alert";

const DeleteAccount = () => {
    return (
        <div className="space-y-6 max-w-full">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Danger Zone</h2>
                <p className="text-muted-foreground">
                    Irreversible and destructive actions
                </p>
            </div>
            
            <Card className="shadow-sm border-0 bg-gradient-to-br from-white to-red-50/30 border-l-4 border-l-red-500">
                <CardHeader>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                            <Trash2 className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-medium text-red-900">Delete Account</CardTitle>
                            <CardDescription className="text-red-700">
                                Permanently remove your account and all associated data
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert className="border-red-200 bg-red-50">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">
                            <strong>Warning:</strong> This action cannot be undone. Once you delete your account, 
                            all your data including resumes, cover letters, and profile information will be 
                            permanently removed from our servers.
                        </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-900">What will be deleted:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="break-words">All your resumes and cover letters</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="break-words">Profile information and settings</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="break-words">Account preferences and notification settings</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="break-words">All associated data and analytics</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="flex justify-end pt-4 border-t border-red-100">
                        <Button 
                            type="button" 
                            variant="destructive"
                            size="lg"
                            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Account
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default DeleteAccount;
