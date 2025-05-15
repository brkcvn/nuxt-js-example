<template>
    <div class="container mx-auto px-4 py-8">
        <div v-if="post" class="bg-white rounded-lg shadow-md p-6 mb-8">
            <Post :data="post" />
        </div>
        <p class="text-lg text-gray-700 mb-4">{{ formatCurrency(1345) }}</p>
        <p class="text-3xl font-bold text-center text-indigo-600 my-6">
            {{ t('welcome') }}
        </p>
    </div>
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
    });

    const { t } = useI18n();

    const route = useRoute();
    const userId = route.params.id;

    const { data } = await useFetch(`/api/posts/${userId}`, {
        key: `user-albums-${userId}`,
        server: true,
        lazy: false,
    });
    const post = ref<PostProps | null>(null);
    if (data.value) {
        post.value = data.value as PostProps;
    }
</script>
