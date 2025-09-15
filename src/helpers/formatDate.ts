const formatDate = (date: Date): string => {
    if (!date)
        return "Never"

    const now = new Date().getTime();
    const diffInSeconds = Math.floor((now - new Date(date).getTime()) / 1000);

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

export const formatDateWithoutHour = (date: Date | string) => {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(typeof date === "string" ? new Date(date) : date);
}

export default formatDate;