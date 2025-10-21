import { type Config } from 'prettier'

const config: Config = {
    trailingComma: 'all',
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    plugins: [
        'prettier-plugin-tailwindcss',
        '@trivago/prettier-plugin-sort-imports',
    ],

    importOrder: [
        '^react$', // React first
        '^react-dom$', // React DOM next
        '<THIRD_PARTY_MODULES>', // All other external libs
        '^[./]', // Relative imports last
    ],
    importOrderSortSpecifiers: true, // sort { a, b, c } alphabetically
    importOrderCaseInsensitive: true, // normalize case when sorting
}

export default config
