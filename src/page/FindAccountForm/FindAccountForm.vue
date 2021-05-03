<template>
	<div class="login__Form-container">
		<Toast :style="{ width: '90%', zIndex: '2100' }" />

		<Dialog class="login-form" v-model:visible="displayBasic" :showHeader="false" position="bottom" :style="{ width: '80vw' }">
			<div class="login__form-box">
				<div class="p-fluid">
					<div class="sign-in">
						<div class="p-field">
							<label for="studentId" ref="usernameInput" class="studentId">학번 *</label>
							<InputText :class="{ 'p-invalid': failId }" autocomplete="off" id="studentId" placeholder="학번" type="text" :maxlength="9" v-model="studentId" :disabled="successSignUp" />
							<small v-if="failId" class="p-error" id="studentid-help">{{ failIdText }}</small>
							<small v-else id="studentid-help">학번을 입력해주세요.</small>
						</div>

						<Button label="학생증 찾기" icon="pi pi-search" iconPos="right" :class="{ 'p-button-outlined': !successSignUp }" :disabled="successSignUp" @click="checkValidate" />
					</div>
				</div>
			</div>
		</Dialog>
	</div>
</template>
<script>
export default {
	name: "FindAccountForm",
	components: {},
	data() {
		return { studentId: "", displayBasic: false, failId: false, successSignUp: false, summaryText: "", detailText: "" }
	},
	mounted() {
		setTimeout(() => {
			this.displayBasic = true
		}, 600)
	},
	methods: {
		checkValidate() {
			let regexp = /^[0-9]*$/
			if (this.studentId === "") {
				this.failId = true
				this.failIdText = "필수 입력 사항입니다."
				this.$refs.usernameInput.focus()
				return
			} else if (!regexp.test(this.studentId) || this.studentId.length !== 9) {
				this.failId = true
				this.failIdText = "9자리 숫자를 입력해주세요."
				this.$refs.usernameInput.focus()
				return
			}
			//회원가입 완료시 post
			this.findAccount()
		},
		//did 찾아오는것 필요.
		async findAccount() {
			const response = await this.$axios.get("/api/findAccount/", {})
			if (response.status === 201) {
				console.log(response)
				this.openPasswordModal()
				localStorage.setItem("did", response.data.did)
			} else {
				console.log("학생증 발급 오류입니다.")
				this.summaryText = "학생증 발급 오류"
				this.detailText = "이미 가입된 회원입니다."
				this.showError(this.summaryText, this.detailText)
			}
		},
		showError(summaryText, detailText) {
			this.$toast.add({ severity: "error", summary: summaryText, detail: detailText, life: 3000 })
		},
	},
}
</script>
<style scoped>
@import "./find-accountform.css";
</style>
