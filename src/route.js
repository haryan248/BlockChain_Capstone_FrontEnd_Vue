import { createWebHistory, createRouter } from "vue-router"
import StudentId from "./page/StudentId/StudentId.vue"
import Order from "./page/Order/Order.vue"
import Setting from "./page/Setting/Setting.vue"
import Wallet from "./page/Wallet/Wallet.vue"
import QRScanner from "./page/QRScanner/QRScanner.vue"
import Login from "./page/Login/Login.vue"
import LoginForm from "./page/LoginForm/LoginForm.vue"
import Reservation from "./page/Reservation/Reservation.vue"
import FindAccountForm from "./page/FindAccountForm/FindAccountForm.vue"

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
		path: "/qrscanner",
		name: "QRScanner",
		component: QRScanner,
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/findAccountForm",
		name: "FindAccountForm",
		component: FindAccountForm,
	},
	{
		path: "/loginForm/:name/:imgUrl/:email",
		name: "LoginForm",
		component: LoginForm,
		props: true,
	},
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})

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
	} else if (to.path.split("/")[1] == "loginForm") {
		next()
	} else {
		if (localStorage.getItem("key") === null) {
			//로그인 상태(key 없으면)가 아니면 로그인 페이지로 이동시킴
			next({ path: "/login" })
		} else {
			// 로그인 상태면(key 있으면) 페이지 이동
			next()
		}
	}
})
