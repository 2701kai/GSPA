# 🧰 Developer Aliases

A collection of productivity-enhancing shell functions and keyboard shortcuts for Git and npm tasks.

---

## 🔧 Git Commands

| Alias  | Keybinding | Description                                      |
| ------ | ---------- | ------------------------------------------------ |
| `gac`  | —          | Add and commit with a prompt                     |
| `gacp` | Alt + V    | Add, commit (with prompt), and push              |
| `gp`   | —          | Shortcut for `git push`                          |
| `gcmm` | —          | Merge current branch into `main`                 |
| `gb`   | Alt + B    | Create and switch to a new branch (with prompt)  |
| `gcm`  | Alt + M    | Switch to `main` branch                          |
| `ghrc` | Alt + R    | Create a GitHub repo (private, push immediately) |

---

## 🚀 npm Commands

| Alias | Keybinding | Description       |
| ----- | ---------- | ----------------- |
| `nrd` | Alt + D    | Run `npm run dev` |

---

## ✨ Future Scripts

| Placeholder | Description                                                |
| ----------- | ---------------------------------------------------------- |
| `vtd`       | Script to create Vite project with TailwindCSS and daisyUI |

---

## 📦 Setup

1. Save your aliases in `aliases.sh`
2. Source it in `.bashrc` or `.zshrc`:
   ```bash
   [ -f ~/dotfiles/aliases.sh ] && source ~/dotfiles/aliases.sh
   ```

### 🤪 review my [aliases.sh](./aliases.sh)

---
