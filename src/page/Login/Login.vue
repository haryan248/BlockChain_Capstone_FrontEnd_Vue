<template>
	<div>
		<div class="login-box">
			<div class="card">
				<h5 class="login-header">U-PASS</h5>
				<div class="p-fluid">
					<!-- <div class="p-field">
						<label for="name">이름</label>
						<InputText autocomplete="off" id="name" type="text" />
						<small id="username-help">이름을 입력해주세요.</small>
					</div>
					<div class="p-field">
						<label for="id">학번</label>
						<InputText autocomplete="off" id="id" type="text" />
						<small id="username-help">학번을 입력해주세요.</small>
					</div>
					<div class="p-field">
						<label for="department">학과</label>
						<InputText autocomplete="off" id="department" type="text" />
						<small id="username-help">자신의 학과를 입력해 주세요.</small>
					</div> -->
					<div class="sign-in">
						<div class="p-field">
							<label for="studentId">학번</label>
							<InputText autocomplete="off" id="studentId" type="text" v-model="studentId" />
							<small id="studentid-help">학번을 입력해주세요.</small>
						</div>
						<div class="p-field">
							<label for="major">전공</label>
							<InputText autocomplete="off" id="major" type="text" v-model="major" />
							<small id="usermajor-help">전공을 선택해주세요.</small>
						</div>
						<div class="p-field">
							<label for="id">학과</label>
							<Dropdown
								v-model="selectedGroupedMajor"
								:options="groupedMajor"
								optionLabel="label"
								placeholder="학과를 선택해주세요."
								optionGroupLabel="label"
								optionGroupChildren="items"
							>
								<template #optiongroup="slotProps">
									<div class="p-d-flex p-ai-center country-item">
										<!-- <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" width="18" /> -->
										<div>{{ slotProps.option.label }}</div>
									</div>
								</template>
							</Dropdown>
							<small id="usermajor-help">학교 이메일(kyonggi.ac.kr)을 사용해 가입해주세요.</small>
						</div>
					</div>
					<div class="login__button">
						<Button label="구글 로그인" icon="pi pi-google" iconPos="left" @click="handleLogin" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
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
	data() {
		return {
			major: "",
			studentId: "",
			signedIn: false,
			userName: null,
			userEmail: null,
			userImage: null,
			//임시 학과 데이터
			selectedCountry: null,
			selectedGroupedMajor: null,
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
	created() {
		this.getUserData()
	},
	methods: {
		clear() {
			this.signedIn = null
			this.userName = null
			this.userImage = null
			this.userEmail = null
		},
		getUserData() {
			const response = axios.get("http://101.101.218.36:8000/api/members/", {}).then((res) => {
				console.log(res)
			})
			console.log(response)
		},
		//처음에 get으로 데이터를 받아오고, 없으면 회원가입 있으면 로그인 진행
		async handleLogin() {
			try {
				const GoogleUser = await this.$gAuth.signIn()
				// const googleUser = this.$gAuth.GoogleUser.get()

				if (!GoogleUser.isSignedIn()) throw new Error("로그인에 실패했습니다.")
				if (
					GoogleUser.getBasicProfile()
						.getEmail()
						.split("@")[1] !== "kyonggi.ac.kr"
				) {
					await this.$gAuth.signOut()
					this.signedIn = GoogleUser.isSignedIn()
				} else {
					this.signedIn = GoogleUser.isSignedIn()
					this.userName = GoogleUser.getBasicProfile().getName()
					this.userImage = GoogleUser.getBasicProfile().getImageUrl()
					this.userEmail = GoogleUser.getBasicProfile().getEmail()
					this.$router.push("/")
					console.log(GoogleUser)

					//회원가입 완료시 post 해서 그정보를
				}
			} catch (e) {
				console.error(e)
			}
		},
	},
}
</script>
<style scoped>
@import "./login.css";
</style>
