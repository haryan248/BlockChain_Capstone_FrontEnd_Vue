<template>
	<div>
		<div class="login-box">
			<div class="card">
				<h5 class="login-header">U-PASS</h5>
				<div class="p-fluid">
					<div v-if="isFirstMember === null" class="sign-in">
						<div class="p-field">
							<label for="studentId" ref="usernameInput">학번</label>
							<InputText :class="{ 'p-invalid': failId }" autocomplete="off" id="studentId" placeholder="학번" type="text" :maxlength="9" v-model="studentId" />
							<small v-if="failId" class="p-error" id="studentid-help">{{ failIdText }}</small>
							<small v-else id="studentid-help">학번을 입력해주세요.</small>
						</div>
						<div class="p-field">
							<label for="id" ref="majorInput">학과</label>
							<Dropdown
								v-model="selectedGroupedMajor"
								:options="groupedMajor"
								optionLabel="label"
								placeholder="학과를 선택해주세요."
								optionGroupLabel="label"
								optionGroupChildren="items"
								:class="{ 'major-invalid': failMajor }"
							>
								<template #optiongroup="slotProps">
									<div class="p-d-flex p-ai-center country-item">
										<!-- <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" width="18" /> -->
										<div>{{ slotProps.option.label }}</div>
									</div>
								</template>
							</Dropdown>
							<small v-if="failMajor" class="p-error" id="studentid-help">{{ failMajorText }}</small>

							<small v-else id="usermajor-help">학과를 선택해주세요.</small>
						</div>

						<Button label="회원 가입" icon="pi pi-check" iconPos="right" @click="checkValidate" />
					</div>
					<div v-else class="login__button">
						<Button label="구글 로그인" icon="pi pi-google" iconPos="left" @click="handleLogin" />
					</div>
					<Dialog class="password-modal p-dialog-maximized" header="" :showHeader="false" v-model:visible="displayPasswordModal" :style="{ width: '100vw', height: '100vh' }" :modal="true">
						<SimplePassword :title="'간편 비밀번호 설정'" :isSetting="true" @setCorrectPassword="closePasswordModal" />
					</Dialog>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import SimplePassword from "../../components/SimplePasswd/SimplePasswd"

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
	components: {
		SimplePassword,
	},
	data() {
		return {
			studentId: "",
			failId: false,
			failIdText: "",
			failMajor: false,
			failMajorText: "",
			signedIn: false,
			userName: null,
			userEmail: null,
			userImage: null,
			currentUser: null,
			isFirstMember: null,
			//임시 학과 데이터
			selectedCountry: null,
			selectedGroupedMajor: null,
			displayPasswordModal: false,

			groupedMajor: [
				{
					label: "소프트웨어경영대학",
					code: "SE",
					items: [
						{ label: "국제산업정보학과", value: "국제산업정보학과" },
						{ label: "경영학과", value: "경영학과" },
						{ label: "컴퓨터공학부", value: "컴퓨터공학부" },
						{ label: "융합보안학과", value: "융합보안학과" },
						{ label: "산업경영공학과", value: "산업경영공학과" },
					],
				},
			],
		}
	},
	mounted() {
		// this.$nextTick(function() {
		// 	console.log(this.$gAuth)
		// 	console.log(this.$gAuth.instance)
		// })
		console.log(this.isFirstMember === null)
	},
	methods: {
		clear() {
			this.signedIn = false
			this.userName = null
			this.userImage = null
			this.userEmail = null
		},
		getUserData() {
			//email을 paramater로 전달시 이
			const response = axios.get("/api/members/", {}).then((res) => {
				console.log(res)
			})
			console.log(response)
		},

		//유효성 검사
		checkValidate() {
			let regexp = /^[0-9]*$/
			if (!regexp.test(this.studentId) || this.studentId.length !== 9) {
				this.failId = true
				this.failIdText = "9자리 숫자만 입력하세요."
				this.$refs.usernameInput.focus()
				return
			} else if (this.studentId === "") {
				this.failId = true
				this.failIdText = "필수 입력 사항입니다."
				this.$refs.usernameInput.focus()
				return
			} else if (this.selectedGroupedMajor === null) {
				this.failId = false
				this.failMajor = true
				this.$refs.majorInput.focus()
				this.failMajorText = "필수 입력 사항입니다."
				return
			}
			console.log(this.selectedGroupedMajor.label)
			this.failMajor = false
			//회원가입 완료시 post 해서 그정보를
			this.signUp()
			this.openPasswordModal()
		},
		signUp() {
			this.isFirstMember = false
			//구글 이메일, 이름, 이미지 url로 API POST
			// post 완료시 키값 저장
			// localStorage.setItem('key', data.key)
		},
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

				//처음 가입시 회원가입, 아닐시 바로 학생증 창으로 이동
				if (this.isFirstMember !== null) {
					this.$router.push("/")
				}
			}
			this.signedIn = GoogleUser.isSignedIn()
			console.log(this.$gAuth.instance.currentUser.get())
		},

		openPasswordModal() {
			this.displayPasswordModal = true
		},
		closePasswordModal() {
			this.displayPasswordModal = false
			this.$router.push("/")
		},
	},
}
</script>
<style scoped>
@import "./login.css";
</style>
