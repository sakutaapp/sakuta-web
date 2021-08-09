import { defineConfig } from "windicss/helpers";

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
    }
});