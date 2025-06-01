"use client";

import {
  Edit,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  Mail,
  Phone,
  Globe,
  Download,
  Save,
} from "lucide-react";
import { Button } from "@/components/dashboard/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import ResumeLanguageLevel from "@/enums/LanguageEnum";
import { useAppSelector } from "@/hooks/hooks";
import GenerateProfileIcon from "@/helpers/GenerateProfileIcon";
import ProfileImageEditor from "@/components/profile/ProfileImageEditorProps ";

function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [editMode, setEditMode] = useState({
    about: false,
    experience: false,
    education: false,
    certifications: false,
    skills: false,
    languages: false,
  });
  const [loading, setLoading] = useState({
    about: false,
    experience: false,
    education: false,
    certifications: false,
    skills: false,
    languages: false,
  });
  const [content, setContent] = useState({
    about:
      "Experienced Software Engineer with a passion for building scalable web applications. Skilled in JavaScript, React, and Node.js. Strong problem-solving abilities and a team player with excellent communication skills. Looking for opportunities to contribute to innovative projects and continue growing as a developer.",
    experience: [
      {
        id: 1,
        title: "Senior Software Engineer",
        company: "TechCorp Inc.",
        period: "Jan 2021 - Present",
        description:
          "Led the development of a React-based dashboard application. Implemented new features and optimized performance. Mentored junior developers and conducted code reviews.",
      },
      {
        id: 2,
        title: "Software Engineer",
        company: "WebSolutions LLC",
        period: "Mar 2018 - Dec 2020",
        description:
          "Developed and maintained web applications using React and Node.js. Collaborated with designers and product managers to implement new features. Improved application performance by 30%.",
      },
    ],
    education: [
      {
        id: 1,
        degree: "Master of Science in Computer Science",
        institution: "Stanford University",
        period: "2016 - 2018",
        description:
          "Specialized in Software Engineering and Artificial Intelligence. Graduated with honors.",
      },
      {
        id: 2,
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        period: "2012 - 2016",
        description:
          "Dean's List, GPA 3.8/4.0. Active member of the Computer Science Club.",
      },
    ],
    certifications: [
      {
        id: 1,
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        year: "2022",
      },
      {
        id: 2,
        name: "Google Cloud Professional Developer",
        issuer: "Google Cloud",
        year: "2021",
      },
      {
        id: 3,
        name: "React Advanced Certification",
        issuer: "Meta",
        year: "2020",
      },
    ],
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "TypeScript",
      "HTML/CSS",
      "Git",
      "REST APIs",
      "SQL",
    ],
    languages: [
      { name: "English", level: "Native", proficiency: 100 },
      { name: "Spanish", level: "Intermediate", proficiency: 60 },
      { name: "French", level: "Basic", proficiency: 40 },
    ],
  });

  const toggleEditMode = (section: string) => {
    setEditMode((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  const handleSave = (section: string) => {
    setLoading((prev) => ({ ...prev, [section]: true }));

    setTimeout(() => {
      setLoading((prev) => ({ ...prev, [section]: false }));
      toggleEditMode(section);
    }, 1000);
  };

  const handleContentChange = (
    section: string,
    value: string | any[],
    id?: number
  ) => {
    if (id !== undefined) {
      const updatedArray = content[section as keyof typeof content].map(
        (item: any) => (item.id === id ? { ...item, ...value } : item)
      );
      setContent((prev) => ({ ...prev, [section]: updatedArray }));
    } else {
      setContent((prev) => ({ ...prev, [section]: value }));
    }
  };

  // const handleSaveForBlob = (blob: Blob) => {
  //   const url = URL.createObjectURL(blob);
  //   setPreviewUrl(url);
  // };

  return (
    <div className="animate-fadeIn">
      {/* <ProfileImageEditor onSave={handleSaveForBlob} initialImageUrl={null} />

      {previewUrl && (
        <div style={{ marginTop: '24px' }}>
          <h2>Preview of Cropped Image:</h2>
          <img
            src={previewUrl}
            alt="Cropped Preview"
            style={{ width: '150px', borderRadius: '50%' }}
          />
        </div>
      )} */}
      <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row items-start md:items-end">
            <div className="absolute -top-16 left-6 w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-md bg-white">
              {
                GenerateProfileIcon({ firstName: user.firstName, lastName: user.lastname })
              }
            </div>
            <div className="mt-20 md:mt-0 md:ml-36 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.firstName || "User"} {user.lastname || "user"}
                  </h1>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <Button
                    variant="outline"
                    className="rounded-full hover:bg-blue-50 btn-hover"
                  >
                    <Download size={16} className="mr-2" /> Download Resume
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 rounded-full shadow-sm btn-hover text-white">
                    <Edit size={16} className="mr-2" /> Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Contact Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">akbarjoraxojayev@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">+998 (93) 0757018</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-900">San Francisco, CA</p>
                </div>
              </div>
              <div className="flex items-start">
                <Globe className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a href="#" className="text-blue-600 hover:underline">
                    akbarjoraxojayev@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-blue-600 hover:bg-blue-50"
                onClick={() =>
                  editMode.skills
                    ? handleSave("skills")
                    : toggleEditMode("skills")
                }
                disabled={loading.skills}
              >
                {loading.skills ? (
                  <Loader2 size={14} className="mr-1 animate-spin" />
                ) : editMode.skills ? (
                  <Save size={14} className="mr-1" />
                ) : (
                  <Edit size={14} className="mr-1" />
                )}
                {editMode.skills
                  ? loading.skills
                    ? "Saving..."
                    : "Save"
                  : "Edit"}
              </Button>
            </div>
            {editMode.skills ? (
              <textarea
                className="w-full p-2 border rounded-md"
                value={content.skills.join(", ")}
                onChange={(e) =>
                  handleContentChange(
                    "skills",
                    e.target.value.split(",").map((skill) => skill.trim())
                  )
                }
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {content.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Languages */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Languages</h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-blue-600 hover:bg-blue-50"
                onClick={() =>
                  editMode.languages
                    ? handleSave("languages")
                    : toggleEditMode("languages")
                }
                disabled={loading.languages}
              >
                {loading.languages ? (
                  <Loader2 size={14} className="mr-1 animate-spin" />
                ) : editMode.languages ? (
                  <Save size={14} className="mr-1" />
                ) : (
                  <Edit size={14} className="mr-1" />
                )}
                {editMode.languages
                  ? loading.languages
                    ? "Saving..."
                    : "Save"
                  : "Edit"}
              </Button>
            </div>
            {editMode.languages ? (
              <div className="space-y-3">
                {content.languages.map((lang, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center mb-2">
                      <input
                        type="text"
                        className="w-1/2 p-2 border rounded-md mr-2"
                        value={lang.name}
                        onChange={(e) => {
                          const updatedLanguages = [...content.languages];
                          updatedLanguages[index].name = e.target.value;
                          handleContentChange("languages", updatedLanguages);
                        }}
                      />
                      <select
                        className="w-1/2 p-2 border rounded-md"
                        value={lang.level}
                        onChange={(e) => {
                          const updatedLanguages = [...content.languages];
                          updatedLanguages[index].level = e.target.value;
                          updatedLanguages[index].proficiency = +e.target
                            .value as ResumeLanguageLevel;
                          handleContentChange("languages", updatedLanguages);
                        }}
                      >
                        {Object.keys(ResumeLanguageLevel)
                          .filter((k) => !isNaN(Number(k)))
                          .map((level) => (
                            <option key={level} value={level}>
                              {ResumeLanguageLevel[level]}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: `${lang.proficiency}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {content.languages.map((lang, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-900">{lang.name}</span>
                      <span className="text-gray-500 text-sm">
                        {lang.level}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: `${lang.proficiency}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">About</h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-blue-600 hover:bg-blue-50"
                onClick={() =>
                  editMode.about ? handleSave("about") : toggleEditMode("about")
                }
                disabled={loading.about}
              >
                {loading.about ? (
                  <Loader2 size={14} className="mr-1 animate-spin" />
                ) : editMode.about ? (
                  <Save size={14} className="mr-1" />
                ) : (
                  <Edit size={14} className="mr-1" />
                )}
                {editMode.about
                  ? loading.about
                    ? "Saving..."
                    : "Save"
                  : "Edit"}
              </Button>
            </div>
            {editMode.about ? (
              <textarea
                className="w-full p-2 border rounded-md min-h-[120px]"
                value={content.about}
                onChange={(e) => handleContentChange("about", e.target.value)}
              />
            ) : (
              <p className="text-gray-700">{content.about}</p>
            )}
          </div>

          {/* Experience */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Experience
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-blue-600 hover:bg-blue-50"
                onClick={() =>
                  editMode.experience
                    ? handleSave("experience")
                    : toggleEditMode("experience")
                }
                disabled={loading.experience}
              >
                {loading.experience ? (
                  <Loader2 size={14} className="mr-1 animate-spin" />
                ) : editMode.experience ? (
                  <Save size={14} className="mr-1" />
                ) : (
                  <Edit size={14} className="mr-1" />
                )}
                {editMode.experience
                  ? loading.experience
                    ? "Saving..."
                    : "Save"
                  : "Edit"}
              </Button>
            </div>
            <div className="space-y-6">
              {content.experience.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`border-l-2 ${index === 0 ? "border-blue-500" : "border-gray-300"
                    } pl-4 ml-2`}
                >
                  {editMode.experience ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md font-medium"
                        value={exp.title}
                        onChange={(e) =>
                          handleContentChange(
                            "experience",
                            { title: e.target.value },
                            exp.id
                          )
                        }
                      />
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={exp.company}
                        onChange={(e) =>
                          handleContentChange(
                            "experience",
                            { company: e.target.value },
                            exp.id
                          )
                        }
                      />
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1 text-gray-500" />
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md text-gray-500 text-sm"
                          value={exp.period}
                          onChange={(e) =>
                            handleContentChange(
                              "experience",
                              { period: e.target.value },
                              exp.id
                            )
                          }
                        />
                      </div>
                      <textarea
                        className="w-full p-2 border rounded-md min-h-[80px]"
                        value={exp.description}
                        onChange={(e) =>
                          handleContentChange(
                            "experience",
                            { description: e.target.value },
                            exp.id
                          )
                        }
                      />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center mb-1">
                        <Briefcase
                          size={16}
                          className={`${index === 0 ? "text-blue-600" : "text-gray-500"
                            } mr-2`}
                        />
                        <h3 className="font-medium text-gray-900">
                          {exp.title}
                        </h3>
                      </div>
                      <p className="text-gray-700 mb-1">{exp.company}</p>
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <Calendar size={14} className="mr-1" />
                        <span>{exp.period}</span>
                      </div>
                      <p className="text-gray-700">{exp.description}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Education</h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-blue-600 hover:bg-blue-50"
                onClick={() =>
                  editMode.education
                    ? handleSave("education")
                    : toggleEditMode("education")
                }
                disabled={loading.education}
              >
                {loading.education ? (
                  <Loader2 size={14} className="mr-1 animate-spin" />
                ) : editMode.education ? (
                  <Save size={14} className="mr-1" />
                ) : (
                  <Edit size={14} className="mr-1" />
                )}
                {editMode.education
                  ? loading.education
                    ? "Saving..."
                    : "Save"
                  : "Edit"}
              </Button>
            </div>
            <div className="space-y-6">
              {content.education.map((edu, index) => (
                <div
                  key={edu.id}
                  className={`border-l-2 ${index === 0 ? "border-blue-500" : "border-gray-300"
                    } pl-4 ml-2`}
                >
                  {editMode.education ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md font-medium"
                        value={edu.degree}
                        onChange={(e) =>
                          handleContentChange(
                            "education",
                            { degree: e.target.value },
                            edu.id
                          )
                        }
                      />
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={edu.institution}
                        onChange={(e) =>
                          handleContentChange(
                            "education",
                            { institution: e.target.value },
                            edu.id
                          )
                        }
                      />
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1 text-gray-500" />
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md text-gray-500 text-sm"
                          value={edu.period}
                          onChange={(e) =>
                            handleContentChange(
                              "education",
                              { period: e.target.value },
                              edu.id
                            )
                          }
                        />
                      </div>
                      <textarea
                        className="w-full p-2 border rounded-md min-h-[80px]"
                        value={edu.description}
                        onChange={(e) =>
                          handleContentChange(
                            "education",
                            { description: e.target.value },
                            edu.id
                          )
                        }
                      />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center mb-1">
                        <GraduationCap
                          size={16}
                          className={`${index === 0 ? "text-blue-600" : "text-gray-500"
                            } mr-2`}
                        />
                        <h3 className="font-medium text-gray-900">
                          {edu.degree}
                        </h3>
                      </div>
                      <p className="text-gray-700 mb-1">{edu.institution}</p>
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <Calendar size={14} className="mr-1" />
                        <span>{edu.period}</span>
                      </div>
                      <p className="text-gray-700">{edu.description}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Certifications
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-blue-600 hover:bg-blue-50"
                onClick={() =>
                  editMode.certifications
                    ? handleSave("certifications")
                    : toggleEditMode("certifications")
                }
                disabled={loading.certifications}
              >
                {loading.certifications ? (
                  <Loader2 size={14} className="mr-1 animate-spin" />
                ) : editMode.certifications ? (
                  <Save size={14} className="mr-1" />
                ) : (
                  <Edit size={14} className="mr-1" />
                )}
                {editMode.certifications
                  ? loading.certifications
                    ? "Saving..."
                    : "Save"
                  : "Edit"}
              </Button>
            </div>
            <div className="space-y-4">
              {content.certifications.map((cert, index) => (
                <div key={cert.id} className="flex items-start">
                  <Award className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                  {editMode.certifications ? (
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md font-medium"
                        value={cert.name}
                        onChange={(e) =>
                          handleContentChange(
                            "certifications",
                            { name: e.target.value },
                            cert.id
                          )
                        }
                      />
                      <div className="flex items-center">
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md text-gray-500 text-sm"
                          value={`${cert.issuer} • ${cert.year}`}
                          onChange={(e) => {
                            const parts = e.target.value.split("•");
                            const issuer = parts[0]?.trim() || "";
                            const year = parts[1]?.trim() || "";
                            handleContentChange(
                              "certifications",
                              { issuer, year },
                              cert.id
                            );
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-medium text-gray-900">{cert.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {cert.issuer} • {cert.year}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;