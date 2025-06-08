"use client";

import ProfileContent from "@/components/profile/ProfileContent";

import ProfileHeader from "@/components/profile/ProfileHeader";

function ProfilePage() {


  return (
    <div className="animate-fadeIn">
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
}

export default ProfilePage;