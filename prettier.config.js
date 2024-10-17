/** @type {import("prettier").Config} */
export default {
    plugins: ['prettier-plugin-astro', '@trivago/prettier-plugin-sort-imports'],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],
    printWidth: 100,
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    jsxSingleQuote: true,
    bracketSameLine: false,
    singleAttributePerLine: true,
    importOrder: [
        '.*\\.(css|scss)$',
        '.*\\.astro$',
        '^react$',
        '^@?\\w',
        '^(?!@/types)(@/|.)',
        '^@/types',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
}
