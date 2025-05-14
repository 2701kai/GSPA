# 🧭 Platformlar Arası Uyum Kılavuzu

> ⚠️ Not: Linux dosya adlarında büyük/küçük harf duyarlıdır; Windows değildir.

## 💥 Sorun

Eğer bir dosyanın adı `localStorage.js` ise ama `localstorage.js` olarak içe aktarılırsa:
- Windows’ta çalışır
- Linux’ta **çökme** yaşanır

---

## ✅ Hafif ve Etkili Çözümler

### 1. ESLint ile Dosya Adı Uyuşmazlıklarını Yakala

`eslint-plugin-import` sayesinde büyük/küçük harf hatalarını erkenden yakalıyoruz.

```bash
npm install eslint-plugin-import --save-dev
```

**`eslint.config.js` içinde:**
```js
"import/no-unresolved": ["error", { ignore: ["^@tailwindcss/vite$"] }],
"import/no-case-sensitive-paths": "error",
"import/extensions": ["error", "ignorePackages", { js: "never", jsx: "never" }]
```

### 2. VS Code Ayarları ile Tutarlılık Sağla

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

### 💡 Git İpucu (Linux/macOS kullanıcıları için)

Dosya adını değiştirmek için dosya yöneticisi yerine Git kullanın:

```bash
git mv localstorage.js LocalStorage.js
```

---

## 🚀 Özet

| Alan | Çözüm |
|------|-------|
| Harf duyarlılığı | `import/no-case-sensitive-paths` |
| Yolu çözümleme | `import/no-unresolved` |
| Editör ayarları | `.vscode/settings.json` |
| Sorunsuz commit | `npm run lint` sonrası commit |
