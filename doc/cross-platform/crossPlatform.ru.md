# 🧭 Руководство по кроссплатформенной совместимости

> ⚠️ Важно: Linux чувствителен к регистру имён файлов, а Windows — нет.

## 💥 Проблема

Если файл называется `localStorage.js`, но импортируется как `localstorage.js`, это работает на Windows, но **ломается** в Linux.

---

## ✅ Легковесные исправления для разработчиков на разных ОС

### 1. ESLint правила

Мы используем `eslint-plugin-import` для ловли проблем с путями и регистром файлов на ранней стадии.

```bash
npm install eslint-plugin-import --save-dev
```

**В `eslint.config.js`:**
```js
"import/no-unresolved": ["error", { ignore: ["^@tailwindcss/vite$"] }],
"import/no-case-sensitive-paths": "error",
"import/extensions": ["error", "ignorePackages", { js: "never", jsx: "never" }]
```

### 2. Настройка VS Code

```json
{
  "eslint.validate": ["javascript", "javascriptreact"],
  "eslint.experimental.useFlatConfig": true,
  "eslint.workingDirectories": [{ "mode": "auto" }],
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

### 💡 Git подсказка (для Linux/macOS)

Переименовывайте файлы через Git:

```bash
git mv localstorage.js LocalStorage.js
```

---

## 🚀 Итого

| Что | Решение |
|-----|---------|
| Регистр в путях | `import/no-case-sensitive-paths` |
| Разрешение путей | `import/no-unresolved` |
| Единая настройка редактора | `.vscode/settings.json` |
| Безопасные коммиты | `npm run lint` перед коммитом |
