const validatePassword = (password: string) => {
    return password.length >= 8;
};

export default validatePassword;