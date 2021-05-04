<template>
	<div :class="{ 'home-container--loading': loading }" class="home-container">
		<Dialog class="login" v-if="!loading" :showHeader="false" position="bottom" v-model:visible="displayBasic" :style="{ width: '80vw' }">
			<div class="login-box">
				<div class="login-card">
					<div class="p-fluid">
						<Button label="U-PASS란" icon="pi pi-info-circle" iconPos="right" class="p-button-secondary border-none p-button-text upass__button-info" @click="openInfoModal" />

						<div class="login__button">
							<div class="error-message" v-html="errorTitle"></div>

							<Button label="구글 로그인" icon="pi pi-google" iconPos="left" @click="handleLogin" class="p-button-outlined" />
							<div class="error-message"></div>
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
		<Dialog class="upass__info-modal" header="" :showHeader="false" v-model:visible="displayInfoModal" :style="{ width: '80vw' }" :modal="true">
			<p class="upass-info__detail">
				<br /><span class="upass-focus">U: University</span> <br />
				<span class="upass-focus">N: Network</span><br />
				<span class="upass-focus">I: Identity</span><br />
				<span class="upass-focus">V: Verification</span><br />
				<br />
				비대면 학생증 발급을 위한 블록체인 기반 DID (Decentralized Identifier) 발급 <br />
				어플리케이션입니다.
				<br />
				자신의 데이터 및 개인 정보는 자신만이 지킬 수 있습니다.👍
				<br />
				<br />
				<span class="upass-focus">- 이팔청춘 -</span> <br />
			</p>
			<template #footer>
				<Button label="확인" icon="pi pi-check" class="border-none p-button-outlined" @click="closeInfoModal" autofocus />
			</template>
		</Dialog>
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
			displayInfoModal: false,
		}
	},
	mounted() {
		if (sessionStorage.getItem("isLogin") !== null || sessionStorage.getItem("isFindAccount") !== null) {
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
			if (GoogleUser.isSignedIn() === false) {
				this.loading = false
				sessionStorage.removeItem("isLogin")
				sessionStorage.removeItem("isFindAccount")
				return
			}
			const profile = GoogleUser.getBasicProfile()
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
				//처음 가입시 회원가입, 아닐시 바로 학생증 창으로 이동
				console.log(this.isFirstMember !== null)
				if (this.isFirstMember !== null) {
					this.$router.push("/")
				} else {
					//처음 가입시 로그인 폼으로 이동
					if (sessionStorage.getItem("isFindAccount") !== null) {
						this.$router.replace({ name: "FindAccountForm", params: { email: this.userEmail } })
						sessionStorage.removeItem("isFindAccount")
					} else {
						this.$router.replace({ name: "LoginForm", params: { name: this.userName, imgUrl: this.userImage, email: this.userEmail } })
						sessionStorage.removeItem("isLogin")
					}
				}
			}
		},
		//처음에 get으로 데이터를 받아오고, 없으면 회원가입 있으면 로그인 진행
		async handleLogin() {
			sessionStorage.setItem("isLogin", true)
			await this.$gAuth.signIn()
		},
		async goToFindForm() {
			sessionStorage.setItem("isFindAccount", true)
			await this.$gAuth.signIn()
		},
		openInfoModal() {
			this.displayInfoModal = true
		},
		closeInfoModal() {
			this.displayInfoModal = false
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
.upass__info-modal .p-dialog-content {
	border-radius: 20px 20px 0 0;
}
.upass__info-modal .p-dialog-footer {
	border-top: 1px solid #e2e2e2;
	padding-top: 1rem;
	border-radius: 0 0 20px 20px;
	text-align: center;
}
</style>
