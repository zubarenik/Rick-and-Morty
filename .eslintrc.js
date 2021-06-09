module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-trailing-spaces': "off",
    'indent': 'off',
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
    'semi': 'off',
    'vue/no-unused-components': 'off'
  }
}
