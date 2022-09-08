module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    //关闭空死个空两格
    'indent': 'off',
    //关闭代码最后要空一行
    'eol-last': 'off',
    //关闭最后的括号等后面不需要逗号
    'comma-dangle': 'off',
    //关闭函数括号后加空格
    'space-before-function-paren': 'off',
    //关闭   空格
    'no-trailing-spaces': 'off',
    //关闭最多空一行
    'no-multiple-empty-lines': 'off',
    //关闭注释后空一格
    'spaced-comment': 'off',
    //关闭代码最后一行不能是空行
    'padded-blocks': 'off',
    'no-unused-vars': 'off',
    'quotes': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
