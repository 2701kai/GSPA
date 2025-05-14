# 🧭 Cross-Platform Compatibility Guide

> ⚠️ Gotcha: Linux is case-sensitive with filenames; Windows is not.

## 💥 Problem

If a file is named `localStorage.js` but imported as `localstorage.js`, it works on Windows but **crashes** on Linux.  
This happens because Linux treats `localStorage.js` and `localstorage.js` as two different files.

---

## ✅ Lightweight Fixes for Cross-Platform Devs

To avoid constant back-and-forth platform issues and keep things frictionless for Windows users:

### 1. ESLint Rules for Case-Sensitive Imports

We use `eslint-plugin-import` to catch import mistakes early, especially:

- Case mismatch (e.g., `App.jsx` vs `app.jsx`)
- Path resolution issues

**Installed in devDependencies:**

```bash
npm install eslint-plugin-import --save-dev
```

**Configured in `eslint.config.js`:**

```js
"import/no-unresolved": ["error", { ignore: ["^@tailwindcss/vite$"] }],
"import/no-case-sensitive-paths": "error",
"import/extensions": [
  "error",
  "ignorePackages",
  { js: "never", jsx: "never" }
]
```

### 2. `.vscode/settings.json` for Editor Integration

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

✅ Recommended: Commit this file so all devs get the same linting behavior in VS Code.

---

## 🧪 Verified ESLint Output

Here’s a sample lint run showing real-world issues caught:

```
CardList.jsx: 'handleOnWatch' is not defined
main.jsx: Unexpected use of file extension "jsx"
movie.jsx: 'error' is defined but never used
serie.jsx: 'error' is defined but never used
vite.config.js: Unable to resolve path to module '@tailwindcss/vite'
```

All except the last were fixed. The last is suppressed for now with a regex ignore.

---

## 💡 Git Tip for Linux/Mac Users

Use Git (not the file explorer) to rename files case-sensitively.  
E.g.:

```bash
git mv localstorage.js LocalStorage.js
```

This ensures Git tracks casing changes that matter on Linux but are invisible to Windows.

---

## 🚀 Summary

| Area                   | Fix                                |
| ---------------------- | ---------------------------------- |
| Case-sensitive imports | `import/no-case-sensitive-paths`   |
| Path resolution        | `import/no-unresolved`             |
| VS Code consistency    | `.vscode/settings.json`            |
| Safe commits           | `npm run lint` before `git commit` |

> ✅ This setup is zero-friction for Windows devs and protects Linux users from runtime crashes.

---

🛠️ Maintained by the team on `kill-cross-platform-dev-trap` branch
