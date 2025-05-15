<template>
    <div class="container mx-auto px-4 py-8">
        <div class="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
            <p class="text-xl text-indigo-700 font-semibold">Albums</p>
        </div>

        <div class="mt-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Albums</h2>
            <ul
                v-if="userAlbums"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <li
                    v-for="album in userAlbums"
                    :key="album.id"
                    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                    <NuxtImg
                        :src="album.images[0]"
                        :alt="album.title"
                        width="400"
                        height="300"
                        class="w-full h-48 object-cover"
                    />
                    <div class="p-4">
                        <NuxtLink
                            :to="`/albums/${album.id}`"
                            class="text-indigo-600 hover:text-indigo-800 font-medium block hover:underline"
                        >
                            {{ album.title }}
                        </NuxtLink>
                    </div>
                </li>
            </ul>
            <div v-else class="flex justify-center items-center h-48">
                <p class="text-gray-500">Loading albums...</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useMainStore } from '~/stores/main';
    import { onMounted, computed } from 'vue';
    import { useRoute } from 'vue-router';

    const store = useMainStore();
    const userAlbums = computed(() => store.getUserAlbums);

    const route = useRoute();
    const id = route.params.id as string;

    onMounted(async () => {
        const userId = Number(id);
        if (!isNaN(userId)) {
            await store.fetchUserAlbumsByUserId(userId);

            const cookie = useCookie('token', {
                maxAge: 60 * 60 * 24 * 1,
                sameSite: 'strict',
                secure: true,
            });
            cookie.value = `albumId=${userId}`;
        } else {
            console.error('Invalid user ID:', id);
        }
    });
</script>
