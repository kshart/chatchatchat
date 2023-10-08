module.exports = {
  overrides: [
    {
      files: ['*.js', '*.ts'],
      extends: 'standard-with-typescript',
      rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'comma-dangle': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/comma-dangle': 'off',
      }
    }
  ],
}
