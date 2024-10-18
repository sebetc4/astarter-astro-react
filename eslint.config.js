import eslint from '@eslint/js'
import astroParser from 'astro-eslint-parser'
import prettier from 'eslint-config-prettier'
import eslintPluginAstro from 'eslint-plugin-astro'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const commonRules = {
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-unused-vars': [
        'warn',
        {
            vars: 'all',
            args: 'all',
            ignoreRestSiblings: false,
            argsIgnorePattern: '^_',
        },
    ],
}

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
            },
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            react: eslintPluginReact,
            'react-hooks': eslintPluginReactHooks,
            'react-refresh': eslintPluginReactRefresh,
            prettier: eslintPluginPrettier,
        },
        rules: {
            ...eslintPluginReact.configs.recommended.rules,
            ...eslintPluginReactHooks.configs.recommended.rules,
            ...eslintPluginPrettier.configs.recommended.rules,
            ...commonRules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react-hooks/exhaustive-deps': 'warn',
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {},
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
            ...commonRules,
            'astro/no-set-html-directive': 'error',
        },
    },
    {
        ignores: ['dist/**', '.astro/**', 'node_modules/**'],
    },
    prettier,
]
