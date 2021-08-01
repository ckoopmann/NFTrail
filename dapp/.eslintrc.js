module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"], // @vue/prettier
  parserOptions: {
    parser: "babel-eslint",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".d.ts", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src"],
      },
    },
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-mixed-spaces-and-tabs": 0,
    "for-direction": 0,
  },
};
