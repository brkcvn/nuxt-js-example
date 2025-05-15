<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-indigo-700 underline mb-6">
            Hello world!
        </h1>
        <div class="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
            <p class="text-gray-700">Index dynamic {{ id }}</p>
        </div>

        <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Albums</h2>
            <ul class="space-y-3">
                <li
                    v-for="album in userAlbums"
                    :key="album.id"
                    class="hover:bg-gray-50 p-2 rounded transition-colors"
                >
                    <NuxtLink
                        :to="`/albums/${album.id}`"
                        class="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        {{ album.title }}
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useMainStore } from '~/stores/main';
    import { storeToRefs } from 'pinia';
    import { onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const mainStore = useMainStore();
    const { userAlbums } = storeToRefs(mainStore);
    const route = useRoute();
    const id = route.params.id as string;

    onMounted(async () => {
        const userId = Number(id);
        if (!isNaN(userId)) {
            await mainStore.fetchUserAlbumsByUserId(userId);
        } else {
            console.error('Invalid user ID:', id);
        }
    });
</script>
