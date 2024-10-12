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
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
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
            prettier: eslintPluginPrettier,
        },
        rules: {
            ...eslintPluginPrettier.configs.recommended.rules,
            'prettier/prettier': 'error',
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
