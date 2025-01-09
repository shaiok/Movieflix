<<<<<<< HEAD
# Movieflix

MovieFlix is a modern web application for discovering and exploring TV shows. Users can search, filter, and save their favorite shows while browsing an elegant and responsive UI.

---

## 📸 Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x400?text=Home+Page+Screenshot)

### Show Page
![Show Page](https://via.placeholder.com/800x400?text=Show+Page+Screenshot)

---

## 🚀 Features

- 🔍 Search for TV shows.
- 📝 View show details, seasons, and episodes.
- 🌟 Mark shows as favorites and manage them in a dedicated page.
- 📂 View search history.
- 🎨 Fully responsive and dark mode support.

---

## 🛠️ Installation Instructions

### Prerequisites
- Node.js and npm installed on your system.
- react vite and tailwind css
- typescript 

### Clone the Repository
```bash
git clone https://github.com/your-username/repository-name.git
cd repository-name
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
>>>>>>> 826fffd (Initial commit)
