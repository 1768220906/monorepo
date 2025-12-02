export default {
  "*.{cjs,html,js,ts,jsx,tsx,vue,css,scss,json,md}": ["cspell lint"],
  "*.{html,js,ts,jsx,tsx,vue,css,scss}": ["prettier --write", "eslint"],
};
