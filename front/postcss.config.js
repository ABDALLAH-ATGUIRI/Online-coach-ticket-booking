module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    plugins: [
      require("tailwindcss"),
      require("autoprefixer"),
      require("flowbite/plugin")
    ]
  }
};
