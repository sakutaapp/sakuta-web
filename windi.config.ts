import { defineConfig } from "windicss/helpers";

// Plugins
import aspectRatio from "windicss/plugin/aspect-ratio";

export default defineConfig({
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#FF005B",
                aniList: "#02A9FF",
                mal: "#2E5A2",
                gray: {
                    50: "#f9fafb",
                    100: "#f3f4f6",
                    200: "#e5e7eb",
                    300: "#d1d5db",
                    400: "#9ca3af",
                    500: "#6b7280",
                    600: "#4b5563",
                    700: "#374151",
                    800: "#1f0818",
                    900: "#170212",
                },
            },
        },
        fontFamily: {
            sans: ["Poppins", "sans-serif"],
        },
    },
    plugins: [aspectRatio],
});
