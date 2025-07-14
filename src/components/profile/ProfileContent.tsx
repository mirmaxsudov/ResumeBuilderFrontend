import CareerAbout from "./CareerAbout";
import CareerExperience from "./CareerExperience";
import CareerEducation from "./CareerEducation";
import CareerContactInfo from "./CareerContactInfo";
import CareerSkills from "./CareerSkills";
import CareerLangauge from "./CareerLangauge";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/dashboard/ui/popover";
import {format} from "date-fns";
import {DayPicker} from "react-day-picker";
import React from "react";

const ProfileContent = () => {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
            {/* Contact Information */}
            <CareerContactInfo/>
            {/* Skills */}
            <CareerSkills/>
            {/* Languages */}
            <CareerLangauge/>
        </div>
        <div className="md:col-span-2 space-y-6">
            {/* About */}
            <CareerAbout/>
            {/* Experience */}
            <CareerExperience/>
            {/* Education */}
            <CareerEducation/>
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        draggable={false}
                        onPointerDown={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        onDragStart={(e) => e.stopPropagation()}
                        // disabled={item.currentJob}
                        // className={`w-full text-left py-2 px-3 border border-gray-300 rounded
                        //       ${item.currentJob
                        //     ? "text-gray-400 bg-gray-100"
                        //     : item.endDate
                        //         ? "text-gray-800"
                        //         : "text-gray-400"}`}
                    >
                        S
                    </button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <DayPicker
                        className={"bg-white"}
                        mode="single"
                        selected={
                            new Date()
                        }
                        onSelect={(d) => {
                            alert(d);
                            console.log(d);
                        }
                            // change(
                            //     key,
                            //     "endDate",
                            //     d ? d.toISOString().slice(0, 10) : ""
                            // )
                        }
                    />
                </PopoverContent>
            </Popover>
        </div>
    </div>
}

export default ProfileContent;