/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#004684',
                    light: '#004684',
                    dark: '#0f1929',
                },
                gold: {
                    DEFAULT: '#d4a855',
                    light: '#e4c485',
                    dark: '#b48935',
                },
                navy: {
                    50: '#f0f4f8',
                    100: '#d9e2ec',
                    200: '#bcccdc',
                    300: '#9fb3c8',
                    400: '#829ab1',
                    500: '#627d98',
                    600: '#486581',
                    700: '#334e68',
                    800: '#243b53',
                    900: '#102a43',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                body: ['Open Sans', 'sans-serif'],
            }
        }
    },
    plugins: [],
    corePlugins: {
        preflight: false, // Disable preflight to match HTML version
    }
}
