'use client'
import React, { useEffect, useState, useRef } from 'react'
import SwitchRoleCard from '@/components/dashboard/swich-role/SwitchRoleCard'
import clsx from 'clsx'
import SwitchRoleModal from '@/components/dashboard/swich-role/SwitchRoleModal'
import NotFound from '@/components/dashboard/swich-role/NotFound'
import { useAppSelector } from '@/hooks/hooks';
import useMyNotice from '@/hooks/useMyNotice'
import { NoticeEnum } from '@/enums/NoticeEnum'
import { getMyRoles } from '@/api/requests/auth/auth.api'
import { MyRoleResponse } from '@/types/auth/MyRoleResponse'
import axios from 'axios'
import { Button } from '@/components/dashboard/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard/ui/card'
import { Badge } from '@/components/dashboard/ui/badge'
import { Skeleton } from '@/components/dashboard/ui/skeleton'
import { Search, Filter, SortAsc, SortDesc, RefreshCw, Users, Clock, Shield } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/dashboard/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/dashboard/ui/tooltip'
import { Input } from '@/components/dashboard/ui/input'

const Page = () => {
    const { user } = useAppSelector((state) => state.auth);
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [modalItem, setModalItem] = useState(null)
    const [filteredRoles, setFilteredRoles] = useState<MyRoleResponse[]>([])
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
    const [filterType, setFilterType] = useState<'all' | 'current' | 'other'>('all')
    const searchInputRef = useRef<HTMLInputElement>(null);
    const { showMessage } = useMyNotice();
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [roles, setRoles] = useState<MyRoleResponse[]>([]);

    useEffect(() => {
        let filtered = roles;

        if (searchTerm) {
            filtered = filtered.filter(role =>
                role.role.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterType === 'current')
            filtered = filtered.filter(role => role.role === user?.role);
        else if (filterType === 'other')
            filtered = filtered.filter(role => role.role !== user?.role);

        filtered.sort((a, b) => {
            const dateA = new Date(a.lastLoginAt || 0).getTime();
            const dateB = new Date(b.lastLoginAt || 0).getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

        setFilteredRoles(filtered);
    }, [searchTerm, filterType, sortOrder, roles, user?.role]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
                event.preventDefault()
                searchInputRef.current?.focus()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, []);

    useEffect(() => {
        if (loading)
            fetchMyRoles();
    }, [loading]);

    const fetchMyRoles = async () => {
        try {
            const response = await getMyRoles();
            setRoles(response.data);
            setFilteredRoles(response.data);
        } catch (error) {
            if (axios.isAxiosError(error))
                showMessage(error.response?.data.message, NoticeEnum.ERROR);
            else
                showMessage('An unexpected error occurred', NoticeEnum.ERROR);
        } finally {
            setLoading(false);
        }
    }

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchMyRoles();
        setRefreshing(false);
        showMessage('Roles refreshed successfully', NoticeEnum.SUCCESS);
    }

    const clearFilters = () => {
        setSearchTerm('');
        setFilterType('all');
        setSortOrder('desc');
    }

    const totalRoles = roles.length;
    const currentRoleCount = roles.filter(role => role.role === user?.role).length;
    const otherRoleCount = totalRoles - currentRoleCount;
    const recentlyUsedRoles = roles.filter(role => {
        if (!role.lastLoginAt) return false;
        const lastLogin = new Date(role.lastLoginAt);
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return lastLogin > oneWeekAgo;
    }).length;

    const LoadingSkeleton = () => (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {[...Array(8)].map((_, index) => (
                <Card key={index} className='p-6'>
                    <CardContent className='space-y-4'>
                        <Skeleton className='h-6 w-3/4 mx-auto' />
                        <Skeleton className='h-4 w-1/2 mx-auto' />
                        <Skeleton className='h-10 w-full' />
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    const StatisticsSection = () => (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
            <Card className='border-0 shadow-sm'>
                <CardContent className='p-4'>
                    <div className='flex items-center gap-3'>
                        <div className='p-2 bg-blue-100 rounded-lg'>
                            <Users className='h-5 w-5 text-blue-600' />
                        </div>
                        <div>
                            <p className='text-sm text-gray-600'>Total Roles</p>
                            <p className='text-2xl font-bold text-gray-900'>{totalRoles}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className='border-0 shadow-sm'>
                <CardContent className='p-4'>
                    <div className='flex items-center gap-3'>
                        <div className='p-2 bg-green-100 rounded-lg'>
                            <Shield className='h-5 w-5 text-green-600' />
                        </div>
                        <div>
                            <p className='text-sm text-gray-600'>Current Role</p>
                            <p className='text-2xl font-bold text-gray-900'>{currentRoleCount}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className='border-0 shadow-sm'>
                <CardContent className='p-4'>
                    <div className='flex items-center gap-3'>
                        <div className='p-2 bg-purple-100 rounded-lg'>
                            <Shield className='h-5 w-5 text-purple-600' />
                        </div>
                        <div>
                            <p className='text-sm text-gray-600'>Other Roles</p>
                            <p className='text-2xl font-bold text-gray-900'>{otherRoleCount}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className='border-0 shadow-sm'>
                <CardContent className='p-4'>
                    <div className='flex items-center gap-3'>
                        <div className='p-2 bg-orange-100 rounded-lg'>
                            <Clock className='h-5 w-5 text-orange-600' />
                        </div>
                        <div>
                            <p className='text-sm text-gray-600'>Recently Used</p>
                            <p className='text-2xl font-bold text-gray-900'>{recentlyUsedRoles}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    return (
        <TooltipProvider>
            <div className='space-y-6'>
                {/* Header Card */}
                <Card className='border-0 shadow-sm'>
                    <CardHeader className='pb-4'>
                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                            <div className='flex items-center gap-3'>
                                <div className='flex items-center gap-2'>
                                    <h1 className='text-2xl font-bold text-gray-900'>
                                        Switch Role
                                    </h1>
                                    <Badge variant="secondary" className='text-sm'>
                                        {filteredRoles.length} {filteredRoles.length === 1 ? 'role' : 'roles'}
                                    </Badge>
                                </div>
                                {user?.role && (
                                    <Badge variant="default" className='bg-blue-100 text-blue-800'>
                                        Current: {user.role}
                                    </Badge>
                                )}
                            </div>
                            <div className='flex items-center gap-2'>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleRefresh}
                                            disabled={refreshing}
                                            className='flex items-center gap-2'
                                        >
                                            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                                            Refresh
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Refresh roles list</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {!loading && <StatisticsSection />}

                <Card className='border-0 shadow-sm'>
                    <CardContent className='pt-6'>
                        <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between'>
                            <div className='flex flex-col sm:flex-row gap-4 flex-1 w-full'>
                                <div className='relative flex-1 max-w-md'>
                                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                                    <Input
                                        ref={searchInputRef}
                                        type='text'
                                        placeholder='Search roles... (Ctrl + K)'
                                        value={searchTerm}
                                        onChange={e => {
                                            if (!isOpen) {
                                                setSearchTerm(e.target.value)
                                            }
                                        }}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        className={`pl-10 transition-all duration-300 ${isFocused ? 'ring-2 ring-blue-500' : ''
                                            }`}
                                    />
                                </div>

                                <Select value={filterType} onValueChange={(value: 'all' | 'current' | 'other') => setFilterType(value)}>
                                    <SelectTrigger className='w-full sm:w-[180px]'>
                                        <Filter className='h-4 w-4 mr-2' />
                                        <SelectValue placeholder="Filter by type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Roles</SelectItem>
                                        <SelectItem value="current">Current Role</SelectItem>
                                        <SelectItem value="other">Other Roles</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* Sort Dropdown */}
                                <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
                                    <SelectTrigger className='w-full sm:w-[180px]'>
                                        {sortOrder === 'asc' ? <SortAsc className='h-4 w-4 mr-2' /> : <SortDesc className='h-4 w-4 mr-2' />}
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="desc">Newest First</SelectItem>
                                        <SelectItem value="asc">Oldest First</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Clear Filters Button */}
                            {(searchTerm || filterType !== 'all' || sortOrder !== 'desc') && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                    className='text-gray-500 hover:text-gray-700'
                                >
                                    Clear Filters
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Roles Grid Card */}
                <Card className='border-0 shadow-sm'>
                    <CardContent className='pt-6'>
                        {loading ? (
                            <LoadingSkeleton />
                        ) : filteredRoles.length > 0 ? (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                                {filteredRoles.map((item, index) => (
                                    <SwitchRoleCard
                                        setIsOpen={setIsOpen}
                                        setModalItem={setModalItem}
                                        key={index}
                                        role={item.role}
                                        lastTime={item.lastLoginAt}
                                        currentRole={user?.role}
                                    />
                                ))}
                            </div>
                        ) : (
                            <NotFound
                                onRefresh={handleRefresh}
                                onClearFilters={clearFilters}
                                hasFilters={Boolean(searchTerm || filterType !== 'all' || sortOrder !== 'desc')}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>

            {isOpen && modalItem && (
                <SwitchRoleModal
                    item={modalItem}
                    setIsOpen={setIsOpen}
                    currentRole={user.role}
                />
            )}
        </TooltipProvider>
    )
}

export default Page
