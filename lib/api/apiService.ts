import axios from 'axios';
import { getApiUrl } from './index';
import { API_ROUTES } from './endpoints';

export const fetchData = async (route: string, queryParams = {}) => {
    try {
        const url = getApiUrl(route, queryParams);
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${route}:`, error);
        throw error;
    }
};

export const apiService = {
    fetchUsers: () => fetchData(API_ROUTES.USERS),

    fetchUserTodos: (userId: number) => fetchData(API_ROUTES.TODOS, { userId }),

    fetchUserPosts: (userId: number) => fetchData(API_ROUTES.POSTS, { userId }),

    fetchPostComments: (postId: number) => fetchData(API_ROUTES.COMMENTS, { postId }),

    fetchUserAlbums: (userId: number) => fetchData(API_ROUTES.ALBUMS, { userId })
};