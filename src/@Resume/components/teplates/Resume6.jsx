import React from "react";

import ResumePhoto from "../../assets/images/image 265 (2).png";
const Resume6 = () => {
  const data = {
    image: {
      id: 1,
      isExists: true,
      url: ResumePhoto,
    },
    info: {
      firstName: "Rick",
      lastName: "Tang",
      title: "Product Designer",
      address: "San Francisco, California",
      phone: "(315) 802-8179",
      email: "ricktang@gmail.com",
      socials: [
        {
          id: 1,
          label: "LinkedIn",
          url: "https://linkedin.com/in/ricktang",
        },
        {
          id: 2,
          label: "Dribbble",
          url: "https://dribbble.com/ricktang",
        },
        {
          id: 3,
          label: "Behance",
          url: "https://www.behance.net/ricktang",
        },
      ],
    },
    profile: {
      title: "Profile",
      text: "UX/UI specialist focused on designing clean and functional projects across all platforms and devices in response to specific briefs and problems, while always maintaining a unique look and feel.",
    },
    experience: {
      title: "Experience",
      count: 4,
      jobs: [
        {
          id: 1,
          title: "Product Designer",
          company: "Uber",
          city: "San Francisco",
          startDate: "Mar 2015",
          endDate: "Present",
          isCurrent: true,
          responsibilities:
            "• Designed safety-focused experiences for Riders and Drivers\n• Physical space problem solving and it’s interaction with the digital\n• Navigated organization to achieve operational improvements\n",
          technologies: [],
        },
        {
          id: 2,
          title: "Product Designer",
          company: "IFTTT",
          city: "San Francisco",
          startDate: "Dec 2013",
          endDate: "Mar 2015",
          isCurrent: false,
          responsibilities:
            "• Product and system design for a complex product\n• Designed both consumer and developer products for IFTTT\n• Responsible for maintaining design across iOS, Android, and web",
          technologies: [],
        },
        {
          id: 3,
          title: "Product Designer",
          company: "Facebook",
          city: "Menlo Park",
          startDate: "Jun 2012",
          endDate: "Dec 2013",
          isCurrent: false,
          responsibilities:
            "• Designer and prototyped internal tools\n• Worked with Privacy team to build assets and features\n• Redesigned Newsfeed curation experience for mobile",
          technologies: [],
        },
        {
          id: 4,
          title: "UX/UI Design Intern",
          company: "Google Maps",
          city: "Mountain View",
          startDate: "Sep 2012",
          endDate: "Jun 2012",
          isCurrent: false,
          responsibilities:
            "• Contributed to Maps on iOS wireframe ans user experience\n• Designed and prototyped onboarding experience\n• Asset and feature design for Maps on Android",
          technologies: [],
        },
      ],
    },
    education: {
      count: 2,
      title: "Education",
      educations: [
        {
          id: 1,
          name: "Rhode Island School of Design",
          degree: "BFA",
          startDate: "2009",
          endDate: "",
          city: "BFA Industrial Design, Class of 2013",
          desc: "",
        },
        {
          id: 2,
          name: "Brown University",
          degree: "",
          startDate: "Sep 2010",
          endDate: "May 2013",
          city: "Interdisciplinary studies, Sep 2010 - May 2013",
          desc: "",
        },
      ],
    },
    skills: {
      title: "Skills",
      ver2: {
        technologies: [
          {
            id: 1,
            name: "Figma",
            percent: 100,
            isWithPercent: false,
          },
          {
            id: 2,
            name: "Sketch",
            percent: 100,
            isWithPercent: false,
          },
          {
            id: 3,
            name: "Photoshop",
            percent: 100,
            isWithPercent: false,
          },
          {
            id: 4,
            name: "Illustrator",
            percent: 100,
            isWithPercent: false,
          },
          {
            id: 5,
            name: "Adobe XD",
            percent: 100,
            isWithPercent: false,
          },
          {
            id: 6,
            name: "Principle",
            percent: 100,
            isWithPercent: false,
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
          level: "C2",
        },
        {
          id: 2,
          name: "Italian",
          level: "B2",
        },
      ],
    },
  };

  return (
    <div className="min-h-screen flex justify-center py-10">
      <div className="bg-white  bg-gradient-to-r from-white via-green-50 to-lime-50  w-full max-w-4xl rounded-md shadow-md p-6 ps-[45px]">
        <div className="grid grid-cols-[208px_1fr] gap-4 mb-6 pt-[45px]">
          {data.image.isExists && (
            <img
              src={data.image.url}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <div>
            <div className="mt-2">
              <p className="font-400 text-[16px] text-[#00000099]">
                {data.info.address}
              </p>
              <div className="flex gap-x-[5px]">
                <p className="font-400  text-[16px] text-[#00000099]">
                  {data.info.phone}
                </p>
                <p className="font-400  text-[16px] text-[#00000099]">
                  {data.info.email}
                </p>
              </div>
            </div>
            <div className="flex mt-[24px]">
              <h1 className="text-2xl font-bold text-[#000000] ">
                {data.info.firstName} {data.info.lastName}
              </h1>
              <p className="text-2xl  ml-2 font-bold text-[#000000]">
                {data.info.title}
              </p>
            </div>
            <div className="mt-[8px]">
              <p className="text-[#000000] font-normal text-[20px] max-w-xl ">
                {data.profile.text}
              </p>
            </div>
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="grid grid-cols-[208px_1fr] gap-4 mb-6 mt-[30px]">
          <h2 className="text-[#00000080] font-[600] text-xl">
            {data.experience.title}
          </h2>
          <div>
            {data.experience.jobs.map((job) => (
              <div key={job.id} className="mb-4">
                <p className="font-[700] text-lg ">
                  {job.title}, {job.company}
                </p>
                <p className="text-base font-400 text-[#000000B2]">
                  {job.startDate} - {job.isCurrent ? "Present" : job.endDate}
                </p>
                <p className="text-base whitespace-pre-line text-[#000000B2] mt-[8px]">
                  {job.responsibilities}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <div className="grid grid-cols-[208px_1fr] gap-4 mb-6">
          <h2 className="text-[#00000080] font-[600] text-xl">
            {data.education.title}
          </h2>
          <div>
            {data.education.educations.map((edu) => (
              <div key={edu.id} className="mb-4">
                <p className="font-[700] text-lg">
                  {edu.name} {edu.degree && `- ${edu.degree}`}
                </p>
                <p className="text-base text-[#000000B2]">{edu.city}</p>
              </div>
            ))}
          </div>
        </div>

        {/* LANGUAGES */}
        <div className="grid grid-cols-[208px_1fr] gap-4 mb-6 mt-[30px]">
          <h2 className="text-[#00000080] font-[600] text-xl ">
            {data.languages.title}
          </h2>
          <div>
            <ul className="flex gap-x-[15px]">
              {data.languages.languages.map((lang) => (
                <li
                  key={lang.id}
                  className=" font-[400] text-[#000000] list-none"
                >
                  {lang.name} {lang.level}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SKILLS */}
        <div className="grid grid-cols-[208px_1fr] gap-4 mb-6 mt-[30px]">
          <h2 className="text-[#00000080] font-[600] text-xl">
            {data.skills.title}
          </h2>
          <div>
            <ul className="flex flex-wrap gap-2">
              {data.skills.ver2.technologies.map((tech) => (
                <li
                  key={tech.id}
                  className="text-base text-[#000000] font-[400]     list-none"
                >
                  {tech.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* LINKS / SOCIALS */}
        {data.info.socials && data.info.socials.length > 0 && (
          <div className="grid grid-cols-[208px_1fr] gap-4 mt-[30px]">
            <h2 className="text-[#00000080] font-[600] text-xl">Links</h2>
            <div className="flex gap-x-[15px]">
              {data.info.socials.map((social) => (
                <div key={social.id} className="text-sm mb-1">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#000000] hover:underline text-base font-[400] "
                  >
                    {social.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resume6;
