import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname
})

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        rules: {
            '@typescript-eslint/no-empty-interface': 'off', // 关闭空接口检查
            '@typescript-eslint/no-unused-vars': 'off', // 关闭未使用变量检查
            '@typescript-eslint/no-require-imports': 'off',
            'no-var': 'off'
        }
    },
    'prettier'
]

export default eslintConfig
