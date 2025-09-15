interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PageApiRespone<T> {
  success: boolean;
  message: string;
  data: T;
  page: number,
  size: number,
  total: number,
  last: boolean
}

export default ApiResponse;