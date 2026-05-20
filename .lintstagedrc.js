module.exports = {
  // Run Next.js built-in linter cleanly on modified JS/TS files
  '*.{js,jsx,ts,tsx}': ['next lint --dir app --dir components --dir lib'],

  // Format modified styles, markdown, and configurations
  '*.{json,css,md}': ['prettier --write'],
};
