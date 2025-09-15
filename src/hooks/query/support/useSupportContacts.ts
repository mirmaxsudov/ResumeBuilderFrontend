import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SupportContactApis from "@/api/requests/support/contact.api";
import { ContactMessageResponse, ContactResponseType } from "@/types/support/contactType";
import { PageApiRespone } from "@/types/ApiResponse";

export function useSupportContacts(page: number, size: number, query: string, search: string) {
  return useQuery<PageApiRespone<ContactResponseType[]>>({
    queryKey: ["support-contacts", { page, size, query, search }],
    queryFn: () => SupportContactApis.getAll(page, size, query, search),
    // keepPreviousData: true,
  });
}

export function useContactMessages(id: number | undefined, page: number, size: number) {
  return useQuery<PageApiRespone<ContactMessageResponse[]>>({
    queryKey: ["contact-messages", { id, page, size }],
    queryFn: () => SupportContactApis.getMessagesByContactId(page, size, id as number),
    enabled: !!id,
    select: (data) => data,
    // keepPreviousData: true,
  });
}

export function useAnswerContact(id: number | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["answer-contact", id],
    mutationFn: (answer: string) => SupportContactApis.answerContact(id as number, answer),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["contact-messages", { id }] });
    },
  });
}

