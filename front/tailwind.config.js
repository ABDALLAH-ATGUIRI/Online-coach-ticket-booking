/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  mode: "jit",
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
]
}