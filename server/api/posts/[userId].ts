import { defineEventHandler } from 'h3';
import { $fetch } from 'ofetch';

export default defineEventHandler(async (event) => {
    const { userId } = event.context.params!;

    try {
        const response = await $fetch(
            `https://jsonplaceholder.typicode.com/posts/${userId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        return response;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return {
            statusCode: 500,
            body: {
                message: error,
            },
        };
    }
});
