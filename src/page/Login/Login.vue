<template>
	<div>
		<div class="login-box">
			<div class="card">
				<h5 class="login-header">U-PASS</h5>
				<div class="p-fluid">
					<div class="login__button">
						<Button label="구글 로그인" icon="pi pi-google" iconPos="left" @click="handleLogin" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
// import axios from "axios"

// import { api } from "../../tool/api"
// import { endpoint } from "../../tool/endpoint"
// import { PythonShell } from "python-shell"

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
	components: {},
	data() {
		return {
			signedIn: false,
			userName: null,
			userEmail: null,
			userImage: null,
			currentUser: null,
			isFirstMember: null,
		}
	},
	mounted() {
		// let options = {
		// 	scriptPath: "./",
		// 	args: [1, 2],
		// }
		// PythonShell.run("test.py", options, (err, data) => {
		// 	if (err) throw err
		// 	console.log(data)
		// })
	},
	methods: {
		clear() {
			this.signedIn = false
			this.userName = null
			this.userImage = null
			this.userEmail = null
		},
		// getUserData() {
		// 	//email을 paramater로 전달시 이
		// 	const response = axios.get("/api/members/", {}).then((res) => {
		// 		console.log(res)
		// 	})
		// 	console.log(response)
		// },
		//처음에 get으로 데이터를 받아오고, 없으면 회원가입 있으면 로그인 진행
		async handleLogin() {
			const GoogleUser = await this.$gAuth.signIn()
			const profile = GoogleUser.getBasicProfile()
			const email = profile.getEmail()

			//경기대 이메일만 가입 가능
			if (
				GoogleUser.getBasicProfile()
					.getEmail()
					.split("@")[1] !== "kyonggi.ac.kr"
			) {
				await this.$gAuth.signOut()
			} else {
				this.userName = profile.getName()
				this.userImage = profile.getImageUrl()
				this.userEmail = email
				this.isFirstMember = localStorage.getItem("key")
				console.log(this.isFirstMember !== null)
				//처음 가입시 회원가입, 아닐시 바로 학생증 창으로 이동
				if (this.isFirstMember !== null) {
					this.$router.push("/")
				} else {
					//처음 가입시 로그인 폼으로 이동

					this.$router.push({ name: "LoginForm", params: { name: this.userName, imgUrl: this.userImage, email: this.userEmail } })
				}
			}
			this.signedIn = GoogleUser.isSignedIn()
		},
	},
}
</script>
<style scoped>
@import "./login.css";
</style>
