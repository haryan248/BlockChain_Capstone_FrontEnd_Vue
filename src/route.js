import { createWebHistory, createRouter } from "vue-router"
import StudentId from "./page/StudentId/StudentId.vue"
import Order from "./page/Order/Order.vue"
import Setting from "./page/Setting/Setting.vue"
import Wallet from "./page/Wallet/Wallet.vue"
import QRScanner from "./page/QRScanner/QRScanner.vue"
import Login from "./page/Login/Login.vue"
import LoginForm from "./page/LoginForm/LoginForm.vue"
import Reservation from "./page/Reservation/Reservation.vue"
import Calendar from "./page/Calendar/Calendar.vue"
import EntryList from "./page/EntryList/EntryList.vue"
import AdminSetting from "./page/AdminSetting/AdminSetting.vue"
import axios from "axios"

const routes = [
	{
		path: "/",
		name: "StudentId",
		component: StudentId,
	},
	{
		path: "/order",
		name: "Order",
		component: Order,
	},
	{
		path: "/wallet",
		name: "Wallet",
		component: Wallet,
	},
	{
		path: "/setting",
		name: "Setting",
		component: Setting,
	},
	{
		path: "/reservation",
		name: "Reservation",
		component: Reservation,
	},
	{
		path: "/calendar",
		name: "Calendar",
		component: Calendar,
	},
	{
		path: "/qrscanner",
		name: "QRScanner",
		component: QRScanner,
	},
	{
		path: "/entrylist",
		name: "Entrylist",
		component: EntryList,
	},
	{
		path: "/adminsetting",
		name: "AdminSetting",
		component: AdminSetting,
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},

	{
		path: "/loginForm/:name/:imgUrl/:email/:find?",
		name: "LoginForm",
		component: LoginForm,
		props: true,
	},
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})

// 올바른 키인지 확인
async function authenticationKey() {
	try {
		const response = await axios.get("/api/authkey/", { params: { key: localStorage.getItem("key") } })
		if (response.status === 201) {
			if (response.data.msg === "This is the correct key") return true
		}
	} catch (error) {
		if (error.response.data.msg === "Invalid key") {
			localStorage.removeItem("key")
			return false
		}
	}
}

// 라우터 이동전에 로그인 유효성 검사
router.beforeEach((to, from, next) => {
	//로그인 페이지 갔을때
	if (to.path == "/login") {
		// 로그인 상태면(key 있으면) studentId 페이지로
		if (localStorage.getItem("key") === null) {
			// 로그인 상태면(key 있으면) 페이지 이동
			next()
		} else {
			next({ path: "/" })
		}
		//입력 창 갔을 때
	} else if (to.path.split("/")[1] == "loginForm") {
		next()
		//로그인, 입력창 아닐때
	} else {
		authenticationKey()
		if (localStorage.getItem("key") === null) {
			//로그인 상태(key 없으면)가 아니면 로그인 페이지로 이동시킴
			next({ path: "/login" })
		} else {
			// 로그인 상태면(key 있으면) 페이지 이동
			if (JSON.parse(localStorage.getItem("AdminMode")) === true) {
				if (to.path == "/entrylist" || to.path == "/qrscanner" || to.path == "/adminsetting") {
					next()
				} else next({ path: "/entrylist" })
			} else {
				next()
			}
		}
	}
})
