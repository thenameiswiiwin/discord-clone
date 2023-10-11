module.exports = {
  extends: [
    'airbnb-base',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: [
        '@typescript-eslint',
        'unused-imports',
        'tailwindcss',
        'simple-import-sort',
      ],
      extends: [
        'plugin:tailwindcss/recommended',
        'airbnb-typescript',
        'next/core-web-vitals',
        'plugin:prettier/recommended',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            endOfLine: 'auto',
          },
        ],
        'react/destructuring-assignment': 'off',
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react-hooks/exhaustive-deps': 'off',
        '@next/next/no-img-element': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/consistent-type-imports': 'error',
        'import/prefer-default-export': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
          },
        ],
        'tailwindcss/no-custom-classname': 'off',
      },
    },
  ],
};
