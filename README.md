# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Deploying Vite React App to Github pages which use React Router.

1. Install gh-pages package
```bash
npm install gh-pages
```

2. Add homepage to package.json
```json
"homepage": "https://<username>.github.io/<repo-name>"
```

3. Add deploy script to package.json
```json
"scripts": {
  "deploy": "vite build && gh-pages -d dist"
}
```

4. Change base in vite.config.js
```js
export default defineConfig({
  base: '/<repo-name>/'
})
```

5. Change base of  react router
```jsx
<Router basename={'/Notes3Web/'}>
    <Routes>
      
      <Route path="" element={<Home />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/edit/:noteId" element={<MarkdownEditorPage />} />
    </Routes>
  </Router>
```


6. Deploy the app
```bash
npm run deploy
```

