module.exports = {
  importOrder: [
    '^react(.*)$',
    '^next(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  singleQuote: true,
  plugins: [
    require('@trivago/prettier-plugin-sort-imports'),
    'prettier-plugin-tailwindcss',
  ],
};
