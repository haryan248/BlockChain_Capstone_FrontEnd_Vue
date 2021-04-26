import "primeflex/primeflex.css"
import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

import { createApp } from "vue"
import { router } from "./route"
import App from "./App.vue"

//파이선 쉘
// import { PythonShell } from "python-shell"

// 공통 함수
import shared from "./tool/shared.ts"

// 구글 로그인
import GAuth from "vue3-google-oauth2"

//헤더, 푸터 임포트 부분
import Header from "./components/Header/Header"
import BottomNav from "./components/BottomNav/BottomNav"

//primevue 임포트 부분
import PrimeVue from "primevue/config"
import Sidebar from "primevue/sidebar"
import Button from "primevue/button"
import Dialog from "primevue/dialog"
import MultiSelect from "primevue/multiselect"
import OrderList from "primevue/orderlist"
import Carousel from "primevue/carousel"
import Avatar from "primevue/avatar"
import InputText from "primevue/inputtext"
import InputMask from "primevue/inputmask"
import Card from "primevue/card"
import Dropdown from "primevue/dropdown"
import ProgressSpinner from "primevue/progressspinner"
import Accordion from "primevue/accordion"
import AccordionTab from "primevue/accordiontab"
import InputSwitch from "primevue/inputswitch"

// Create Vue Instance
const app = createApp(App)
app.use(router) // 사용 설정 하기
app.use(PrimeVue)
app.component("Header", Header)
app.component("BottomNav", BottomNav)

//사용할 UI 컴포넌트 추가
app.component("Sidebar", Sidebar)
app.component("Button", Button)
app.component("Dialog", Dialog)
app.component("MultiSelect", MultiSelect)
app.component("DataView", DataView)
app.component("OrderList", OrderList)
app.component("Carousel", Carousel)
app.component("Avatar", Avatar)
app.component("InputText", InputText)
app.component("InputMask", InputMask)
app.component("Card", Card)
app.component("Dropdown", Dropdown)
app.component("ProgressSpinner", ProgressSpinner)
app.component("Accordion", Accordion)
app.component("AccordionTab", AccordionTab)
app.component("InputSwitch", InputSwitch)

//구글 로그인
const gAuthOptions = {
	clientId: "1022565741938-a0i54ckun7augse5rfte33htdn1kea74.apps.googleusercontent.com",
	scope: "email profile",
	prompt: "consent",
	ux_mode: "redirect",
	fetch_basic_profile: true,
}

app.use(GAuth, gAuthOptions)
app.config.globalProperties.$shared = shared
app.mount("#app")
