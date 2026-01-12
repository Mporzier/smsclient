#!/bin/bash

# Script de minification pour optimiser les performances
# Usage: ./minify.sh

echo "🚀 Minification des fichiers..."

# Vérifier si les outils sont installés
if ! command -v npx &> /dev/null; then
    echo "❌ Node.js/npx n'est pas installé"
    echo "📦 Installation: sudo apt install nodejs npm"
    exit 1
fi

# Créer un dossier de sauvegarde
mkdir -p backup
cp styles.css backup/styles.css.bak
cp script.js backup/script.js.bak
echo "✅ Sauvegarde créée dans backup/"

# Minifier CSS
echo "🎨 Minification du CSS..."
npx clean-css-cli -o styles.min.css styles.css
if [ $? -eq 0 ]; then
    SIZE_BEFORE=$(wc -c < styles.css)
    SIZE_AFTER=$(wc -c < styles.min.css)
    SAVING=$((100 - (SIZE_AFTER * 100 / SIZE_BEFORE)))
    echo "✅ CSS minifié : $SIZE_BEFORE → $SIZE_AFTER bytes (-$SAVING%)"
else
    echo "❌ Erreur lors de la minification CSS"
fi

# Minifier JavaScript
echo "⚙️ Minification du JavaScript..."
npx terser script.js -o script.min.js -c -m
if [ $? -eq 0 ]; then
    SIZE_BEFORE=$(wc -c < script.js)
    SIZE_AFTER=$(wc -c < script.min.js)
    SAVING=$((100 - (SIZE_AFTER * 100 / SIZE_BEFORE)))
    echo "✅ JS minifié : $SIZE_BEFORE → $SIZE_AFTER bytes (-$SAVING%)"
else
    echo "❌ Erreur lors de la minification JS"
fi

echo ""
echo "📝 Pour utiliser les fichiers minifiés:"
echo "   1. Renommer styles.css en styles.dev.css"
echo "   2. Renommer styles.min.css en styles.css"
echo "   3. Renommer script.js en script.dev.js"
echo "   4. Renommer script.min.js en script.js"
echo ""
echo "   OU mettre à jour index.html:"
echo "   <link rel=\"stylesheet\" href=\"styles.min.css\">"
echo "   <script src=\"script.min.js\"></script>"
echo ""
echo "🎉 Minification terminée!"

