// Types
import { NuxtOptionsModule } from "@nuxt/types/config/module"
import windicss from "./modules/windicss"
import moment from "./modules/moment"

// Configuration
const buildModules: NuxtOptionsModule[] = [
    "@nuxt/typescript-build",
    ["nuxt-windicss", windicss],
    ["@nuxtjs/moment", moment]
]

export default buildModules