# 🧭 راهنمای سازگاری بین‌سیستمی

> ⚠️ توجه: فایل‌سیستم لینوکس به حروف کوچک/بزرگ حساس است، ولی ویندوز نه.

## 💥 مشکل

اگر فایلی به نام `localStorage.js` باشد ولی به صورت `localstorage.js` ایمپورت شود، در ویندوز اجرا می‌شود ولی در لینوکس **کرش می‌کند**.

---

## ✅ راهکارهای سبک برای توسعه‌دهندگان در سیستم‌های مختلف

### ۱. استفاده از ESLint برای بررسی حساسیت به حروف

ما از `eslint-plugin-import` برای گرفتن اشتباهات رایج در ایمپورت‌ها استفاده می‌کنیم.

```bash
npm install eslint-plugin-import --save-dev
```

**در `eslint.config.js`:**
```js
"import/no-unresolved": ["error", { ignore: ["^@tailwindcss/vite$"] }],
"import/no-case-sensitive-paths": "error",
"import/extensions": ["error", "ignorePackages", { js: "never", jsx: "never" }]
```

### ۲. تنظیمات هماهنگ VS Code برای همه

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

### 💡 نکته Git برای کاربران لینوکس/مک

فایل را از طریق Git تغییر نام دهید:

```bash
git mv localstorage.js LocalStorage.js
```

---

## 🚀 خلاصه

| مورد | راهکار |
|------|--------|
| حساسیت به حروف | `import/no-case-sensitive-paths` |
| بررسی مسیرها | `import/no-unresolved` |
| تنظیمات ادیتور | `.vscode/settings.json` |
| جلوگیری از خطاهای بعدی | `npm run lint` قبل از کامیت |
