import { APIResponse, Comment } from '@/types';
import { axiosInstance } from './axiosInstance';

interface CreateCommentBody {
  content: string;
  productId: string;
  rating: number;
}

export const commentApi = {
  create: (body: CreateCommentBody) => axiosInstance.post('/comments', body),
  get: (productId: string) =>
    axiosInstance.get<APIResponse<{ comments: Comment[] }>>(
      `/comments?productId=${productId}`
    )
};
