import React from 'react'
import "./Resume8.css"

const Resume8 = () => {
    const data = {
        image: {
            id: 1,
            isExists: true,
            url: "some url",
        },
        info: {
            firstName: "Kimdir",
            lastName: "Kimdirov",
            title: "Frontend developer",
            address: "Tashkent, Uzbekistan",
            phone: "+998901234567",
            email: "yTq4W@example.com",
            socials: [
                {
                    id: 1,
                    label: "Github",
                    url: "https://github.com/kimdir",
                },
                {
                    id: 1,
                    label: "LinkedIn",
                    url: "https://linkedin.com/kimdir",
                }
            ]
        },
        profile: {
            title: "Profile",
            text: "about me"
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
                            name: "React"
                        },
                        {
                            id: 2,
                            name: "React Native"
                        }
                    ]
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
                            name: "React"
                        },
                        {
                            id: 2,
                            name: "React Native"
                        }
                    ]
                }
            ]
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
                    desc: "some description"
                }
            ]
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
                                percent: 100
                            },
                            {
                                id: 2,
                                name: "CSS",
                                percent: 100
                            }
                        ]
                    },
                    {
                        title: "Frameworks",
                        technologies: [
                            {
                                id: 1,
                                name: "React",
                                percent: 100
                            },
                            {
                                id: 2,
                                name: "React Native",
                                percent: 60
                            }
                        ]
                    }
                ]
            },
            ver2: {
                technologies: [
                    {
                        id: 1,
                        name: "HTML",
                        percent: 100,
                        isWithPercent: true
                    },
                    {
                        id: 2,
                        name: "CSS",
                        percent: 100,
                        isWithPercent: true
                    },
                    {
                        id: 3,
                        name: "React",
                        percent: 100,
                        isWithPercent: true
                    },
                    {
                        id: 4,
                        name: "React Native",
                        percent: 60,
                        isWithPercent: true
                    }
                ]
            }
        },
        languages: {
            title: "Languages",
            count: 2,
            languages: [
                {
                    id: 1,
                    name: "English",
                    level: "B2"
                },
                {
                    id: 2,
                    name: "Uzbek",
                    level: "Native"
                }
            ]
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
                            name: "React"
                        },
                        {
                            id: 2,
                            name: "CSS"
                        }
                    ],
                    desc: "some description",
                    startDate: "2022-01-01",
                    endDate: "2022-12-31",
                    isCurrent: true,
                    link: "https://github.com/kimdir/resume-builder"
                }
            ]
        }
    }

    console.log(data);

    return (
        <div className='resume w-[794px] min-h-[1123px] mx-auto p-[45px] bg-[#fff] border relative'>
            <div>
                <div className='top flex justify-between'>
                    <div className='socials'>
                        <div className="flex z-50 items-center divide-x-2 divide-gray-400">
                            {data.info.socials.map((social, i) => (
                                <a
                                    key={social.url}
                                    className={`text-black text-[14px] px-[15px] ${i === 0 ? 'pl-0' : ''}`}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {social.label}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="info text-end text-[#0000007d] text-[14px]">
                        <p>
                            {data.info.address}
                        </p>
                        <p>
                            {data.info.email}
                        </p>
                        <p>
                            {data.info.phone}
                        </p>
                    </div>
                </div>
                <h1 className='text-[60px] font-semibold tracking-wide'>
                    {data.info.firstName + ' ' + data.info.lastName}
                </h1>
            </div>
            <div className='bg-icon bg-icon-1 rounded-full bg-[#FF90C3] absolute z-50'></div>
            <div className='bg-icon bg-icon-2 rounded-full bg-[#32EF96] absolute z-40'></div>
            <div className='bg-icon bg-icon-3 rounded-full bg-[#8AE9FB] absolute z-30'></div>
        </div>
    )
}

export default Resume8;