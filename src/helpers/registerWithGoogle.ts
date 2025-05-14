import { GITHUB_REGISTER_URL, GOOGLE_REGISTER_URL } from "@/constants/url";

const registerWithGoogle = () => {
    window.location.href = GOOGLE_REGISTER_URL;
}

const registerWithGithub = () => {
    window.location.href = GITHUB_REGISTER_URL;
}

export { registerWithGoogle, registerWithGithub };
