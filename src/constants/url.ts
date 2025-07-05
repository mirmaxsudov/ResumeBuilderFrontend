// const BASE_URL: string = "http://45.138.158.156:8008";
const BASE_URL: string = "http://localhost:8008";
const GET_IMAGE_URL: string = BASE_URL + "/api/v1/attachment/";
const GOOGLE_REGISTER_URL: string = BASE_URL + "/oauth2/authorization/google";
const GITHUB_REGISTER_URL: string = BASE_URL + "/";
const DOWNLOAD_CAREER_IMAGE_START_URL: string = "/api/v1/career-profile/"
const DOWNLOAD_CAREER_IMAGE_END_URL: string = "/profile/download"

export default BASE_URL;
export { GET_IMAGE_URL, GOOGLE_REGISTER_URL, GITHUB_REGISTER_URL, DOWNLOAD_CAREER_IMAGE_START_URL, DOWNLOAD_CAREER_IMAGE_END_URL };