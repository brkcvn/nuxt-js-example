// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintPluginNuxt from '@nuxt/eslint-plugin';

export default withNuxt({
    files: ['**/*.js', '**/*.ts', '**/*.vue'],
    rules: {
        'vue/multi-word-component-names': 'off',
        // @ts-ignore
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
    plugins: {
        nuxt: eslintPluginNuxt,
        prettier: prettierPlugin,
    },
});
