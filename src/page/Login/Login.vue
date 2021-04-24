<template>
	<div class="home-container bg-gray">
		<div v-if="!loading" class="login-box">
			<div class="card">
				<h5 class="login-header">U-PASS</h5>
				<div class="p-fluid">
					<div class="login__button">
						<Button label="구글 로그인" icon="pi pi-google" iconPos="left" @click="handleLogin" style="border:20px" />
						<div class="error-message" v-html="errorTitle"></div>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="loading-indicator">
			<h5 class="login-header">잠시만 기다려주세요.</h5>
			<ProgressSpinner style="width70px;height:70px" strokeWidth="6" animationDuration=".5s" />
		</div>
	</div>
</template>
<script>
// import axios from "axios"

// import { api } from "../../tool/api"
// import { endpoint } from "../../tool/endpoint"

export default {
	// name: "Login",
	// components: {},
	// created() {
	// 	console.log(window.location.hostname.split(".")[0])
	// },
	// data() {
	// 	return {
	// 		loginObj: {
	// 			username: null,
	// 			password: null,
	// 		},
	// 		token: null,
	// 	}
	// },
	// methods: {
	// 	// getToken() {
	// 	// 	axios.get("http://localhost:8000/user/").then((res)=>)
	// 	// },
	// 	// checkLogin() {
	// 	// 	console.log(JSON.stringify(this.loginObj))
	// 	// 	axios
	// 	// 		.post("http://localhost:8000/user/", this.loginObj)
	// 	// 		.then((res) => res.json())
	// 	// 		.then((json) => {
	// 	// 			if (json.username && json.token) {
	// 	// 				// props.userHasAuthenticated(true, json.username, json.token)
	// 	// 				console.log(JSON.stringify(this.loginObj))
	// 	// 				history.push("/")
	// 	// 				// props.setModal(true)
	// 	// 			} else {
	// 	// 				alert("사용불가능한 아이디입니다.")
	// 	// 			}
	// 	// 		})
	// 	// 		.catch((error) => alert(error))
	// 	// },
	// 	// handleClickGetAuth() {
	// 	// 	this.$gAuth
	// 	// 		.signIn()
	// 	// 		.then(async (GoogleUser) => {
	// 	// 			const params = {
	// 	// 				email: GoogleUser.Rs.At,
	// 	// 				name: GoogleUser.Rs.Se,
	// 	// 				imgUrl: GoogleUser.Rs.WI,
	// 	// 			}
	// 	// 			const { data, result } = await api.appPost(endpoint.GOOGLELOGIN, params)
	// 	// 			if (result === 2000) {
	// 	// 				this.$shared.setToken(data.staffKey)
	// 	// 				sessionStorage.setItem(
	// 	// 					"userInfo",
	// 	// 					JSON.stringify({
	// 	// 						email: data.email,
	// 	// 						name: data.name,
	// 	// 						imgUrl: data.imgUrl,
	// 	// 					})
	// 	// 				)
	// 	// 				this.$router.push({ name: "/" })
	// 	// 			}
	// 	// 		})
	// 	// 		.catch((error) => {
	// 	// 			log.d(error)
	// 	// 		})
	// 	// },
	// },

	name: "Login",
	// components: { GoogleLogin },
	data() {
		return {
			signedIn: false,
			userName: null,
			userEmail: null,
			userImage: null,
			currentUser: null,
			isFirstMember: null,
			startLogin: false,
			loading: false,
			errorTitle: "",
		}
	},
	mounted() {
		if (sessionStorage.getItem("isLogin") !== null) {
			this.loading = true
			setTimeout(() => {
				this.checkLogin()
			}, 2000)
		}
	},
	methods: {
		// getUserData() {
		// 	//email을 paramater로 전달시 이
		// 	const response = axios.get("/api/members/", {}).then((res) => {
		// 		console.log(res)
		// 	})
		// 	console.log(response)
		// },
		async checkLogin() {
			const GoogleUser = this.$gAuth.instance.currentUser.get()
			const profile = GoogleUser.getBasicProfile()
			console.log(GoogleUser.isSignedIn())
			if (GoogleUser.isSignedIn() === false) {
				this.loading = false
				sessionStorage.removeItem("isLogin")
				return
			}
			const email = profile.getEmail()

			if (email.split("@")[1] !== "kyonggi.ac.kr") {
				console.log("경기대 이메일(kyonggi.ac.kr)로만 로그인/회원가입 해주세요.")
				this.errorTitle = "경기대 이메일(kyonggi.ac.kr)로<br> 로그인/회원가입 해주세요."
				this.loading = false
				await this.$gAuth.signOut()
			} else {
				this.userName = profile.getName()
				this.userImage = profile.getImageUrl()
				this.userEmail = email
				this.isFirstMember = localStorage.getItem("key")
				sessionStorage.removeItem("isLogin")
				//처음 가입시 회원가입, 아닐시 바로 학생증 창으로 이동
				if (this.isFirstMember !== null) {
					this.$router.push("/")
				} else {
					//처음 가입시 로그인 폼으로 이동
					this.$router.replace({ name: "LoginForm", params: { name: this.userName, imgUrl: this.userImage, email: this.userEmail } })
				}
			}
		},
		//처음에 get으로 데이터를 받아오고, 없으면 회원가입 있으면 로그인 진행
		async handleLogin() {
			sessionStorage.setItem("isLogin", true)
			await this.$gAuth.signIn()
		},
	},
}
</script>
<style scoped>
@import "./login.css";
</style>
<style>
@keyframes p-progress-spinner-color {
	100%,
	0% {
		stroke: #2196f3;
	}
	40% {
		stroke: #2196f3;
	}
	66% {
		stroke: #2196f3;
	}
	80%,
	90% {
		stroke: #2196f3;
	}
}
</style>
