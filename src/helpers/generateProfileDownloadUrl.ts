import BASE_URL, { DOWNLOAD_CAREER_IMAGE_END_URL, DOWNLOAD_CAREER_IMAGE_START_URL } from "@/constants/url"

export const generateProfileDownloadUrl = (id: number, type: string = "PROFILE_IMAGE") => BASE_URL + DOWNLOAD_CAREER_IMAGE_START_URL + id + DOWNLOAD_CAREER_IMAGE_END_URL + "?type=" + type;