"use client"

import React from 'react'

const JoinInfo = () => {
    const handleBtnClick = () => {
    };

    return (
        <section className='join-info-section bg-[#FFFFFF] py-[120px]'>
            <div className="max-w-small mx-auto">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-center font-bold text-[70px] text-[#1A91F0] leading-tight">
                        Join over{" "}
                        <span className="relative inline-block mx-[10px]">
                            46,573,000
                            <span className="absolute left-0 bottom-[-10px] w-full h-[6px] bg-[#FECF67]"></span>
                        </span>
                        <br/>
                        users worldwide
                    </h1>
                    <p className='text-center mt-[10px]'>
                        Start for free — try our resume builder now
                    </p>
                    <button
                        onClick={handleBtnClick}
                        className='text-capitalize bg-[#1A91F0] text-[#fff] py-3 px-6 rounded font-semibold text-[18px] hover:bg-[#3891da] transition-all duration-300 mt-[30px]'>
                        Create my resume
                    </button>
                </div>
            </div>
        </section>
    )
}

export default JoinInfo