import $api from "@/api/request";
import ApiResponse from "@/types/ApiResponse";

const BASE_FILE_URL: string = "/api/v1/attachment";

const uploadFile = async (file: File | Blob): Promise<number> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await $api.post<ApiResponse<number>>(
    `${BASE_FILE_URL}/upload`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return response.data.data;
};

const uploadFiles = async (files: File[]): Promise<number[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const response = await $api.post<ApiResponse<number[]>>(
    `${BASE_FILE_URL}/uploads`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  return response.data.data;
};

const deleteById = async (id: number): Promise<void> => {
  await $api.delete(`${BASE_FILE_URL}/${id}`);
};

export { uploadFile, uploadFiles, deleteById };
