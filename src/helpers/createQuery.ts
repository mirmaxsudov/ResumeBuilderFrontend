export const createQuery = (name: string, val: string, searchParams) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, val);

    return params.toString();
}