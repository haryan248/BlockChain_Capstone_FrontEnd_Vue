import { createWebHistory, createRouter } from "vue-router"
import StudentId from "./page/StudentId/StudentId.vue"
import Order from "./page/Order/Order.vue"
import Setting from "./page/Setting/Setting.vue"
import Wallet from "./page/Wallet/Wallet.vue"
import QRScanner from "./page/QRScanner/QRScanner.vue"
import Login from "./page/Login/Login.vue"

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
		path: "/qrscanner",
		name: "QRScanner",
		component: QRScanner,
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	// console.log(this.$gAuth.instance.currentUser.get().isSignedIn())
	// console.log(this.GAuth.instance)
	// let GoogleUser = JSON.parse(sessionStorage.getItem("user"))
	// console.log(GoogleUser.isSignedIn())
	// console.log(sessionStorage.getItem("user"))

	//로그인 페이지가 아닐떄, 로그인 상태가 아니면 로그인 페이지로 이동시킴
	if (to.path != "/login" && localStorage.getItem("isLogin")) {
		next({ path: "/login" })
	}

	//로그인 페이지 갔을때, 로그인 상태면 studentId 페이지로
	else if (to.path == "/login" && localStorage.getItem("isLogin")) {
		next({ path: "/login" })
	}

	//라우터 이동시 로그인상태인지 아니면 로그인 페이지로 이동
	console.log(from.path + " -> " + to.path)
	next()
})
