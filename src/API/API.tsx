import axios, { AxiosResponse } from 'axios';
import { Post, PostData } from '../interfaces/Interface';

const baseURL = 'https://gracious-elgamal.173-249-10-142.plesk.page/api';

const api = axios.create({
  baseURL,
  headers: {
    'Api-Authorization': 'Bearer $2y$10$x3wqNWc4ZonF6dVWKAPnMuU1A258mgKbGWziVPdL5mhzqQwlhQEqK',
    'Authorization': 'Bearer 35|bkdTKk4t5WoNeApCMkVwWLBhmkjtarmeULMfwKiW'
  },
});


export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response: AxiosResponse = await api.get('/posts?paginated=true');
    if (response.status === 200) {
      return response.data.data.data;
    }
    throw new Error('Erro ao buscar as postagens da API');
  } catch (error) {
    throw error;
  }
};

export const createPost = async (postData: any) => {
  try {
    const response = await api.post('/posts', postData);
    console.log(response.status)

  } catch (error) {
    throw error
  }
};

export const deletePost = async (postId: any) => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    console.log(response.status)
  } catch (error) {
    throw error;
  }
};

export const fetchPostsByTitle = async (title: string): Promise<Post[]> => {
  try {
    const response: AxiosResponse = await api.get(`/posts?title=${title}&paginated=true`);
    if (response.status === 200) {
      return response.data.data.data;
    }
    throw new Error('Erro ao buscar as postagens da API');
  } catch (error) {
    throw error;
  }
};

export const fetchPostById = async (postId: number): Promise<PostData> => {
  try {
    const response: AxiosResponse = await api.get(`/posts/${postId}`);
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error('Erro ao buscar a postagem da API por ID');
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (postId: number, postData: PostData) => {
  try {
    const response = await api.put(`/posts/${postId}`, postData);
    if (response.status === 200) {
      console.log('Post atualizado com sucesso!');
    }
  } catch (error) {
    throw error;
  }
};
