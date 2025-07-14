import CareerAbout from "./CareerAbout";
import CareerExperience from "./CareerExperience";
import CareerEducation from "./CareerEducation";
import CareerContactInfo from "./CareerContactInfo";
import CareerSkills from "./CareerSkills";
import CareerLangauge from "./CareerLangauge";

const ProfileContent = () => {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
            {/* Contact Information */}
            <CareerContactInfo />
            {/* Skills */}
            <CareerSkills />
            {/* Languages */}
            <CareerLangauge />
        </div>
        <div className="md:col-span-2 space-y-6">
            {/* About */}
            <CareerAbout />
            {/* Experience */}
            <CareerExperience />
            {/* Education */}
            <CareerEducation />
        </div>
    </div>
}

export default ProfileContent;