<template>
    <div>
        <h1 class="text-3xl font-bold underline">
            Hello world!
        </h1>
        <div>
            <p>About page</p>
        </div>

        <div>
            <h2 class="text-2xl font-bold">Users</h2>
            <ul>
                <li v-for="user in aboutUsers" :key="user.id">
                    {{ user.name }} - {{ user.email }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '~/stores/main';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import type { UserProps } from '~/types';

const mainStore = useMainStore();
const { users } = storeToRefs(mainStore);

const aboutUsers = ref<UserProps[]>([]);

onMounted(async () => {
    await mainStore.fetchUsers();
    aboutUsers.value = users.value;
});

</script>