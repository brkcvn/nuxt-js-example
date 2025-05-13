<template>
    <Post v-if="post" :data="post" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useFetch } from 'nuxt/app';
import { ref } from 'vue';
import Post from '@/components/Post.vue';
import type { PostProps } from '~/types';

definePageMeta({
    layout: 'custom',
    middleware: ['posts'],
})

const route = useRoute();
const userId = route.params.id;

const { data } = await useFetch(
    `/api/posts/${userId}`,
    {
        key: `user-albums-${userId}`,
        server: true,
        lazy: false
    }
);
const post = ref<PostProps | null>(null);
if (data.value) {
    post.value = data.value as PostProps;
}
</script>