import type { NuxtOptionsModule } from "@nuxt/types/config/module";
import pwa from "./modules/pwa";
import axios from "./modules/axios";

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
