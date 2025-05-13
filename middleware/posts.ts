export default defineNuxtRouteMiddleware(async (to) => {
    // Added static check for demonstration purposes
    if (Number(to.params.id) > 100) {
        return abortNavigation(new Error('Post not found. Please check the ID.'));
    }
});