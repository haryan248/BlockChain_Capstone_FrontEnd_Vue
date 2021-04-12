import "primeflex/primeflex.css"
import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

import { createApp } from "vue"
import { router } from "./route" 
import App from "./App.vue"

//primevue 임포트 부분
import PrimeVue from "primevue/config"
import Sidebar from "primevue/sidebar"
import Button from "primevue/button"
import Dialog from "primevue/dialog"
import MultiSelect from "primevue/multiselect"
import OrderList from "primevue/orderlist"
import Carousel from "primevue/carousel"


// Create Vue Instance
const app = createApp(App)
app.use(router) // 사용 설정 하기
app.use(PrimeVue)
//사용할 UI 컴포넌트 추가
app.component("Sidebar", Sidebar)
app.component("Button", Button)
app.component("Dialog", Dialog)
app.component("MultiSelect", MultiSelect)
app.component("DataView", DataView)
app.component("OrderList", OrderList)
app.component("Carousel", Carousel)

app.mount("#app")
