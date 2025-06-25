import $api from "@/api/request";
import ApiResponse from "@/types/ApiResponse";

const CAREER_PROFILE_URL = "/api/v1/career-profile";

const getCareerProfile = async (): Promise<ApiResponse<any>> => {
  try {
    console.log("Making API request to:", CAREER_PROFILE_URL);
    const response = await $api.get(CAREER_PROFILE_URL);
    console.log("Raw API Response:", {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    });
    
    console.log("Response structure:", {
      hasData: !!response.data,
      dataKeys: response.data ? Object.keys(response.data) : [],
      nestedData: response.data?.data ? Object.keys(response.data.data) : [],
      fullData: response.data
    });

    if (!response.data) {
      throw new Error("No data received from API");
    }
    return response.data;
  } catch (error) {
    console.error("Error in getCareerProfile:", error);
    throw error;
  }
};

const getMyResumesForCareerProfile = async (
  careerId: number
): Promise<ApiResponse<any>> => {
  const response = await $api.get(
    `/api/v1/career-profile/my-resumes-for-career-profile/${careerId}`
  );
  return response.data;
};

const updateCareerProfileImage = async (
  careerId: number,
  imageAttachmentId: number,
  type: "PROFILE_IMAGE" | "THUMBNAIL_IMAGE"
): Promise<ApiResponse<any>> => {
  const response = await $api.put(
    `/api/v1/career-profile/${careerId}/image/${imageAttachmentId}`,
    null,
    { params: { type } }
  );
  return response.data;
};

const updateCareerProfileSummary = async (
  careerId: number,
  summary: string,
  title: string
): Promise<ApiResponse<any>> => {
  const response = await $api.put(
    `/api/v1/career-profile/update-summary/${careerId}`,
    { summary, title }
  );
  return response.data;
};

const updateCareerProfileSkills = async (
  careerId: number,
  data: { title: string; skills: string[] }
): Promise<ApiResponse<any>> => {
  const response = await $api.put(`/api/v1/career-profile/${careerId}`, data);
  return response.data;
};

const updateCareerProfileLanguages = async (
  careerId: number,
  data: { title: string; items: { id: number; title: string; level: string; priority: number }[] }
): Promise<ApiResponse<any>> => {
  const response = await $api.put(
    `/api/v1/career-profile/update-languages/${careerId}`,
    data
  );
  return response.data;
};

const updateCareerProfileExperience = async (
  careerId: number,
  data: {
    title: string;
    items: {
      id: number;
      jobTitle: string;
      companyName: string;
      startDate: string;
      endDate: string;
      priority: number;
      description: string;
      currentJob: boolean;
    }[];
  }
): Promise<ApiResponse<any>> => {
  const response = await $api.put(
    `/api/v1/career-profile/update-experience/${careerId}`,
    data
  );
  return response.data;
};

const updateCareerProfileEducation = async (
  careerId: number,
  data: {
    title: string;
    items: {
      id: number;
      title: string;
      degree: string;
      startDate: string;
      endDate: string;
      city: string;
      description: string;
      priority: number;
      currentStudy: boolean;
    }[];
  }
): Promise<ApiResponse<any>> => {
  const response = await $api.put(
    `/api/v1/career-profile/update-education/${careerId}`,
    data
  );
  return response.data;
};

const updateCareerProfileContact = async (
  careerId: number,
  data: {
    title: string;
    phoneNumber: string;
    location: string;
    website: string;
    websiteLink: string;
    websiteOrWebsiteLinkProvided: boolean;
  }
): Promise<ApiResponse<any>> => {
  const response = await $api.put(
    `/api/v1/career-profile/update-contact/${careerId}`,
    data
  );
  return response.data;
};

export {
  getCareerProfile,
  getMyResumesForCareerProfile,
  updateCareerProfileImage,
  updateCareerProfileSummary,
  updateCareerProfileSkills,
  updateCareerProfileLanguages,
  updateCareerProfileExperience,
  updateCareerProfileEducation,
  updateCareerProfileContact
};
