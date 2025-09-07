import { ReadonlyURLSearchParams } from "next/navigation";

export const createQuery = (name: string, val: string, searchParams: ReadonlyURLSearchParams) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, val);
    return params.toString();
}