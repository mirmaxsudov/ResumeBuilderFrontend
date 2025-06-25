"use client";

import { getCareerProfile } from "@/api/requests/profile/profile.api";
import ProfileContent from "@/components/profile/ProfileContent";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { useCareerProfile } from "@/store/zustand/useCareerProfile";
import { CareerProfileResponseType } from "@/types/careerProfile/CareerProfileType";
import { useEffect, useState } from "react";

function ProfilePage() {
  const [loading, setLoading] = useState<boolean>(true);
  const setCareer = useCareerProfile(state => state.setCareer);

  useEffect(() => {
    if (loading)
      fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getCareerProfile();
      console.log(response.data);
      
      setCareer(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="animate-fadeIn">
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
}

export default ProfilePage;