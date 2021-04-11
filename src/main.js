import "primeflex/primeflex.css"
import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

import { createApp } from "vue"
import { router } from "./route" // 라우터 추가하고
import PrimeVue from "primevue/config"
import Sidebar from "primevue/sidebar"
import Button from "primevue/button"
import App from "./App.vue"

// Create Vue Instance
const app = createApp(App)
app.use(router) // 사용 설정 하기
app.use(PrimeVue)
app.component("Sidebar", Sidebar)
app.component("Button", Button)

app.mount("#app")
