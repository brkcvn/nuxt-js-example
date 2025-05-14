<template>
    <div>
        <h2>{{ error?.statusCode }} - {{ error?.message }}</h2>
        <button @click="handleError">Clear errors</button>
    </div>
</template>

<script setup lang="ts">
    import type { NuxtError } from '#app';

    defineProps({
        error: {
            type: Object as () => NuxtError,
            default: () => ({}),
        },
    });

    const handleError = () => clearError({ redirect: '/' });
</script>
