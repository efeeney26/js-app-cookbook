module.exports = {
    root: true,
    env: {
        node: true,
        browser: true
    },
    plugins: [
        '@typescript-eslint',
        '@emotion'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    extends: [
        "airbnb",
        "airbnb-typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    rules: {
        indent: ['warn', 4],
        'react/jsx-indent': ['warn', 4],
        'react/jsx-indent-props': ['warn', 4],
        '@typescript-eslint/indent': ['warn', 4],
        'comma-dangle': 'off',
        '@typescript-eslint/comma-dangle': 0,
        semi: ['warn', 'never'],
        '@typescript-eslint/semi': ['warn', 'never'],
        'react/jsx-wrap-multilines': ['warn', {
            declaration: true,
            assignment: true,
            return: true
        }],
        'jsx-quotes': ['warn', 'prefer-double'],
        'react/jsx-curly-newline': 'off',
        'operator-linebreak': 'off',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'default',
                format: [
                    'camelCase',
                    'strictCamelCase',
                    'PascalCase',
                    'StrictPascalCase',
                    'snake_case',
                    'UPPER_CASE',
                ],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow',
            },
        ],
        'no-console': 'off',
        'no-trailing-spaces': 'off',
        'import/prefer-default-export': 'off',
        'react/require-default-props': 'off'
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: [
                    '.mjs',
                    '.js',
                    '.jsx',
                    '.json',
                    '.ts',
                    '.tsx',
                    '.d.ts',
                ],
            },
        },
    },
}
