/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/application/src/**/*.{html,ts}",
    "./projects/infra-lib/src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms')
  ],
}

