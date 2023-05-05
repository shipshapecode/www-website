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
    // This plugin is incompatible with the Tailwind one, so disabling for now.
    // require('@trivago/prettier-plugin-sort-imports'),
    // require('prettier-plugin-tailwindcss'),
  ],
};
