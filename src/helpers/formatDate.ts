const formatDate = (date: Date): string => {
    const now = new Date().getTime();
    const diffInSeconds = Math.floor((now - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        const seconds = diffInSeconds;
        return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        const minutes = diffInMinutes;
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        const hours = diffInHours;
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        const days = diffInDays;
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        const months = diffInMonths;
        return `${months} month${months !== 1 ? 's' : ''} ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    const years = diffInYears;
    return `${years} year${years !== 1 ? 's' : ''} ago`;
};

export default formatDate;