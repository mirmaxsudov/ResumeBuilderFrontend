const isValidUrl = (url: string): boolean => /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i.test(url);
export default isValidUrl;