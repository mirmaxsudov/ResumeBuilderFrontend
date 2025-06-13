import { Bookmark, MapPin } from "lucide-react";
import React from "react";
import { Button, Input, Slider, SliderSingleProps } from "antd";
import {
  CloseCircleFilled,
  CloseCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Search from "antd/es/transfer/search";
import { Close } from "@radix-ui/react-toast";
import Image from "next/image";
import ResumeImg from "../../../../assets/images/home/images/ress.jpg";
import ButtonGroup from "antd/es/button/button-group";

const marks: SliderSingleProps["marks"] = {
  0: "0",
  100: {
    style: {
      color: "#f50",
    },
    label: <strong>40</strong>,
  },
};
const page = () => {

  const resumeArr = [
    {
      title: 'Kamola Ibrohimova'
    },
    {
      title: 'Kamola Ibrohimova'
    },
    {
      title: 'Kamola Ibrohimova'
    },
    {
      title: 'Kamola Ibrohimova'
    },
    {
      title: 'Kamola Ibrohimova'
    },
  ]



  return (
    <div>
      <div className="border rounded-xl p-4 bg-white shadow-sm">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Filter</h1>
          <h2 className="text-xl font-bold text-gray-800 mb-4">1000</h2>
        </div>
        <div className="flex items-start mb-4 gap-6">
          <div className="w-[60%]">
            <Search placeholder="Search framework or library" />
          </div>
          <div className="w-[40%]">
            <div className="flex justify-end">
              <button className="border rounded-lg border-blue-500 text-blue-500 text-[14px] py-[2px]">
                Uzb
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-start mb-4 gap-6">
          <div className="w-[60%]">
            <div className="h-[140px] border rounded-lg py-2 px-2">
              <div className="flex gap-2">
                <button className="flex items-center gap-2 bg-blue-100 rounded-md text-xs text-blue-600 font-medium hover:bg-blue-200">
                  React
                  <CloseCircleFilled />
                </button>
                <button className="flex items-center gap-2 bg-blue-100 rounded-md text-xs text-blue-600 font-medium hover:bg-blue-200">
                  Vue
                  <CloseCircleFilled />
                </button>
              </div>
            </div>
          </div>
          <div className="w-[40%]">
            <p className="text-[14px] font-semibold">Year</p>
            <Slider marks={marks} defaultValue={20} />
            <p className="text-[14px] font-semibold">Month</p>
            <Slider marks={marks} defaultValue={60} />
          </div>
        </div>
      </div>
      <div className="border rounded-xl p-4 bg-white shadow-sm mt-5">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Resumes 1000</h2>
        <div className="flex flex-wrap gap-5">
          {
            resumeArr.map((item) => (
              <div className="border rounded-lg flex flex-col items-center py-2 px-4">
                <h2 className="font-semibold py-2 text-gray-800">Kamola Ibrohimova</h2>
                <div className="">
                  <Image className="rounded-lg w-[240px] object-contain" src={ResumeImg} alt="" />
                </div>
                <button className="bg-blue-500 text-white w-full rounded-lg text-[14px] p-[6px] mt-3">Show</button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default page;
