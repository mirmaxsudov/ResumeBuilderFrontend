import useMyNotice from "@/hooks/useMyNotice";
import {Button} from "../ui/button";
import {NoticeEnum} from "@/enums/NoticeEnum";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card";
import {Crown, ArrowUpRight} from "lucide-react";
import {Checkbox} from "../ui/checkbox";

const Plan = () => {
    const {showMessage} = useMyNotice();
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Subscription Plan</h2>
                <p className="text-muted-foreground">
                    Manage your subscription and unlock premium features
                </p>
            </div>
            
            <Card className="shadow-sm border-0 bg-gradient-to-br from-white to-gray-50/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                <CardHeader className="relative">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                            <Crown className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-semibold">Free Account</CardTitle>
                            <CardDescription className="text-base">
                                Current plan
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <Checkbox checked={true} disabled className="mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Save your data and search for jobs</p>
                                <p className="text-xs text-gray-500 mt-1">Basic features included</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Checkbox checked={true} disabled className="mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Access to resume builder</p>
                                <p className="text-xs text-gray-500 mt-1">Create professional resumes</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Checkbox checked={false} disabled className="mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-400">PDF downloads</p>
                                <p className="text-xs text-gray-400 mt-1">Available in premium plan</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                        <Button 
                            variant="default"
                            size="lg"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                            onClick={() => showMessage("ASAP, may will be open for all users.", NoticeEnum.INFO)}
                        >
                            <span>Upgrade to Premium</span>
                            <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button>
                        <p className="text-xs text-gray-500 text-center mt-3">
                            Unlock all features and download your resumes as PDF
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Plan;