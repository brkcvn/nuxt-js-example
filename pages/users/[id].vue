<template>
    <div>
        <h1 class="text-3xl font-bold underline">Hello world!</h1>
        <div>
            <p>Index dynamic {{ id }}</p>
        </div>

        <div>
            <h2 class="text-2xl font-bold">Albums</h2>
            <ul class="space-y-2">
                <li v-for="album in userAlbums" :key="album.id">
                    <NuxtLink :to="`/albums/${album.id}`">
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
