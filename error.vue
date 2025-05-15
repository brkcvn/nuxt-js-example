<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div
            class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center"
        >
            <h2 class="text-2xl font-bold text-red-600 mb-4">
                {{ error?.statusCode }} - {{ error?.message }}
            </h2>
            <p class="text-gray-600 mb-6">
                Bir hata oluştu. Ana sayfaya dönmek için aşağıdaki butona
                tıklayabilirsiniz.
            </p>
            <button
                :class="
                    clsx(
                        'bg-indigo-600 text-white px-6 py-2',
                        'rounded-md hover:bg-indigo-700 transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                    )
                "
                @click="handleError"
            >
                Ana Sayfaya Dön
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { NuxtError } from '#app';
    import clsx from 'clsx';

    defineProps({
        error: {
            type: Object as () => NuxtError,
            default: () => ({}),
        },
    });

    const handleError = () => clearError({ redirect: '/' });
</script>
