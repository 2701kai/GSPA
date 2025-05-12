#!/bin/bash

# =================================================================================
#       ALIASES
# =================================================================================

# ---------------------------------------------------------------------------------
# GAC: Alt+G = Pre-fill commit message | Alt + G
# ---------------------------------------------------------------------------------
git_add_commit_prefill() {
    READLINE_LINE="git add . && git commit -m ''"
    READLINE_POINT=28
}
bind -x '"\eg":git_add_commit_prefill'

# ---------------------------------------------------------------------------------
# GAC: Typed command `gac`
# ---------------------------------------------------------------------------------
gac() {
    git add .
    echo "Enter commit message:"
    read -r msg
    git commit -m "$msg"
}

# ---------------------------------------------------------------------------------
# GACP: Alt+V or type `gacp`| Alt + V
# ---------------------------------------------------------------------------------
gacp() {
    read -e -p "Commit message: " msg && git add . && git commit -m "$msg" && git push
}
bind -x '"\ev":gacp'

# ---------------------------------------------------------------------------------
# Git alias - git push - `gp`
# ---------------------------------------------------------------------------------
alias gp='git push'

# ---------------------------------------------------------------------------------
# GCMM: Merge current branch into `main`
# ---------------------------------------------------------------------------------
gcmm() {
    current_branch=$(git symbolic-ref --short HEAD)
    if [ "$current_branch" = "main" ]; then
        echo "You're already on 'main'. Cannot merge 'main' into itself."
        return 1
    fi
    echo "Merging '$current_branch' into 'main'..."
    git checkout main && git merge "$current_branch"
}
# Optional: bind -x '"\em":gcmm'

# ---------------------------------------------------------------------------------
# GB: Create and switch to new branch | Alt + B
# ---------------------------------------------------------------------------------
gb() {
    read -e -p "New branch name: " branch
    if [ -z "$branch" ]; then
        echo "Branch name cannot be empty."
        return 1
    fi
    git checkout -b "$branch" && echo "Switched to new branch: $branch"
}
bind -x '"\eb":gb'

# ---------------------------------------------------------------------------------
# GCM: Checkout to main branch | Alt + M
# ---------------------------------------------------------------------------------
gcm() {
    git checkout main && echo "Switched to branch: main"
}
bind -x '"\em":gcm'

# ---------------------------------------------------------------------------------
# NRD: npm run dev | Alt + D
# ---------------------------------------------------------------------------------
nrd() {
    npm run dev
}
bind -x '"\ed":nrd'

# ---------------------------------------------------------------------------------
# VTD: Placeholder - Vite w/ Tailwind & DaisyUI
# ---------------------------------------------------------------------------------
# You can fill this with your vite-init script later

# ---------------------------------------------------------------------------------
# GHRC: gh repo create --remote | Alt + R
# ---------------------------------------------------------------------------------
ghrc() {
    read -e -p "Repo Name: " msg && gh repo create "$msg" --private --source=. --remote=origin --push
}
bind -x '"\er":ghrc'

# =================================================================================
#       End ALIASES
# =================================================================================
