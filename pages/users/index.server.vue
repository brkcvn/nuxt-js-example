<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-indigo-700 underline mb-6">
            Hello world!
        </h1>
        <div class="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
            <p class="text-gray-700">Users static page</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    useSeoMeta({
        title: 'My Amazing Site',
        ogTitle: 'My Amazing Site',
        description: 'This is my amazing site, let me tell you all about it.',
        ogDescription: 'This is my amazing site, let me tell you all about it.',
        ogImage: 'https://example.com/image.png',
        twitterCard: 'summary_large_image',
    });
</script>
