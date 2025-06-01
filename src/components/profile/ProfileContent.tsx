import { Award, Briefcase, Calendar, Edit, Globe, GraduationCap, Loader2, Mail, MapPin, Phone, Save } from "lucide-react";
import { Button } from "../dashboard/ui/button";
import { useState } from "react";
import { contentData } from "./data";

const ProfileContent = () => {
    const [content, setContent] = useState(contentData)
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                            <p className="text-gray-900">abdurahmonMirmaxsudov@gmail.com</p>
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
                                AbdurahmonMirmaxsudov@gmail.com
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
                    >
                        {(
                            <Edit size={14} className="mr-1" />
                        )}
                        "Edit"
                    </Button>
                </div>
                {(
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
                    >
                        {(
                            <Edit size={14} className="mr-1" />
                        )}
                        "Edit"
                    </Button>
                </div>
                {(
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
                    >
                        {(
                            <Edit size={14} className="mr-1" />
                        )}

                        "Edit"
                    </Button>
                </div>
                <p className="text-gray-700">{content.about}</p>
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
                    >
                        <Edit size={14} className="mr-1" />
                    </Button>
                </div>
                <div className="space-y-6">
                    {content.experience.map((exp, index) => (
                        <div
                            key={exp.id}
                            className={`border-l-2 ${index === 0 ? "border-blue-500" : "border-gray-300"
                                } pl-4 ml-2`}
                        >
                            {(
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
                    >
                        <Edit size={14} className="mr-1" />
                    </Button>
                </div>
                <div className="space-y-6">
                    {content.education.map((edu, index) => (
                        <div
                            key={edu.id}
                            className={`border-l-2 ${index === 0 ? "border-blue-500" : "border-gray-300"
                                } pl-4 ml-2`}
                        >
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
                    >
                        <Edit size={14} className="mr-1" />
                    </Button>
                </div>
                <div className="space-y-4">
                    {content.certifications.map((cert, index) => (
                        <div key={cert.id} className="flex items-start">
                            <Award className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                            {(
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
}

export default ProfileContent;