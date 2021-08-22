// Types
import { NuxtOptionsHead } from "@nuxt/types/config/head";

// Configuration
const head: NuxtOptionsHead = {
    title: "Sakuta",
    meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@trysakuta" },
        { name: "twitter:title", content: "Sakuta" },
        { name: "twitter:description", content: "The new way to track Anime - Sakuta is a simple and modern AniList Client releasing soon!" },
        { name: "twitter:image", content: "https://sakuta.app/assets/cover.png" },

        { name: "og:title", content: "Sakuta" },
        { name: "og:site_name", content: "Sakuta" },
        { name: "og:url", content: "https://sakuta.app" },
        { name: "og:description", content: "The new way to track Anime - Sakuta is a simple and modern AniList Client releasing soon!" },
        { name: "og:type", content: "website" },
        { name: "og:image", content: "https://sakuta.app/assets/cover.png" },
    ],
    link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
}

export default head;