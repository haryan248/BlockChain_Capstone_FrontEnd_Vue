<template>
	<div class="login__Form-container">
		<Toast :style="{ width: '90%' }" />

		<Dialog class="login-form" v-model:visible="displayBasic" :showHeader="false" position="bottom" :style="{ width: '80vw' }">
			<div class="login__form-box">
				<div class="p-fluid">
					<div class="sign-in">
						<!-- 학번 입력 화면 -->
						<div class="p-field">
							<label for="studentId" ref="usernameInput" class="studentId">학번 *</label>
							<InputText ref="studentId" :class="{ 'p-invalid': failId }" autocomplete="off" id="studentId" placeholder="학번" type="text" :maxlength="9" v-model="studentId" :disabled="successSignUp" />
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
	props: { email: String },
	data() {
		return { studentId: "", displayBasic: false, failId: false, successSignUp: false }
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
			try {
				const response = await this.$axios.post("/api/findmyinfo/", { stdnum: this.studentId, email: this.email })
				if (response.status === 201) {
					this.showSuccess("회원 찾기 성공", "이미 가입된 회원입니다. \n잠시후 학생증 페이지로 이동합니다.")
					localStorage.setItem("key", response.data.key)
					localStorage.setItem("did", response.data.did)
					setTimeout(() => {
						this.$router.replace("/")
					}, 2000)
				}
			} catch (error) {
				if (error.response) {
					console.log(error.response.data.msg)
					if (error.response.data.msg === "가입되지 않은 stdnum입니다") {
						this.showError("회원 찾기 오류", "가입된 정보가 없습니다. \n잠시후 메인 화면으로 돌아갑니다.")
						setTimeout(() => {
							this.$router.replace("/login")
						}, 2000)
					} else if (error.response.data.msg === "email과 stdnum이 일치하지 않습니다.") {
						this.showError("회원 찾기 오류", "해당되는 학번이 없습니다. \n확인 후 다시 입력해주세요.")
						this.studentId = ""
						this.$refs.studentId.$el.focus()
					}
				}
			}
		},
		showError(summaryText, detailText) {
			this.$toast.add({ severity: "error", summary: summaryText, detail: detailText, life: 3000 })
		},
		showSuccess(summaryText, detailText) {
			this.$toast.add({ severity: "success", summary: summaryText, detail: detailText, life: 3000 })
		},
	},
}
</script>
<style scoped>
@import "./find-accountform.css";
</style>
