import React from "react";
import HeaderImage from "@/assets/images/home/images/header-image.png";
import Link from "next/link";
import Image from "next/image";

const Header = ({ countOfUsers }: { countOfUsers: number }) => {
  return (
    <header className="header bg-[#F7F9FC] py-[40px]">
      <div className="max-w-small mx-auto">
        <div className="header-wrapper">
          <div className="grid grid-cols-2 gap-[100px] items-center">
            <div className="left">
              <h5 className="text-[14px] font-normal mb-[10px]">
                <span className="bg-green-500 w-[10px] h-[10px] rounded-full inline-block me-2 animate-ping"></span>{" "}
                {countOfUsers} resumes created today
              </h5>
              <h1 className="font-bold text-[50px] tracking-wide my-[40px] mt-[20px]">
                The professional resume builder
              </h1>
              <p className="text-[18px] font-normal tracking-wide">
                Only 2% of resumes win. Yours will be one of them. Let´s build
                you a resume that works.
              </p>
              <Link href={"/resume-templates"}>
                <button className="text-capitalize bg-[#1A91F0] text-[#fff] py-5 px-10 rounded font-bold text-[20px] hover:bg-[#3891da] transition-all duration-300 mt-[30px]">
                  Create My Resume
                </button>
              </Link>
            </div>
            <div className="right">
              <Image
                src={HeaderImage}
                alt={"Image"}
                className={"w-full drop-shadow-lg"}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
