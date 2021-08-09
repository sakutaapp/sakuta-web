// Types
import { NuxtOptionsModule } from "@nuxt/types/config/module"
import windicss from "./modules/windicss"

// Configuration
const buildModules: NuxtOptionsModule[] = [
    "@nuxt/typescript-build",
    ["nuxt-windicss", windicss]
]

export default buildModules