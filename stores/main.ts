// stores/main.ts
import { defineStore } from 'pinia';
import type { StateProps } from '@/types';
import { apiService } from '~/lib/api/apiService';

const TODO_UPDATES_KEY = 'user_todo_updates';
function getStoredTodoUpdates(): Record<number, boolean> {
    const stored = localStorage.getItem(TODO_UPDATES_KEY);
    return stored ? JSON.parse(stored) : {};
}
function saveTodoUpdates(todoId: number, completed: boolean) {
    const updates = getStoredTodoUpdates();
    updates[todoId] = completed;
    localStorage.setItem(TODO_UPDATES_KEY, JSON.stringify(updates));
}

export const useMainStore = defineStore('main', {
    state: (): StateProps => ({
        users: [],
        userTodos: [],
        userPosts: [],
        userComments: [],
        userAlbums: [],
        error: null,
    }),

    getters: {
        getUsers(state) {
            return state.users.map((user, index) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatar: `assets/images/user-${(user.id % 3 || index % 2) + 1}.png`,
                location: user.address
                    ? `${user.address.street}\n${user.address.city}`
                    : 'No address',
                company: user.company ? user.company.name : 'No company',
                website: user.website,
            }));
        },
        getUserTodos(state) {
            const todoUpdates = getStoredTodoUpdates();
            return state.userTodos.map((todo) => {
                const completed =
                    todo.id in todoUpdates
                        ? todoUpdates[todo.id]
                        : todo.completed;
                return { ...todo, completed };
            });
        },
        getUserPosts(state) {
            return state.userPosts;
        },
        getUserComments(state) {
            return state.userComments.map((comment, index) => ({
                ...comment,
                avatar: `assets/images/user-${(comment.id % 3 || index % 2) + 1}.png`,
            }));
        },
        getUserAlbums(state) {
            return state.userAlbums.map((album) => {
                const images: string[] = [];
                for (let i = 0; i < 6; i++) {
                    images.push(`assets/albums/album-${i + 1}.jpg`);
                }
                return { ...album, images };
            });
        },
        getError(state) {
            return state.error;
        },
    },

    actions: {
        async fetchData<T>(
            apiMethod: () => Promise<T>,
            stateKey: keyof StateProps,
            errorMessage: string,
        ) {
            try {
                this.error = null;
                const data = await apiMethod();
                // @ts-expect-error: This assignment is safe because we know the type of data
                this[stateKey] = data;
                return data;
            } catch (err) {
                this.error = errorMessage;
                console.error(errorMessage, err);
            }
        },

        fetchUsers() {
            return this.fetchData(
                apiService.fetchUsers,
                'users',
                'Failed to fetch users',
            );
        },
        fetchUserTodosByUserId(userId: number) {
            return this.fetchData(
                () => apiService.fetchUserTodos(userId),
                'userTodos',
                'Failed to fetch user todos',
            );
        },
        fetchUserPostsByUserId(userId: number) {
            return this.fetchData(
                () => apiService.fetchUserPosts(userId),
                'userPosts',
                'Failed to fetch user posts',
            );
        },
        fetchCommentsByPostId(postId: number) {
            return this.fetchData(
                () => apiService.fetchPostComments(postId),
                'userComments',
                'Failed to fetch comments',
            );
        },
        fetchUserAlbumsByUserId(userId: number) {
            return this.fetchData(
                () => apiService.fetchUserAlbums(userId),
                'userAlbums',
                'Failed to fetch user albums',
            );
        },

        toggleTodoStatus(todoId: number) {
            const idx = this.userTodos.findIndex((t) => t.id === todoId);
            if (idx !== -1) {
                const newStatus = !this.userTodos[idx].completed;
                saveTodoUpdates(todoId, newStatus);
                this.userTodos[idx].completed = newStatus;
            }
        },
    },
});
