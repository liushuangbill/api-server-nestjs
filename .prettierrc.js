module.exports = {
  printWidth: 80, // 每行最大80字符
  semi: false, // 末尾分号
  singleQuote: false, // 使用单引号
  overrides: [
    {
      files: [
        "*.json",
        ".eslintrc",
        ".tslintrc",
        ".prettierrc",
        ".tern-project"
      ],
      options: {
        parser: "json",
        tabWidth: 2
      }
    },
    {
      files: "*.ts",
      options: {
        parser: "typescript"
      }
    }
  ]
}
