import CoverLetterApi from "@/api/requests/cover-letter/coverLetterApi";
import { useQuery } from "@tanstack/react-query";
import { CoverLetterResponseType } from "@/types/coverLetter/CoverLetterType";

type CoverLettersData = {
  coverLetters: CoverLetterResponseType[];
  page: number;
  size: number;
  total: number;
};

export const useCoverLetters = (size: number, page: number, search: string) => {
  return useQuery({
    queryKey: ["cover-letters", size, page, search],
    queryFn: () => CoverLetterApi.getAll(size, page, search),
    select: (res) => res.data as CoverLettersData,
    keepPreviousData: true,
  });
};
