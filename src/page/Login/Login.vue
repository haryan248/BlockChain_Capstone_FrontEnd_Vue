<template>
	<div :class="{ 'home-container--loading': loading }" class="home-container">
		<Dialog class="login" v-if="!loading" :showHeader="false" position="bottom" v-model:visible="displayBasic" :style="{ width: '80vw' }">
			<div class="login-box">
				<div class="login-card">
					<div class="p-fluid">
						<div class="login__button">
							<Button label="구글 로그인" icon="pi pi-google" iconPos="left" @click="handleLogin" class="p-button-outlined" />
							<div class="error-message" v-html="errorTitle"></div>
							<Button label="이미 가입하신적이 있나요?" class="p-button-outlined p-button-danger" icon="pi pi-question-circle" iconPos="left" @click="goToFindForm" />
						</div>
					</div>
				</div>
			</div>
		</Dialog>
		<div v-else class="loading-indicator">
			<h5 class="login_loading">잠시만 기다려주세요.</h5>
			<ProgressBar mode="indeterminate" style="height: .5em" />
		</div>
	</div>
</template>
<script>
export default {
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
			displayBasic: false,
		}
	},
	mounted() {
		if (sessionStorage.getItem("isLogin") !== null) {
			this.loading = true
			setTimeout(() => {
				this.checkLogin()
			}, 3000)
		}
		setTimeout(() => {
			this.displayBasic = true
		}, 600)
	},
	methods: {
		async checkLogin() {
			if (this.$gAuth.instance === null) this.loading = false

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
		goToFindForm() {
			console.log(1)
			this.$router.push("/findAccountForm")
		},
	},
}
</script>
<style scoped>
@import "./login.css";
</style>
<style>
.login .p-dialog-content {
	border-radius: 20px;
}
</style>
