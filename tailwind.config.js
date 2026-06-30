module.exports = {
    content: ["./index.template.html", "./components/**/*.html"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#00696e",
                "primary-container": "#25a1a8",
                "on-primary-container": "#003133",
                "on-primary": "#ffffff",
                "secondary": "#5e5e5c",
                "secondary-container": "#e1dfdc",
                "on-secondary-container": "#636360",
                "background": "#fcf9f8",
                "on-background": "#1c1b1b",
                "surface": "#fcf9f8",
                "on-surface": "#1c1b1b",
                "surface-variant": "#e5e2e1",
                "on-surface-variant": "#3d494a",
                "outline": "#6d797a",
                "tertiary": "#914c1a",
                "error": "#ba1a1a",
            },
            spacing: {
                "margin-mobile": "24px",
                "margin-desktop": "80px",
                "section-gap": "96px"
            },
            fontFamily: {
                "display": ["Playfair Display", "serif"],
                "body": ["Inter", "sans-serif"],
            },
            animation: {
                "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            },
            keyframes: {
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" }
                }
            }
        }
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/container-queries"),
    ],
}
