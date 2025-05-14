<template>
    <div>
        <h1 class="text-3xl font-bold underline text-primary">
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

        <p class="text-3xl font-bold">{{ t('welcome') }}</p>

        <div>
            <div @click="handleSelectedLang('en')" class="cursor-pointer">EN</div>
            <div @click="handleSelectedLang('nl')" class="cursor-pointer">NL</div>
        </div>

        <Form @submit="onSubmit" :validation-schema="schema" class="space-y-5 lg:max-w-3xl my-6 mx-auto">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Field name="email" id="email" type="email" as="input"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
                <ErrorMessage name="email" class="text-sm text-red-500 mt-1" />
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                <Field name="password" id="password" type="password" as="input"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
                <ErrorMessage name="password" class="text-sm text-red-500 mt-1" />
            </div>

            <button type="submit" class="w-full font-semibold py-2 px-4 rounded-md transition duration-200">
                Gönder
            </button>
        </Form>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '~/stores/main';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import type { LangType, UserProps } from '~/types';
import { useI18n } from 'vue-i18n';

import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

const mainStore = useMainStore();
const { users } = storeToRefs(mainStore);
const selectedLang = ref('en');

const aboutUsers = ref<UserProps[]>([]);

const { t, setLocale } = useI18n();

onMounted(async () => {
    await mainStore.fetchUsers();
    aboutUsers.value = users.value;
});

const schema = toTypedSchema(
    yup.object({
        email: yup.string().email('Email is incorrect').required('Email is required'),
        password: yup.string().min(6, 'Password should be at least 6 charachteers').required('Password is required'),
    })
);

const onSubmit = (values: any) => {
    debugger;
};

function handleSelectedLang(lang: LangType) {
    selectedLang.value = lang;
    setLocale(lang);
}

</script>