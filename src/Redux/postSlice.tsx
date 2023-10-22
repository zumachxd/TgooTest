import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts, fetchPostsByTitle } from '../API/API'; 
import { Post } from '../interfaces/Interface';

interface PostsState {
    data: Post[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    selectedPostId: null,
}

const initialState: PostsState = {
    data: [],
    loading: 'idle',
    error: null,
    selectedPostId: null,
};

export const fetchPostsAsync = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const postsData = await fetchPosts();
        return postsData;
    } catch (error) {
        throw error;
    }
});

export const fetchPostsByTitleAsync = createAsyncThunk('posts/fetchPostsByTitle', async (title: string) => {
    try {
        const postsData = await fetchPostsByTitle(title);
        return postsData;
    } catch (error) {
        throw error;
    }
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setSelectedPostId: (state, action) => {
            state.selectedPostId = action.payload;
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(fetchPostsAsync.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchPostsAsync.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchPostsAsync.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message || 'Erro ao buscar postagens';
            })
            .addCase(fetchPostsByTitleAsync.pending, (state) => { 
                state.loading = 'pending';
            })
            .addCase(fetchPostsByTitleAsync.fulfilled, (state, action) => { 
                state.loading = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchPostsByTitleAsync.rejected, (state, action) => { 
                state.loading = 'failed';
                state.error = action.error.message || 'Erro ao buscar postagens por título';
            });
    },
});

export const selectPosts = (state: { posts: PostsState }) => state.posts;
export const { setSelectedPostId } = postsSlice.actions;
export const selectLoading = (state: { posts: PostsState }) => state.posts.loading;
export default postsSlice.reducer;
