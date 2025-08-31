import React, { useEffect } from 'react'
import { Dispatch, SetStateAction } from 'react'
import Role from '@/enums/Role'
import formatDate from '@/helpers/formatDate'
import { Card, CardContent } from '@/components/dashboard/ui/card'
import { Badge } from '@/components/dashboard/ui/badge'
import { Button } from '@/components/dashboard/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/dashboard/ui/tooltip'
import { Clock, User, CheckCircle, ArrowRight, Crown, Building2, Briefcase } from 'lucide-react'
import { cn } from '@/utils/utils'

export interface SwitchRoleCardProps {
    role: string
    lastTime: Date,
    setIsOpen: Dispatch<SetStateAction<boolean>>
    setModalItem: Dispatch<SetStateAction<any>>
    currentRole: Role
}

const SwitchRoleCard: React.FC<SwitchRoleCardProps> = (
    {
        role,
        lastTime,
        setIsOpen,
        setModalItem,
        currentRole
    }: any) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    const isCurrentRole = currentRole === role;
    const hasLastLogin = lastTime && lastTime !== 'Never';

    const getRoleIcon = (roleName: string) => {
        switch (roleName.toLowerCase()) {
            case 'admin':
                return <Crown className="h-5 w-5 text-yellow-600" />;
            case 'hr':
                return <Building2 className="h-5 w-5 text-blue-600" />;
            case 'user':
                return <Briefcase className="h-5 w-5 text-green-600" />;
            default:
                return <User className="h-5 w-5 text-gray-600" />;
        }
    };

    const getRoleTheme = (roleName: string) => {
        switch (roleName.toLowerCase()) {
            case 'admin':
                return {
                    card: 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 hover:from-yellow-100 hover:to-amber-100',
                    iconBg: 'bg-yellow-100',
                    iconColor: 'text-yellow-600',
                    badge: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                    button: 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white',
                    activeText: 'text-yellow-700',
                    currentButton: 'bg-yellow-100 text-yellow-700 border-yellow-300',
                    ring: 'ring-2 ring-yellow-500 ring-offset-2',
                    tooltip: 'bg-yellow-900 text-yellow-50 border-yellow-700'
                };
            case 'hr':
                return {
                    card: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100',
                    iconBg: 'bg-blue-100',
                    iconColor: 'text-blue-600',
                    badge: 'bg-blue-100 text-blue-800 border-blue-200',
                    button: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white',
                    activeText: 'text-blue-700',
                    currentButton: 'bg-blue-100 text-blue-700 border-blue-300',
                    ring: 'ring-2 ring-blue-500 ring-offset-2',
                    tooltip: 'bg-blue-900 text-blue-50 border-blue-700'
                };
            case 'user':
                return {
                    card: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:from-green-100 hover:to-emerald-100',
                    iconBg: 'bg-green-100',
                    iconColor: 'text-green-600',
                    badge: 'bg-green-100 text-green-800 border-green-200',
                    button: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white',
                    activeText: 'text-green-700',
                    currentButton: 'bg-green-100 text-green-700 border-green-300',
                    ring: 'ring-2 ring-green-500 ring-offset-2',
                    tooltip: 'bg-green-900 text-green-50 border-green-700'
                };
            default:
                return {
                    card: 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200 hover:from-gray-100 hover:to-slate-100',
                    iconBg: 'bg-gray-100',
                    iconColor: 'text-gray-600',
                    badge: 'bg-gray-100 text-gray-800 border-gray-200',
                    button: 'bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white',
                    activeText: 'text-gray-700',
                    currentButton: 'bg-gray-100 text-gray-700 border-gray-300',
                    ring: 'ring-2 ring-gray-500 ring-offset-2',
                    tooltip: 'bg-gray-900 text-gray-50 border-gray-700'
                };
        }
    };

    const theme = getRoleTheme(role);

    return (
        <Card className={cn(
            'transition-all duration-300 hover:shadow-lg cursor-pointer border-2',
            theme.card,
            isCurrentRole && theme.ring
        )}>
            <CardContent className='p-6'>
                <div className='text-center space-y-4'>
                    {/* Role Icon and Name */}
                    <div className='flex flex-col items-center space-y-2'>
                        <div className={cn('p-3 rounded-full shadow-sm', theme.iconBg)}>
                            {getRoleIcon(role)}
                        </div>
                        <div className='space-y-1'>
                            <h3 className='text-lg font-semibold text-gray-900 capitalize'>
                                {role}
                            </h3>
                            {isCurrentRole && (
                                <Badge variant="outline" className={cn('text-xs border', theme.badge)}>
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Current Role
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Last Login Info */}
                    <div className='space-y-2'>
                        <div className='flex items-center justify-center gap-2 text-sm text-gray-600'>
                            <Clock className='h-4 w-4' />
                            <span className='font-medium'>Last Login:</span>
                        </div>
                        <div className='text-sm text-gray-500'>
                            {isCurrentRole ? (
                                <span className={cn('font-medium', theme.activeText)}>Active Now</span>
                            ) : hasLastLogin ? (
                                <span>{formatDate(lastTime)}</span>
                            ) : (
                                <span className='text-gray-400 italic'>Never</span>
                            )}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className='pt-2'>
                        {isCurrentRole ? (
                            <Button
                                disabled
                                variant="outline"
                                className={cn('w-full cursor-not-allowed', theme.currentButton)}
                            >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Current Role
                            </Button>
                        ) : (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={() => {
                                            setIsOpen(true)
                                            setModalItem({ role, lastTime })
                                        }}
                                        className={cn('w-full transition-all duration-300 hover:scale-105', theme.button)}
                                    >
                                        <ArrowRight className="h-4 w-4 mr-2" />
                                        Switch to {role}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent
                                    className={cn('border', theme.tooltip)}
                                    side="top"
                                >
                                    <p>Click to switch to {role} role</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SwitchRoleCard