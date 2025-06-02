import {
  CalendarDays,
  Figma,
  Github,
  Globe,
  Link,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Square,
} from "lucide-react";
import React, { useState } from "react";

const EnjiBlackResume = () => {
  const [data] = useState({
    image: {
      id: 1,
      isExists: true,
      url: "some url",
    },
    info: {
      firstName: "Abdurahmon",
      lastName: "Mirmaxsudov",
      title: "Frontend developer",
      address: "Tashkent, Uzbekistan",
      phone: "+998997922950",
      email: "abdurahmonmirmaxsudov2804@gmail.com",
      socials: [
        {
          id: 1,
          label: "Github",
          url: "https://github.com/kimdir",
        },
      ],
    },
    profile: {
      title: "Profile",
      text: "about me",
    },
    experience: {
      title: "Experience",
      count: 1,
      jobs: [
        {
          id: 1,
          title: "Frontend developer",
          company: "Company",
          city: "Tashkent",
          startDate: "2022-01-01",
          endDate: "2022-12-31",
          isCurrent: true,
          responsibilities: "some responsibilities",
          technologies: [
            {
              id: 1,
              name: "React",
            },
            {
              id: 2,
              name: "React Native",
            },
          ],
        },
        {
          id: 2,
          title: "Frontend developer",
          company: "Company",
          city: "Tashkent",
          startDate: "2022-01-01",
          endDate: "2022-12-31",
          isCurrent: false,
          responsibilities: "some responsibilities",
          technologies: [
            {
              id: 1,
              name: "React",
            },
            {
              id: 2,
              name: "React Native",
            },
          ],
        },
      ],
    },
    education: {
      count: 1,
      title: "Education",
      educations: [
        {
          id: 1,
          name: "PDP Academy",
          degree: "Frontend course",
          startDate: "2022-01-01",
          endDate: "2022-12-31",
          city: "Tashkent",
          desc: "some description",
        },
      ],
    },
    skills: {
      title: "Skills",
      ver1: {
        subs: [
          {
            title: "Languages",
            technologies: [
              {
                id: 1,
                name: "HTML",
                percent: 100,
              },
              {
                id: 2,
                name: "CSS",
                percent: 100,
              },
            ],
          },
          {
            title: "Frameworks",
            technologies: [
              {
                id: 1,
                name: "React",
                percent: 100,
              },
              {
                id: 2,
                name: "React Native",
                percent: 60,
              },
            ],
          },
        ],
      },
    },
    languages: {
      title: "Languages",
      count: 2,
      languages: [
        {
          id: 1,
          name: "English",
          level: "B2",
        },
        {
          id: 2,
          name: "Uzbek",
          level: "Native",
        },
      ],
    },
    projects: {
      title: "Projects",
      count: 1,
      projects: [
        {
          id: 1,
          title: "Resume Builder",
          technologies: [
            {
              id: 1,
              name: "React",
            },
            {
              id: 2,
              name: "CSS",
            },
          ],
          desc: "some description",
          startDate: "2022-01-01",
          endDate: "2022-12-31",
          isCurrent: true,
          link: "https://github.com/kimdir/resume-builder",
        },
      ],
    },
  })

  return (
    <div className="enji-resume--wrapper">
      <div className="bg-[#0f172a] text-white enji-resume ">
        <div className="enji-black--header flex flex-col items-center ">
          <h2 className="text-3xl font-extrabold text-white">
            {" "}
            {data.info.firstName} {data.info.lastName}{" "}
          </h2>
          <h4 className="text-[13px] text-[#E2E8F0] font-medium leading-[20px]">
            {data.info.title}
          </h4>
          <div className="flex gap-2 pt-4 pb-2">
            <p className="flex items-center gap-[2px] text-[12px] text-[#E2E8F0]">
              <MapPin className="v-4 h-4" />
              {data.info.address}
            </p>
            <p className="flex items-center gap-[2px] text-[12px] text-[#E2E8F0]">
              <Mail className="v-4 h-4" />
              {data.info.email}
            </p>
          </div>
          <div className="flex gap-1">
            <button className="flex font-semibold border bg-purple-100 border-purple-600 text-purple-600 rounded-full px-2 py-1 items-center text-[12px]">
              <Globe className="v-4 h-4" /> enji.dev
            </button>
            <button className="flex font-semibold border bg-blue-100 border-blue-600 text-blue-600 rounded-full px-2 py-1 items-center text-[12px]">
              <Linkedin className="v-4 h-4" /> /enjidev
            </button>
            <button className="flex font-semibold border bg-orange-100 border-orange-600 text-orange-600 rounded-full px-2 py-1 items-center text-[12px]">
              <Figma className="v-4 h-4" /> /@enjidev
            </button>
            <button className="flex font-semibold border bg-gray-200 border-black text-black rounded-full px-2 py-1 items-center text-[12px]">
              <Github className="v-4 h-4" /> /enjidev
            </button>
          </div>
        </div>
        <div className="w-full bg-slate-700 h-[1px]"></div>
        <div className="enji-container">
          <div className="grid grid-cols-12 gap-4 items-center pt-8 pb-4">
            <h4 className="text-[14px] text-[#E2E8F0] col-span-3 font-semibold">
              Education
            </h4>
            <div className="col-span-9 grid grid-cols-12">
              <p className="flex items-center text-[14px] text-[#E2E8F0] col-span-8 ">
                <span className=" font-semibold block text-sm text-[#E2E8F0]">
                  {data.education.educations[0].name}
                </span>
                — {data.education.educations[0].degree}
              </p>
              <p className="flex col-span-4 gap-1 text-gray-600 text-[10px] font-medium">
                <CalendarDays className="w-3 h-3" />
                {data.education.educations[0].startDate} -{" "}
                {data.education.educations[0].endDate}
              </p>
            </div>
          </div>
          <div className="w-full bg-slate-700 h-[1px]"></div>
          <div className="grid grid-cols-12 gap-4 pt-4 pb-2">
            <h4 className="text-[14px] text-[#E2E8F0] col-span-12 md:col-span-3 font-semibold">
              {data.experience.title}
            </h4>
            <div className="col-span-9 grid grid-cols-12 items-center">
              <p className="flex items-center text-[14px] text-[#E2E8F0] md:col-span-8 ">
                <span className=" font-semibold block text-sm text-[#E2E8F0]">
                  {data.experience.jobs[0].company}
                </span>
                — {data.experience.jobs[0].title}
              </p>
              <p className="flex col-span-4 gap-1 text-gray-600 text-[10px] font-medium">
                <CalendarDays className="w-3 h-3" />
                {data.education.educations[0].startDate} -{" "}
                {data.education.educations[0].endDate}
              </p>
              <div className="flex items-center gap-1 col-span-12 mt-2">
                {data.experience.jobs[0].technologies.map((item) => {
                  return (
                    <button className="bg-slate-700 text-slate-300 rounded-md text-[12px] font-medium py-0">
                      {item.name}
                    </button>
                  );
                })}
              </div>
              <p className="col-span-12 text-[12px] text-[#E2E8F0] flex items-center gap-1 mt-1">
                <Square className="w-2 h-2" />
                Improving the UI & UX of Femicam's desktop application based on
                React Electron
              </p>
              <p className="col-span-12 text-[12px] text-[#E2E8F0] flex items-center gap-1 mt-1">
                <Square className="w-2 h-2" />
                Designing and creating React components for the application
                dashboard
              </p>
              <p className="flex items-center text-[14px] text-[#E2E8F0] col-span-8 mt-2">
                <span className=" font-semibold block text-sm text-[#E2E8F0]">
                  Ciptaloka.com
                </span>
                — {data.experience.jobs[0].title}
              </p>
              <p className="flex col-span-4 gap-1 text-gray-600 text-[10px] font-medium">
                <CalendarDays className="w-3 h-3" />
                {data.education.educations[0].startDate} -{" "}
                {data.education.educations[0].endDate}
              </p>
              <div className="flex items-center gap-1 col-span-12 mt-2">
                <button className="bg-slate-700 text-slate-300 rounded-md text-[12px] font-medium py-0">
                  Tailwind Css
                </button>
              </div>
              <p className="col-span-12 text-[12px] text-[#E2E8F0] flex items-center gap-1 mt-1">
                <Square className="w-2 h-2 text-[#E2E8F0]" />
                Created main site navigation (mega-menu, mobile drawer) using
                Tailwind CSS
              </p>
              <p className="col-span-12 text-[12px] text-[#E2E8F0] flex items-center gap-1 mt-1">
                <Square className="w-2 h-2 " />
                Revamped shopping cart & checkout pages (~18 pages in total)
              </p>
            </div>
          </div>

          <div className="w-full bg-slate-700 h-[1px]"></div>
          <div className="grid grid-cols-12 items-start mt-4">
            <div className="col-span-3">
              <h4 className="text-[14px] text-[#E2E8F0] font-semibold">
                Featured Project
              </h4>
            </div>
            <div className="col-span-9 grid grid-cols-12">
              <div className="col-span-12">
                <p className="flex items-center text-[14px] text-[#E2E8F0] col-span-12 md:col-span-6 ">
                  <span className=" font-semibold block text-sm text-[#E2E8F0]">
                    SPKJS
                  </span>
                </p>
              </div>

              <div className="col-span-12 mt-2">
                <button className="bg-slate-700 text-slate-300 rounded-md text-[12px] font-medium py-0">
                  React
                </button>
                <button className="bg-slate-700 text-slate-300 rounded-md text-[12px] font-medium py-0">
                  Chakra UI
                </button>
                <button className="bg-slate-700 text-slate-300 rounded-md text-[12px] font-medium py-0">
                  Express
                </button>
                <button className="bg-slate-700 text-slate-300 rounded-md text-[12px] font-medium py-0">
                  MongoDB
                </button>
                <button className="bg-slate-700 text-slate-300 rounded-md text-[12px] font-medium py-0">
                  Redis
                </button>
              </div>
              <div className="col-span-12">
                <p className="text-[12px] text-[#E2E8F0] mt-1">
                  SPKJS (Sistem Pendeteksi Kemiripan Judul Skripsi) is an
                  application to early detect thesis titles plagiarism using the
                  Jaro Winkler algorithm. More details at{" "}
                  <span className="flex items-center">
                    <Link className="w-4 h-4" />
                    github.com/enjidev/spkjs
                  </span>
                </p>
              </div>

              <div className="col-span-12 flex my-[10px]">
                <Sparkles className="w-4 h-4" />
                <p className="text-[12px] text-[#E2E8F0] flex">
                  see all of my projects on my portfolio:
                  <span className="flex items-center">
                    <Link className="w-4 h-4" />
                    github.com/enjidev/spkjs
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-700 h-[1px]"></div>
          <div className="grid grid-cols-12 items-start mt-4">
            <div className="col-span-3">
              <h4 className="text-[14px] text-[#E2E8F0] font-semibold">
                Skills & Tools
              </h4>
            </div>
            <div className="col-span-9 grid grid-cols-12">
              <div className="col-span-4">
                <p className="text-[12px] text-slate-500">
                  Underline indicators
                </p>
              </div>
              <div className="col-span-8">
                <button className="bg-slate-700 text-slate-300 rounded-md text-[12px] font-medium py-0">
                  Frequently Used
                </button>
                <button className="bg-slate-700 text-slate-300 rounded-md text-[12px] font-medium py-0">
                  Occasionally
                </button>
              </div>
              <div className="col-span-12">
                <h4 className="text-[14px] text-[#E2E8F0] font-semibold">
                  Languages
                </h4>
              </div>
              <div className="col-span-4">
                <p className="text-[12px] text-slate-500">FE related</p>
              </div>
              <div className="col-span-8">
                {data.skills.ver1.subs.map((item) => (
                  <button
                    key={item.title}
                    className="bg-slate-700 text-slate-300 rounded-md text-[12px] font-medium py-0"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
              <div className="col-span-4">
                <p className="text-[12px] text-slate-500">BE related</p>
              </div>
              <div className="col-span-8 mb-3">
                <button className="bg-slate-700 text-slate-300 rounded-md text-[12px] font-medium py-0">
                  PHP
                </button>
                <button className="bg-slate-700 text-slate-300 rounded-md text-[12px] font-medium py-0">
                  SQL
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-700 h-[1px]"></div>
        </div>
      </div>
    </div>
  );
};

export default EnjiBlackResume;
