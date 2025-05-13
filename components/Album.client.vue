<template>
      <div>
        <div>
            <p>Albums</p>
        </div>

        <div>
            <h2 class="text-2xl font-bold">Albums</h2>
            <ul class="space-y-2">
                <li v-for="album in userAlbums" :key="album.id">
                    <NuxtLink :to="`/albums/${album.id}`">
                        {{ album.title }}
                    </NuxtLink>
                    <NuxtImg :src="album.images[0]" :alt="album.title" width="400" height="300" />
                </li>
            </ul>
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
        } else {
            console.error('Invalid user ID:', id);
        }
    });
</script>