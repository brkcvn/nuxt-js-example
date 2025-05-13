<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
    error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
    <div>
        <h2>
            Users error {{ error?.statusCode }} - {{ error?.statusMessage }}
        </h2>
        <button @click="handleError">Clear errors</button>
    </div>
</template>
