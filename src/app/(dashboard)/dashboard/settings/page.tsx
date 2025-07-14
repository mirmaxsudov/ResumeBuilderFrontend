"use client"

import {Separator} from "@/components/dashboard/ui/separator";
import {Tabs, TabsList} from "@/components/dashboard/ui/tabs";
import {TabsContent, TabsTrigger} from "@radix-ui/react-tabs";
import {Button} from "@/components/dashboard/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/dashboard/ui/table";
import {Trash} from "lucide-react";
import {useState} from "react";
import useMyNotice from "@/hooks/useMyNotice";
import ChangePasswordModalForRegisteredUser from "@/components/settings/ChangePasswordModalForRegisteredUser";

const SettingsPage = () => {
    const [isOpenPasswordModal, setOpenPasswordModal] = useState<boolean>(false);
    const {contextHolder} = useMyNotice();

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <header className="space-y-1">
                <h1 className="text-3xl font-extrabold text-gray-900">Settings</h1>
                <p className="text-gray-600">Manage your account and application preferences</p>
            </header>

            {/* Tabs */}
            <Tabs defaultValue="notifications" className="space-y-4">
                <TabsList className="flex space-x-2 bg-gray-100 rounded-lg p-1">
                    <TabsTrigger
                        value="notifications"
                        className="px-4 py-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:font-medium rounded-md"
                    >
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger
                        value="appearance"
                        className="px-4 py-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:font-medium rounded-md"
                    >
                        Appearance
                    </TabsTrigger>
                    <TabsTrigger
                        value="security"
                        className="px-4 py-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:font-medium rounded-md"
                    >
                        Security
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="notifications" className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">Notification Settings</h3>
                    <p className="text-gray-600 mb-4">
                        Enable or disable email and push notifications for important account activity.
                    </p>
                </TabsContent>

                <TabsContent value="appearance" className="bg-white p-6 rounded-lg shadow">
                    <h1 className={"font-bold text-2xl text-center text-[60px] tracking-wider"}>
                        Soon
                    </h1>
                    {/*<h3 className="text-xl font-semibold mb-2">Appearance</h3>*/}
                    {/*<p className="text-gray-600">Switch between light and dark themes.</p>*/}
                </TabsContent>

                <TabsContent value="security" className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">Security Settings</h3>
                    <p className="text-gray-600 mb-4">
                        Update your password to protect your account from unauthorized access.
                    </p>
                    <Separator className="my-4 bg-gray-200"/>
                    <Button
                        onClick={() => setOpenPasswordModal(!isOpenPasswordModal)}
                        variant="outline"
                        className="mb-6 hover:bg-gray-100 transition-all duration-300"
                    >
                        Change Password
                    </Button>
                    <ChangePasswordModalForRegisteredUser
                        setOpenModal={setOpenPasswordModal}
                        isOpen={isOpenPasswordModal}/>
                    <Separator className="my-4 bg-gray-200"/>
                    <div className="overflow-x-auto">
                        <Table className="min-w-full bg-white">
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableCell
                                        className="px-6 py-3 text-left font-medium text-gray-700">Device</TableCell>
                                    <TableCell className="px-6 py-3 text-left font-medium text-gray-700">Last
                                        Active</TableCell>
                                    <TableCell
                                        className="px-6 py-3 text-left font-medium text-gray-700">Action</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="hover:bg-gray-100">
                                    <TableCell className="px-6 py-4 text-sm text-gray-800">
                                        Windows 10 – Microsoft Edge 100 (editing, desktop)
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm text-gray-600">Today, 10:45 AM</TableCell>
                                    <TableCell className="px-6 py-4">
                                        <Button variant="ghost" className="text-red-500 hover:bg-red-50">
                                            <Trash className="w-4 h-4"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                {/* Repeat TableRow for more entries */}
                            </TableBody>
                        </Table>
                    </div>
                    <ChangePasswordModalForRegisteredUser
                        setOpenModal={setOpenPasswordModal}
                        isOpen={isOpenPasswordModal}/>
                </TabsContent>
            </Tabs>
            {contextHolder}
        </div>
    );
};

export default SettingsPage;