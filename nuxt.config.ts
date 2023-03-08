// Config
import type { NuxtConfig } from "@nuxt/types";
import buildModules from "./config/buildModules";
import head from "./config/head";
import modules from "./config/modules";
import plugins from "./config/plugins";

const config: NuxtConfig = {
  rootDir: "./",
  srcDir: "src",
  ssr: false,
  target: "static",
  components: [{ path: "~/components", pathPrefix: false }],
  generate: { fallback: true },
  loading: "~/components/Loader.vue",

  buildModules,
  head,
  modules,
  plugins,
};

export default config;
