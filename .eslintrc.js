module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/essential',
    // 'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-essential'
  ],
  'overrides': [
  ],
  'parserOptions': {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  'plugins': ['vue', '@typescript-eslint', 'prettier'],
  'rules': {
    indent: ['error', 2],
    'linebreak-style': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'warn',
    'vue/no-multiple-template-root': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/prefer-import-from-vue': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/require-component-is': 'off',
    'vue/no-v-for-template-key': 'off',
    quotes: ['error', 'single'],
    'prettier/prettier': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error']
  },
  globals: { 
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    defineOptions: 'writable'
  }
}