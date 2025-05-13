<template>
    <div>
        <h1 class="text-3xl font-bold underline">
            Post Detail
        </h1>

        <div>
            <h2 class="text-2xl font-bold">{{ data?.title }}</h2>
            <p>{{ data?.body }}</p>

        </div>
    </div>
</template>

<script setup lang="ts">
import type { PostProps } from '~/types';

const props = defineProps({
    data: Object as () => PostProps
})
</script>