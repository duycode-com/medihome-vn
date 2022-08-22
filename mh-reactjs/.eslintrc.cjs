module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'react-hooks/rules-of-hooks': 2, // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 1, // Checks effect dependencies
    'import/prefer-default-export': 0, // Nếu export 1 biến thì mặc định phải là default, vcc
    'no-console': 0, // dùng console.log
    'no-unused-vars': 0, // khai báo biến mà không sử dụng
    'semi': [1, 'never'], // dấu ; cuối dòng
    'max-len': [2, { code: 120 }], // Chiều dài tối đa
    'indent': ['error', 2],
    'object-curly-newline': [1, { // quy tắc xuống dòng của object
      ObjectExpression: { multiline: true },
      ObjectPattern: { multiline: true },
      ImportDeclaration: { multiline: true },
      ExportDeclaration: { multiline: true }
    }],
    'no-underscore-dangle': 0, // dùng dấu gạch dưới _
    '@typescript-eslint/indent': 2,
    'quote-props': [2, 'consistent-as-needed'], // dấú quote ở key của object -> dùng 1 cách nhất quán
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/semi': [1, 'never']
  }
}
