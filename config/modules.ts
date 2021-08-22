// Config
import pwa from "./modules/pwa";
import axios from "./modules/axios";

// Types
import { NuxtOptionsModule } from "@nuxt/types/config/module";
import webfontloader from "./modules/webfontloader";
import apollo from "./modules/apollo";

// Configuration
const modules: NuxtOptionsModule[] = [
    ["@nuxtjs/pwa", pwa],
    ["@nuxtjs/axios", axios],
    ["nuxt-webfontloader", webfontloader],
    ["@nuxtjs/apollo", apollo],
];

export default modules;
