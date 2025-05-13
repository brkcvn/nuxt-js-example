import { defineEventHandler, setCookie } from 'h3';
import { $fetch } from 'ofetch';

export default defineEventHandler(async (event) => {
    const { userId } = event.context.params!;
    const token = '1234567890abcdef';

    try {
        const response = await $fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        setCookie(event, 'token', token, {
            secure: true,
            maxAge: 60 * 60 * 24 * 1,
            sameSite: 'strict',
            path: '/'
        });

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
})
