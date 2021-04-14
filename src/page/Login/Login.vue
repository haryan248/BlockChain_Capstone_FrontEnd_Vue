<template>
	<div>
		<div class="login-box">
			<div class="card">
				<h5>U-PASS</h5>
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
					<div v-if="signedIn" class="sign-in">
						<div class="p-field">
							<label for="name">학번</label>
							<InputText autocomplete="off" id="name" type="text" v-model="userName" />
							<small id="username-help">이름을 입력해주세요.</small>
						</div>
						<div class="p-field">
							<label for="id">전공</label>
							<InputText autocomplete="off" id="id" type="text" v-model="department" />
							<small id="username-help">전공을 선택해주세요.</small>
						</div>
						<div class="p-field">
							<label for="id">학과</label>
							<Dropdown
								v-model="selectedGroupedCity"
								:options="groupedCities"
								optionLabel="name"
								:filter="true"
								placeholder="Select a Country"
								:showClear="true"
								optionGroupLabel="label"
								optionGroupChildren="items"
							>
								<template #value="slotProps">
									<div class="country-item country-item-value" v-if="slotProps.value">
										<img
											src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
										/>
										<div>{{ slotProps.value.name }}</div>
									</div>
									<span v-else>
										{{ slotProps.placeholder }}
									</span>
								</template>
								<template #option="slotProps">
									<div class="country-item">
										<img
											src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
										/>
										<div>{{ slotProps.option.name }}</div>
									</div>
								</template>
							</Dropdown>
						</div>
					</div>
					<div v-else class="login__button">
						<Button label="구글 로그인" icon="pi pi-google" iconPos="left" @click="handleLogin" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
// import api from "../../tool/api"
// import axios from "axios"

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
			signedIn: false,
			userName: null,
			userEmail: null,
			userImage: null,
			//임시 학과 데이터
			selectedCountry: null,
			selectedGroupedCity: null,
			groupedCities: [
				{
					label: "Germany",
					code: "DE",
					items: [
						{ label: "Berlin", value: "Berlin" },
						{ label: "Frankfurt", value: "Frankfurt" },
						{ label: "Hamburg", value: "Hamburg" },
						{ label: "Munich", value: "Munich" },
					],
				},
				{
					label: "USA",
					code: "US",
					items: [
						{ label: "Chicago", value: "Chicago" },
						{ label: "Los Angeles", value: "Los Angeles" },
						{ label: "New York", value: "New York" },
						{ label: "San Francisco", value: "San Francisco" },
					],
				},
				{
					label: "Japan",
					code: "JP",
					items: [
						{ label: "Kyoto", value: "Kyoto" },
						{ label: "Osaka", value: "Osaka" },
						{ label: "Tokyo", value: "Tokyo" },
						{ label: "Yokohama", value: "Yokohama" },
					],
				},
			],
		}
	},
	methods: {
		clear() {
			this.signedIn = null
			this.userName = null
			this.userImage = null
			this.userEmail = null
		},

		async handleLogin() {
			try {
				const GoogleUser = await this.$gAuth.signIn()
				if (!GoogleUser.isSignedIn()) throw new Error("로그인에 실패했습니다.")
				if (
					GoogleUser.getBasicProfile()
						.getEmail()
						.split("@")[1] !== "kyonggi.ac.kr"
				) {
					await this.$gAuth.signOut()
					this.signedIn = GoogleUser.isSignedIn()

					console.log(this.signedIn)
				} else {
					this.signedIn = GoogleUser.isSignedIn()
					this.userName = GoogleUser.getBasicProfile().getName()
					this.userImage = GoogleUser.getBasicProfile().getImageUrl()
					this.userEmail = GoogleUser.getBasicProfile().getEmail()
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
