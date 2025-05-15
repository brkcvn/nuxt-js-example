<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl italic font-light text-indigo-700 mb-6">
            Hello world!
        </h1>
        <div class="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
            <p class="text-gray-700">About page</p>
        </div>

        <ArrowRight class="has-stroke stroke-red-600 w-16 h-16 my-4" />

        <div class="my-8 bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Users</h2>
            <ul class="divide-y divide-gray-200">
                <li
                    v-for="user in aboutUsers"
                    :key="user.id"
                    class="py-3 hover:bg-gray-50 px-2 rounded transition-colors"
                >
                    <span class="font-medium">{{ user.name }}</span> -
                    <span class="text-gray-600">{{ user.email }}</span>
                </li>
            </ul>
        </div>

        <p class="text-3xl font-bold text-center text-indigo-600 my-6">
            {{ t('welcome') }}
        </p>

        <div class="flex space-x-4 justify-center mb-8">
            <div
                class="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                @click="handleSelectedLang('en')"
            >
                EN
            </div>
            <div
                class="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                @click="handleSelectedLang('nl')"
            >
                NL
            </div>
        </div>

        <Form
            :validation-schema="schema"
            class="space-y-5 lg:max-w-2xl my-6 mx-auto bg-white p-6 rounded-lg shadow-lg"
            @submit="onSubmit"
        >
            <div>
                <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Email</label
                >
                <Field
                    id="email"
                    name="email"
                    type="email"
                    as="input"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage name="email" class="text-sm text-red-500 mt-1" />
            </div>

            <div>
                <label
                    for="password"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Şifre</label
                >
                <Field
                    id="password"
                    name="password"
                    type="password"
                    as="input"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                    name="password"
                    class="text-sm text-red-500 mt-1"
                />
            </div>

            <button
                type="submit"
                class="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
            >
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
    import { ArrowRight } from '~/components/Icons';

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
            email: yup
                .string()
                .email('Email is incorrect')
                .required('Email is required'),
            password: yup
                .string()
                .min(6, 'Password should be at least 6 charachteers')
                .required('Password is required'),
        }),
    );

    const onSubmit = () => {
        console.log('Form submitted');
    };

    function handleSelectedLang(lang: LangType) {
        selectedLang.value = lang;
        setLocale(lang);
    }
</script>
