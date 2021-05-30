import "primeflex/primeflex.css"
import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import "./assets/S-Core-Dream-light/s-core-dream.css"

import { createApp } from "vue"
import { router } from "./route"
import App from "./App.vue"
import axios from "axios"
import { SHA256 } from "./sha256.js"

// 공통 함수
import shared from "./tool/shared.ts"

// 구글 로그인
import GAuth from "vue3-google-oauth2"

// calendar 사용
import VCalendar from "v-calendar"
import { Calendar, DatePicker } from "v-calendar"

// 헤더, 푸터 임포트 부분
import Header from "./components/Header/Header"
import BottomNav from "./components/BottomNav/BottomNav"

// primevue 임포트 부분
import PrimeVue from "primevue/config"
import Sidebar from "primevue/sidebar"
import Button from "primevue/button"
import Dialog from "primevue/dialog"
import MultiSelect from "primevue/multiselect"
import OrderList from "primevue/orderlist"
import InputText from "primevue/inputtext"
import Dropdown from "primevue/dropdown"
import ProgressSpinner from "primevue/progressspinner"
import Accordion from "primevue/accordion"
import AccordionTab from "primevue/accordiontab"
import InputSwitch from "primevue/inputswitch"
import ToastService from "primevue/toastservice"
import Toast from "primevue/toast"
import ProgressBar from "primevue/progressbar"
import ConfirmationService from "primevue/confirmationservice"
import ConfirmDialog from "primevue/confirmdialog"
import Checkbox from "primevue/checkbox"
import RadioButton from "primevue/radiobutton"
import Paginator from "primevue/paginator"

// vue 인스턴스 생성
const app = createApp(App)
app.use(router) // 사용 설정 하기
app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)
app.use(VCalendar, {})

app.component("Header", Header)
app.component("BottomNav", BottomNav)

// 사용할 UI 컴포넌트 추가
app.component("Sidebar", Sidebar)
app.component("Button", Button)
app.component("Dialog", Dialog)
app.component("MultiSelect", MultiSelect)
app.component("OrderList", OrderList)
app.component("InputText", InputText)
app.component("Dropdown", Dropdown)
app.component("ProgressSpinner", ProgressSpinner)
app.component("Accordion", Accordion)
app.component("AccordionTab", AccordionTab)
app.component("InputSwitch", InputSwitch)
app.component("Toast", Toast)
app.component("ConfirmDialog", ConfirmDialog)
app.component("Checkbox", Checkbox)
app.component("RadioButton", RadioButton)
app.component("Paginator", Paginator)
app.component("ProgressBar", ProgressBar)
app.component("Calendar", Calendar)
app.component("DatePicker", DatePicker)

// 구글 로그인 option 설정
const gAuthOptions = {
	clientId: "1022565741938-a0i54ckun7augse5rfte33htdn1kea74.apps.googleusercontent.com",
	scope: "email profile",
	prompt: "consent",
	ux_mode: "redirect",
	fetch_basic_profile: true,
}

app.use(GAuth, gAuthOptions)
// 전역 변수 설정
app.config.globalProperties.$shared = shared
app.config.globalProperties.$axios = axios
app.config.globalProperties.$sha256 = SHA256
app.mount("#app")
