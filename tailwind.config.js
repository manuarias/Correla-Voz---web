/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                rye: ['Rye', 'cursive'],
                bungee: ['Bungee', 'cursive'],
                'wc-mano-negra': ['"WC Mano Negra Bta"', 'sans-serif'],
            },
            colors: {
                'murga-turquoise': '#42a9c2',
            },
            animation: {
                'modal-enter': 'modal-enter 0.2s ease-out forwards',
                'kenburns': 'kenburns 40s ease-in-out infinite alternate',
                'text-enter-delay': 'text-enter 1s ease-out 0.8s forwards',
                'murga-glow': 'murga-glow 6s ease-in-out infinite',
                'murga-glow-soft': 'murga-glow-soft 8s ease-in-out infinite',
                'lights-pulse': 'lights-pulse 3s ease-in-out infinite alternate',
                'spark-flicker': 'spark-flicker 0.6s ease-out infinite',
                'particle-fly': 'particle-fly 1000ms ease-out forwards',
            },
            keyframes: {
                'modal-enter': {
                    'from': { opacity: '0', transform: 'scale(0.95) translateY(10px)' },
                    'to': { opacity: '1', transform: 'scale(1) translateY(0)' },
                },
                'kenburns': {
                    '0%': { transform: 'scale(1) translate(0, 0)' },
                    '100%': { transform: 'scale(1.05) translate(-1%, 1%)' },
                },
                'text-enter': {
                    'from': { opacity: '0', transform: 'translateY(20px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                'murga-glow': {
                    '0%, 100%': {
                        textShadow: '0 0 5px rgba(255, 255, 255, 0.4), 0 0 15px rgba(229, 62, 62, 0.7), 0 0 30px rgba(229, 62, 62, 0.6)',
                    },
                    '33%': {
                        textShadow: '0 0 5px rgba(255, 255, 255, 0.4), 0 0 15px rgba(66, 169, 194, 0.9), 0 0 30px rgba(66, 169, 194, 0.8)',
                    },
                    '66%': {
                        textShadow: '0 0 8px rgba(255, 255, 255, 0.9), 0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.6)',
                    },
                },
                'murga-glow-soft': {
                    '0%, 100%': {
                        textShadow: '-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000, 0 0 6px rgba(229, 62, 62, 0.5), 0 0 12px rgba(229, 62, 62, 0.4)',
                    },
                    '50%': {
                        textShadow: '-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000, 0 0 6px rgba(66, 169, 194, 0.6), 0 0 12px rgba(66, 169, 194, 0.5)',
                    },
                },
                'lights-pulse': {
                    'from': {
                        borderColor: '#f59e0b',
                        boxShadow: '0 0 10px rgba(245, 158, 11, 0.4), inset 0 0 5px rgba(245, 158, 11, 0.1)',
                    },
                    'to': {
                        borderColor: '#fcd34d',
                        boxShadow: '0 0 25px rgba(252, 211, 77, 0.8), inset 0 0 15px rgba(252, 211, 77, 0.4)',
                    },
                },
                'spark-flicker': {
                    '0%': { transform: 'translate(-50%, 0) scale(1)', opacity: '1' },
                    '100%': { transform: 'translate(-50%, 25px) scale(0)', opacity: '0' },
                },
                'particle-fly': {
                    '0%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '1' },
                    '100%': { transform: 'var(--transform-end)', opacity: '0' },
                },
                'fall': {
                    '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: '1' },
                    '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
                }
            },
        },
    },
    plugins: [],
}
