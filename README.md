# ENTR'AIDE RDC - Plateforme Universitaire & Insertion Professionnelle

Réseau social et plateforme d'insertion professionnelle pour la jeunesse étudiante congolaise (Kinshasa, Lubumbashi, Goma et toutes les provinces de la RDC).

---

## 🚀 Comment publier et récupérer le Build via GitHub

### Étape 1 : Créer un nouveau dépôt sur GitHub
1. Rendez-vous sur [GitHub.com](https://github.com/new).
2. Créez un nouveau dépôt public ou privé (ex: `entraide-rdc`).
3. Ne cochez **pas** « Initialize this repository with a README » (le projet contient déjà tout).

### Étape 2 : Lier et pousser votre code vers GitHub
Depuis le terminal de votre projet, exécutez les commandes suivantes :

```bash
git add .
git commit -m "feat: Version complète ENTR'AIDE RDC avec PWA et Build GitHub Actions"
git remote add origin https://github.com/VOTRE_NOM_UTILISATEUR/entraide-rdc.git
git branch -M main
git push -u origin main
```

---

## ⚙️ Automatisation GitHub Actions (Build Automatique)

Le fichier `.github/workflows/build.yml` est déjà configuré à la racine du projet.
Dès que vous poussez votre code sur GitHub :

1. **Lancement automatique** du workflow dans l'onglet **« Actions »** de votre dépôt GitHub.
2. **Compilation de l'application web (`npm run build`)** : vérification complète de tous les composants TypeScript.
3. **Génération des Artefacts téléchargeables** :
   - Rendez-vous sur votre dépôt GitHub > Onglet **Actions** > Cliquez sur le dernier run.
   - En bas de la page dans la section **Artifacts**, téléchargez directement :
     - `entraide-rdc-web-dist` : dossier de production prêt à être déployé (Vercel, Netlify, Cloud Run ou hébergement web).
     - `entraide-rdc-android-bundle` : package prêt pour conversion en APK.

---

## 📱 Comment générer votre APK Android directement

### Méthode 1 : Via PWABuilder (Recommandé, gratuit & sans code)
L'application est 100% compatible PWA (Manifest, Service Worker, Responsive).
1. Déployez ou utilisez l'URL partagée de votre app.
2. Allez sur [pwabuilder.com](https://www.pwabuilder.com).
3. Entrez l'URL de votre application et cliquez sur **Start**.
4. Cliquez sur **Package for Android** > Téléchargez votre fichier `.apk` prêt à être installé sur n'importe quel smartphone Android !

### Méthode 2 : En local via npm
```bash
# Compiler le build de production
npm run build

# Prévisualiser en local
npm run preview
```
