<template>
    <div class="min-h-screen bg-gray-50">
        <header class="bg-indigo-700 text-white py-6 shadow-md">
            <div class="container mx-auto px-4">
                <h1 class="text-3xl font-bold">Custom Layout</h1>
            </div>
        </header>

        <div class="container mx-auto px-4 py-8">
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    Custom Layout
                </h2>
                <p class="text-gray-700">This is a custom layout.</p>
            </div>

            <main class="bg-white rounded-lg shadow-md p-6">
                <slot />
            </main>
        </div>

        <footer class="bg-gray-800 text-white py-6 mt-12">
            <div class="container mx-auto px-4 text-center">
                <p>&copy; 2025 My Nuxt Application</p>
            </div>
        </footer>
    </div>
</template>
