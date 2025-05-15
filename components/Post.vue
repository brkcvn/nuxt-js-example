<template>
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <h1 class="text-3xl font-bold text-indigo-700 underline p-4 bg-gray-50">
            Post Detail
        </h1>

        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">
                {{ data?.title }}
            </h2>
            <p class="text-gray-700 leading-relaxed">{{ data?.body }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { PostProps } from '~/types';

    defineProps({
        data: {
            type: Object as () => PostProps,
            default: () => ({}),
        },
    });
</script>
