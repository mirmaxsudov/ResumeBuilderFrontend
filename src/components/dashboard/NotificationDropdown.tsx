'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { cn } from '@/utils/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'

const mockNotifications = [
    {
        id: 1,
        title: 'New Patient Registration',
        message: 'John Smith has been registered as a new patient',
        time: '5 minutes ago',
        read: false,
        type: 'patient',
    },
    {
        id: 2,
        title: 'Appointment Reminder',
        message: 'Upcoming appointment with Sarah Johnson in 2 hours',
        time: '1 hour ago',
        read: false,
        type: 'appointment',
    },
    {
        id: 3,
        title: 'Recovery Progress Update',
        message: 'Michael Brown has completed 75% of their recovery plan',
        time: '2 hours ago',
        read: true,
        type: 'progress',
    },
    {
        id: 4,
        title: 'System Update',
        message: 'New features have been added to the dashboard',
        time: '1 day ago',
        read: true,
        type: 'system',
    },
]

export function NotificationDropdown() {
    const router = useRouter()
    const [notifications, setNotifications] = useState(mockNotifications)
    const [isOpen, setIsOpen] = useState(false)
    const unreadCount = notifications.filter((n) => !n.read).length

    const handleNotificationClick = (notificationId: number) => {
        setNotifications(
            notifications.map((notification) =>
                notification.id === notificationId ? { ...notification, read: true } : notification
            )
        )
    }

    const handleViewAll = () => {
        setIsOpen(false)
        router.push('/dashboard/notifications')
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -right-1 bg-red-500 text-white -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-80 rounded-lg border bg-white p-0 shadow-lg transition-all duration-200 ease-in-out"
            >
                <DropdownMenuLabel className="flex items-center justify-between px-4 py-3">
                    <span className="font-semibold">Notifications</span>
                    {unreadCount > 0 && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {unreadCount} unread
                        </span>
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50 bg-stone-200 h-[1.5px]" />
                <div className="max-h-[300px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <>
                                <DropdownMenuItem
                                    key={index}
                                    className={cn(
                                        'flex flex-col items-start gap-1.5 p-4 transition-colors duration-150 hover:bg-muted/80',
                                        !notification.read && 'bg-muted/50'
                                    )}
                                    onClick={() => handleNotificationClick(notification.id)}
                                >
                                    <div className="flex w-full items-start justify-between">
                                        <span className="font-medium text-foreground">{notification.title}</span>
                                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                                    </div>
                                    <p className="text-sm leading-relaxed text-muted-foreground">{notification.message}</p>
                                </DropdownMenuItem>
                                {index < notifications.length - 1 && (
                                    <DropdownMenuSeparator className="bg-border/50 bg-stone-200" />
                                )}
                            </>
                        ))
                    ) : (
                        <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                            No notifications
                        </div>
                    )}
                </div>
                <DropdownMenuSeparator className="bg-border/50 bg-stone-300" />
                <DropdownMenuItem
                    className="cursor-pointer justify-center py-3 text-center text-sm font-medium text-primary hover:bg-primary/10 hover:text-primary"
                    onClick={handleViewAll}
                >
                    View all notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}