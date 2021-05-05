<template>
	<div class="login__Form-container">
		<Toast :style="{ width: '90%', zIndex: '2100' }" />

		<Dialog class="login-form" v-model:visible="displayBasic" :showHeader="false" position="bottom" :style="{ width: '80vw' }">
			<div class="login__form-box">
				<div class="p-fluid">
					<div class="sign-in">
						<div class="p-field">
							<label for="studentId" ref="usernameInput" class="studentId">학번 *</label>
							<InputText ref="studentId" :class="{ 'p-invalid': failId }" autocomplete="off" id="studentId" placeholder="학번" type="text" :maxlength="9" v-model="studentId" :disabled="successSignUp" />
							<small v-if="failId" class="p-error" id="studentid-help">{{ failIdText }}</small>
							<small v-else id="studentid-help">학번을 입력해주세요.</small>
						</div>
						<div class="p-field">
							<label for="id" class="studentId" ref="majorInput">학과 *</label>
							<Dropdown :disabled="successSignUp" v-model="selectedGroupedMajor" :options="groupedMajor" optionLabel="label" placeholder="학과를 선택해주세요." optionGroupLabel="label" optionGroupChildren="items" :class="{ 'major-invalid': failMajor }">
								<template #optiongroup="slotProps">
									<div class="p-d-flex p-ai-center country-item">
										<div>{{ slotProps.option.label }}</div>
									</div>
								</template>
							</Dropdown>
							<small v-if="failMajor" class="p-error" id="studentid-help">{{ failMajorText }}</small>

							<small v-else id="usermajor-help">학과를 선택해주세요.</small>
						</div>

						<Button label="회원 가입" icon="pi pi-check" iconPos="right" :class="{ 'p-button-outlined': !successSignUp }" :disabled="successSignUp" @click="checkValidate" />
						<Button label="학생증 발급" icon="pi pi-user-plus" iconPos="right" class="p-button-outlined did-issued" :disabled="!successSignUp" @click="getUserDID" />
					</div>
				</div>
			</div>
		</Dialog>
		<Dialog class="password-modal p-dialog-maximized" :showHeader="false" v-model:visible="displayPasswordModal" :style="{ width: '100vw', height: '100vh' }" :modal="true">
			<SimplePassword :title="'간편 비밀번호 설정'" :isSetting="true" @setCorrectPassword="closePasswordModal" />
		</Dialog>
	</div>
</template>
<script>
import SimplePassword from "../../components/SimplePasswd/SimplePasswd"

export default {
	name: "LoginForm",
	components: { SimplePassword },
	props: { name: String, imgUrl: String, email: String },
	data() {
		return {
			studentId: "",
			failId: false,
			failIdText: "",
			failMajor: false,
			failMajorText: "",
			selectedGroupedMajor: null,
			displayPasswordModal: false,
			displayBasic: false,
			successSignUp: false,
			summaryText: "",
			detailText: "",
			//임시 학과 데이터
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
		setTimeout(() => {
			this.displayBasic = true
		}, 600)
	},
	methods: {
		//유효성 검사
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
			} else if (this.selectedGroupedMajor === null) {
				this.failId = false
				this.failMajor = true
				this.$refs.majorInput.focus()
				this.failMajorText = "필수 입력 사항입니다."
				return
			}
			this.failMajor = false
			//회원가입 완료시 post
			this.signUp()
		},
		async signUp() {
			this.isFirstMember = false
			//구글 이메일, 이름, 이미지 url로 API POST
			// post 완료시 키값 저장
			try {
				const response = await this.$axios.post("/api/members/", {
					major: this.selectedGroupedMajor.label,
					stdnum: this.studentId,
					name: this.name,
					email: this.email,
					key: "2877",
				})
				if (response.status === 201) {
					localStorage.setItem("key", response.data.email)
					this.successSignUp = true
				}
			} catch (error) {
				if (error.response) {
					//중복 회원가입시
					if (Object.keys(error.response.data).includes("stdnum")) {
						this.summaryText = "회원가입 오류"
						this.detailText = "이미 등록된 학번입니다."
						this.showError(this.summaryText, this.detailText)
						this.studentId = ""
						this.$refs.studentId.$el.focus()
					} else if (Object.keys(error.response.data).includes("email")) {
						this.summaryText = "회원가입 오류"
						this.detailText = "이미 등록된 이메일입니다.\n잠시후 메인 화면으로 이동합니다."
						this.showError(this.summaryText, this.detailText)
						setTimeout(() => {
							this.$router.replace("/login")
						}, 3000)
					}
				}
			}
		},
		//did 발급
		async getUserDID() {
			try {
				const response = await this.$axios.get("/api/runpython/", {})
				if (response.status === 201) {
					localStorage.setItem("did", response.data.did)
					this.summaryText = "학생증 발급 완료"
					this.detailText = "학생증 발급이 완료되었습니다."
					this.showSuccess(this.summaryText, this.detailText)
					this.displayBasic = false
					this.openPasswordModal()
				}
			} catch (error) {
				if (error.response) {
					console.log(error.response)
					this.summaryText = "DID발급 오류"
					this.detailText = "죄송합니다. \nDID 발급에 오류가 있습니다."
					this.showError(this.summaryText, this.detailText)
				}
			}
		},
		openPasswordModal() {
			this.displayPasswordModal = true
		},
		closePasswordModal() {
			this.displayPasswordModal = false
			this.$router.push("/")
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
@import "./login-form.css";
</style>
<style>
.login-form .p-dialog-content {
	border-radius: 20px;
}
.p-toast .p-toast-message .p-toast-message-content .p-toast-detail {
	white-space: pre;
}
</style>
