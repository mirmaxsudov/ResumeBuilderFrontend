import React from 'react'
import InfoImage from "@/assets/images/home/images/infoImage.png";
import Image from "next/image";

const InfoAbout = () => {
    return (
        <section className='info-section py-[30px]'>
            <div className="max-w-small mx-auto">
                <div className="info-wrapper rounded-xl bg-[#EAF6FF] px-[200px] py-[20px]">
                    <div className="flex items-center justify-between">
                        <Image src={InfoImage} alt={"image"} className={'w-[80px]'}/>
                        {/*<img className='w-[80px]' src={InfoImage} alt="Info Image"/>*/}
                        <p className='flex items-center text-[#0F3871] text-[25px] gap-[20px]'>
                            <span className='bg-[#F5FBFF] py-2 px-2 text-[40px] rounded-md  inline-block'>
                                42,501
                            </span> resumes created today
                        </p>
                        <span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InfoAbout