import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import prettier from "eslint-config-prettier";

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,jsx,vue}"]
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**", "**/node_modules/**"]
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],

  {
    name: "custom/vue-rules",
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "never"
          }
        }
      ],
      "vue/html-indent": ["error", 2],
      "vue/max-attributes-per-line": [
        "error",
        {
          singleline: 3,
          multiline: {
            max: 1,
            allowFirstLine: false
          }
        }
      ]
    }
  },

  skipFormatting, // Vyhnutie sa konfliktom medzi ESLint a Prettier
  prettier // Použitie Prettier na formátovanie
];
