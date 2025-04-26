import React from 'react'
import Link from "next/link";

const Nav = () => {
    return (
        <>
            <nav className='nav bg-[#FFFFFF]'>
                <div className="container px-4 mx-auto">
                    <div className="nav-wrapper flex justify-between items-center py-[20px]">
                        <div className="icon text-[26px]">
                            <Link href={"/public"} className='text-[#1A91F0] font-bold'>
                                <h1>Resume Builder</h1>
                            </Link>
                        </div>
                        <div className="right flex items-center gap-[40px]">
                            <ul className='list-none'>
                                <li className='list-none text-[#000]'>
                                    <Link
                                        className='text-[#000] text-[18px] hover:text-[#1A91F0] transition-all duration-300'
                                        href={"/resume-templates"}>
                                        Resume Templates
                                    </Link>
                                </li>
                            </ul>
                            <button
                                className='border-[#1A91F0] border-[1px] rounded py-3 px-5 text-[#1A91F0] font-bold hover:bg-[#e4ebf1] transition-all duration-300'>
                                My Account
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav;