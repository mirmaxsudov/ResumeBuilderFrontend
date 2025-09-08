'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SwitchRoleCardProps } from './SwitchRoleCard'
import { changeRole } from '@/api/requests/auth/auth.api'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { setValues } from '@/store/auth/authSlice'
import useMyNotice from '@/hooks/useMyNotice'
import { NoticeEnum } from '@/enums/NoticeEnum'
import { Button } from "@/components/dashboard/ui/button";
import { Input } from "@/components/dashboard/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/dashboard/ui/dialog";
import { Card, CardContent } from "@/components/dashboard/ui/card";
import { Badge } from "@/components/dashboard/ui/badge";
import { Label } from "@/components/dashboard/ui/label";
import { Alert, AlertDescription } from "@/components/dashboard/ui/alert";
import { ArrowRight, Shield, Eye, EyeOff, Loader2, AlertTriangle, Crown, Building2, Briefcase } from "lucide-react";
import { cn } from "@/utils/utils";

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
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();
    const router = useRouter()
    const { showMessage } = useMyNotice();

    const handleSwitchRole = async () => {
        if (!password) {
            setError('Please enter your password')
            return
        }

        setError('')
        setLoading(true)

        try {
            const data = await changeRole(item.role, password, user.email)
            dispatch(setValues({ token: data.data.accessToken, user: data.data }))
            showMessage('Role switched successfully', NoticeEnum.SUCCESS)
            setIsOpen(false)
            router.push('/dashboard')
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || 'Failed to switch role. Please try again.'
            setError(errorMessage)
            showMessage(errorMessage, NoticeEnum.ERROR);
        } finally {
            setLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !loading)
            handleSwitchRole()
    }

    const getRoleIcon = (roleName: string) => {
        switch (roleName.toLowerCase()) {
            case 'admin':
                return <Crown className="h-6 w-6 text-yellow-600" />;
            case 'hr':
                return <Building2 className="h-6 w-6 text-blue-600" />;
            case 'user':
                return <Briefcase className="h-6 w-6 text-green-600" />;
            default:
                return <Shield className="h-6 w-6 text-gray-600" />;
        }
    };

    const getRoleTheme = (roleName: string) => {
        switch (roleName.toLowerCase()) {
            case 'admin':
                return {
                    iconBg: 'bg-yellow-100',
                    iconColor: 'text-yellow-600',
                    button: 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white',
                    border: 'border-yellow-200',
                    bg: 'bg-yellow-50'
                };
            case 'hr':
                return {
                    iconBg: 'bg-blue-100',
                    iconColor: 'text-blue-600',
                    button: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white',
                    border: 'border-blue-200',
                    bg: 'bg-blue-50'
                };
            case 'user':
                return {
                    iconBg: 'bg-green-100',
                    iconColor: 'text-green-600',
                    button: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white',
                    border: 'border-green-200',
                    bg: 'bg-green-50'
                };
            default:
                return {
                    iconBg: 'bg-gray-100',
                    iconColor: 'text-gray-600',
                    button: 'bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white',
                    border: 'border-gray-200',
                    bg: 'bg-gray-50'
                };
        }
    };

    const currentTheme = getRoleTheme(currentRole);
    const newRoleTheme = getRoleTheme(item.role);

    return (
        <Dialog open={true} onOpenChange={() => !loading && setIsOpen(false)}>
            <DialogContent className="sm:max-w-md bg-[#fff]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                        Switch Role
                    </DialogTitle>
                    <DialogDescription>
                        Enter your password to switch from {currentRole} to {item.role} role
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Role Transition Display */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className={cn('p-2 rounded-lg', currentTheme.iconBg)}>
                                {getRoleIcon(currentRole)}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 capitalize">{currentRole}</p>
                                <p className="text-xs text-gray-500">Current Role</p>
                            </div>
                        </div>

                        <ArrowRight className="h-5 w-5 text-gray-400" />

                        <div className="flex items-center gap-3">
                            <div className={cn('p-2 rounded-lg', newRoleTheme.iconBg)}>
                                {getRoleIcon(item.role)}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 capitalize">{item.role}</p>
                                <p className="text-xs text-gray-500">New Role</p>
                            </div>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            This action requires your password for security verification.
                            You'll be redirected to the dashboard after successful role switch.
                        </AlertDescription>
                    </Alert>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className={cn(
                                    "pr-10",
                                    error && "border-red-500 focus:ring-red-500"
                                )}
                                disabled={loading}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={loading}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-500" />
                                ) : (
                                    <Eye className="h-4 w-4 text-gray-500" />
                                )}
                            </Button>
                        </div>
                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            disabled={loading}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSwitchRole}
                            disabled={loading || !password}
                            className={cn("flex-1", newRoleTheme.button)}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Switching...
                                </>
                            ) : (
                                <>
                                    <ArrowRight className="mr-2 h-4 w-4" />
                                    Switch Role
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SwitchRoleModal
