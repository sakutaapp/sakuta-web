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
                mal: "#2E5A2"
            }
        },
        fontFamily: {
            sans: ["Inter", "sans-serif"],
        }
    },
    plugins: [ aspectRatio ]
});