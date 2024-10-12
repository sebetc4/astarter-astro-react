import eslint from '@eslint/js'
import astroParser from 'astro-eslint-parser'
import prettier from 'eslint-config-prettier'
import eslintPluginAstro from 'eslint-plugin-astro'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tseslint.parser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier: eslintPluginPrettier,
        },
        rules: {
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            ...reactHooks.configs.recommended.rules,
            ...eslintPluginPrettier.configs.recommended.rules,
            'prettier/prettier': 'error',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        files: ['**/*.astro'],
        languageOptions: {
            parser: astroParser,
            parserOptions: {
                parser: '@typescript-eslint/parser',
                extraFileExtensions: ['.astro'],
            },
        },
        plugins: {
            astro: eslintPluginAstro,
            prettier: eslintPluginPrettier,
        },
        rules: {
            ...eslintPluginAstro.configs.recommended.rules,
            ...eslintPluginPrettier.configs.recommended.rules,
            'prettier/prettier': 'error',
        },
    },
    {
        ignores: ['dist/**', '.astro/**'],
    },
    prettier,
]
