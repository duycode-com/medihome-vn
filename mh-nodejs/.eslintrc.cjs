module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'airbnb-typescript/base',
    ],
    plugins: ['@typescript-eslint'],
    parserOptions: {
        project: ['./tsconfig.json'],
    },
    rules: {
        'no-console': 0,
        'no-tabs': 0, // không sử dụng tab
        'max-len': [2, { code: 120 }], // Chiều dài tối đa
        'semi': [2, "never"],
        "@typescript-eslint/semi": [2, "never"],
        'no-unused-vars': 0, // khai báo biến mà không sử dụng sẽ lỗi
        '@typescript-eslint/no-unused-vars': 0,
        'indent': ['error', 'tab'], // thụt lề bằng tab
        '@typescript-eslint/indent': ['error', 'tab'],
        'quotes': [2, "single"],
        '@typescript-eslint/quotes': [2, "single"],
        'object-curly-newline': [1, { // quy tắc xuống dòng của object
            ObjectExpression: { multiline: true },
            ObjectPattern: { multiline: true },
            ImportDeclaration: { multiline: true },
            ExportDeclaration: { multiline: true }
        }],
        'quote-props': [2, 'consistent-as-needed'], // dấú quote ở key của object -> dùng 1 cách nhất quán
        '@typescript-eslint/no-explicit-any': 0, // không cho dùng type any
        'class-methods-use-this': 0, // bắt buộc phải có 'this' trong thân hàm của class, nếu không hàm đấy phải là hàm static, vc chưa
        'prefer-template': 0, // Bắt buộc dùng template string khi cộng chuỗi, vcc
        'no-useless-concat': 0, // Bắt buộc viết 1 chuỗi, ko để dạng cộng 2 chuỗi, vcc
        'max-classes-per-file': 0, // lỗi tối đa 1 class trong 1 file
        'no-underscore-dangle': 0, // lỗi không được sử dụng ký tự _
        'import/prefer-default-export': 0, // Nếu export 1 biến thì mặc định phải là default, vcc

        // '@typescript-eslint/no-empty-interface': 0, // class interface không được để trống :()
        // '@typescript-eslint/no-empty-function': 0, // hàm phải có thân hàm
        // 'import/no-cycle': 0, // lỗi A import B, B import A ==> vẫn cần thiết phải sử dụng khi dùng entity
    },
}
