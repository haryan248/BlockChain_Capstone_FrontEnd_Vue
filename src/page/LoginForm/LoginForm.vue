<template>
	<div class="login__form-container" :class="{ dark__mode: darkModeState }">
		<Toast :style="{ width: '90%' }" />
		<Dialog class="login-form" v-model:visible="displayBasic" :showHeader="false" position="bottom" :style="{ width: '80vw' }">
			<!-- 회원가입 정보 입력 화면 -->
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
							<Dropdown
								:disabled="successSignUp"
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
										<div>{{ slotProps.option.label }}</div>
									</div>
								</template>
							</Dropdown>
							<small v-if="failMajor" class="p-error" id="studentid-help">{{ failMajorText }}</small>
							<small v-else id="usermajor-help">학과를 선택해주세요.</small>
						</div>
						<!-- 학생증 찾기 버튼 -->
						<div v-if="find === 'true'">
							<Button label="회원 정보 입력" icon="pi pi-pencil" iconPos="right" :class="{ 'p-button-outlined': !successSignUp }" :disabled="successSignUp" @click="checkValidate" />
							<Button v-if="successSignUp" label="간편 비밀번호 입력" icon="pi pi-lock" iconPos="right" class="did-issued" :class="{ 'p-button-outlined': !successPassword }" :disabled="successPassword" @click="openPasswordModal" />
							<Button v-if="successPassword" label="학생증 찾기" icon="pi pi-search" iconPos="right" class="did-issued" :class="{ 'p-button-outlined': !successFindDID }" :disabled="successFindDID" @click="getUserDID" />
							<Button v-if="regenerateDID" label="학생증 재발급" icon="pi pi-clone" iconPos="right" style="margin-top:20px" class="did-reissued" @click="openWarningModal" :disabled="!successSignUp" />
						</div>
						<!-- 회원가입 버튼 -->
						<div v-else>
							<Button label="회원 가입" icon="pi pi-check" iconPos="right" :class="{ 'p-button-outlined': !successSignUp }" :disabled="successSignUp" @click="checkValidate" />
							<Button label="간편 비밀번호 설정" icon="pi pi-lock" iconPos="right" class="did-issued" :class="{ 'p-button-outlined': !successSignUp }" :disabled="!successSignUp" @click="openWarningModal" />
							<Button label="학생증 발급" icon="pi pi-user-plus" iconPos="right" class="p-button-outlined did-issued" :class="{ 'p-button-outlined': !successSignUp }" :disabled="!successPassword" @click="generateUserDID" />
						</div>
					</div>
				</div>
			</div>
		</Dialog>
		<Dialog class="password-modal p-dialog-maximized" :class="{ dark__mode: darkModeState }" :showHeader="false" v-model:visible="displayPasswordModal" :style="{ width: '100vw', height: '100vh' }" :modal="true">
			<SimplePassword :title="find === 'true' ? '간편 비밀번호 입력' : '간편 비밀번호 설정'" :isSetting="true" @setCorrectPassword="closePasswordModal" />
		</Dialog>

		<!-- 비밀번호 설정시 경고모달 -->
		<Dialog class="password__warning-modal" header="" :showHeader="false" v-model:visible="displayWarningModal" :style="{ width: '80vw' }" :modal="true">
			<p v-if="regenerateDID" class="password-warning__detail">
				<br /><span class="password-focus"> 주의 사항 <i class="pi pi-exclamation-triangle" style="color:#ff4b4b; margin-left:5px;"></i></span> <br />
				<br />
				학생증 재발급 시<br />
				이전의 출입했던 기록들은 <br />찾을 수 없습니다.
				<br />
				<br />
				유의해 주시길 바랍니다.
				<br />
			</p>
			<p v-else class="password-warning__detail">
				<br /><span class="password-focus"> 주의 사항 <i class="pi pi-exclamation-triangle" style="color:#ff4b4b; margin-left:5px;"></i></span> <br />
				<br />
				간편 비밀번호는 블록체인 네트워크 상 <br />지갑의 비밀번호 입니다.
				<br />
				<br />
				지갑의 비밀번호는 사용자 개인만 알 수 있고, 해당 비밀번호를 분실하게 될 경우 모든 책임은 사용자에게 있습니다.
				<br />
			</p>
			<template #footer>
				<Button label="취소" icon="pi pi-times" class="border-none p-button-outlined" @click="closeWarningModal" autofocus />
				<Button label="확인" icon="pi pi-check" class="border-none p-button-outlined" @click="openPasswordModal('regenerate')" autofocus />
			</template>
		</Dialog>
	</div>
</template>
<script>
import SimplePassword from "../../components/SimplePasswd/SimplePasswd"

export default {
	name: "LoginForm",
	components: { SimplePassword },
	props: { name: String, imgUrl: String, email: String, find: null },
	data() {
		return {
			studentId: "",
			failId: false,
			failIdText: "",
			failMajor: false,
			failMajorText: "",
			selectedGroupedMajor: null,
			displayPasswordModal: false,
			displayWarningModal: false,
			displayBasic: false,
			successSignUp: false,
			successPassword: false,
			successFindDID: false,
			failCount: JSON.parse(localStorage.getItem("wrongPassword")) ? JSON.parse(localStorage.getItem("wrongPassword")) : 1,
			regenerateDID: JSON.parse(localStorage.getItem("wrongPassword")) >= 5 ? true : false,
			checkRegenerateDID: false,
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
			members: {
				name: "",
				studentId: "",
				major: "",
				userImage: "",
			},
			darkModeState: this.$shared.checkDarkMode(),
		}
	},
	mounted() {
		setTimeout(() => {
			this.openBasicModal()
		}, 600)
	},
	methods: {
		setMembers() {
			this.members.name = this.name
			this.members.email = this.email
			this.members.studentId = this.studentId
			this.members.major = this.selectedGroupedMajor.label
			this.members.userImage = this.imgUrl
			localStorage.setItem("members", JSON.stringify(this.members))
		},
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
			if (this.find === "true") {
				this.findAccount()
			} else {
				this.signUp()
			}
		},
		//회원가입
		async signUp() {
			this.isFirstMember = false
			try {
				const response = await this.$axios.post("/api/members/", {}, { params: { key: this.$sha256("이팔청춘의 U-PASS"), major: this.selectedGroupedMajor.label, stdnum: this.studentId, name: this.name, email: this.email } })
				if (response.status === 201) {
					this.successSignUp = true
					this.showSuccess("회원가입 완료", "회원가입이 완료되었습니다. \n간편비밀번호를 설정해주세요.")
					localStorage.setItem("key", response.data.user_key)
					this.setMembers()
					this.closeBasicModal()
				}
			} catch (error) {
				if (error.response) {
					//중복 회원가입시
					if (error.response.data.msg === "stdnum is already exists") {
						this.showError("회원가입 오류", "이미 등록된 학번입니다.")
						this.studentId = ""
						this.$refs.studentId.$el.focus()
					} else if (error.response.data.msg === "Email is already exists") {
						this.showError("회원가입 오류", "이미 등록된 이메일입니다.\n잠시후 메인 화면으로 이동합니다.")
						setTimeout(() => {
							this.$router.replace("/login")
						}, 3000)
					}
				}
			}
		},
		//did 발급
		async generateUserDID() {
			try {
				const response = await this.$axios.post("/api/generatedid/", {}, { params: { key: localStorage.getItem("key"), SimplePassword: localStorage.getItem("simplePassword") } })
				if (response.status === 201) {
					localStorage.setItem("did", response.data.did)
					localStorage.removeItem("wrongPassword")
					if (this.checkRegenerateDID) {
						this.showSuccess("학생증 재발급 완료", "학생증 재발급이 완료되었습니다. \n잠시후 학생증 페이지로 이동합니다.")
					} else {
						this.showSuccess("학생증 발급 완료", "학생증 발급이 완료되었습니다.")
					}
					setTimeout(() => {
						this.$router.replace("/")
					}, 2000)
				}
			} catch (error) {
				if (error.response) {
					this.showError("DID발급 오류", "죄송합니다. \nDID 발급에 오류가 있습니다.")
				}
			}
		},
		//did 찾기
		async getUserDID() {
			try {
				const response = await this.$axios.get("/api/getdid/", { params: { key: localStorage.getItem("key"), SimplePassword: localStorage.getItem("simplePassword") } })
				if (response.status === 201) {
					this.successFindDID = true
					localStorage.setItem("did", response.data.did)
					localStorage.removeItem("wrongPassword")
					localStorage.removeItem("findDid")
					this.showSuccess("학생증 찾기 성공", "학생증 찾기를 성공하였습니다. \n잠시후 학생증 페이지로 이동합니다.")
					setTimeout(() => {
						this.$router.replace("/")
					}, 2000)
				}
			} catch (error) {
				if (error.response) {
					if (error.response.data.msg === "DID를 찾을 수 없습니다.") {
						JSON.stringify(localStorage.setItem("wrongPassword", this.failCount++))
						if (JSON.parse(localStorage.getItem("wrongPassword")) === 5) this.regenerateDID = true
						this.showError("학생증 찾기 오류", "간편 비밀번호를 " + JSON.parse(localStorage.getItem("wrongPassword")) + "회 틀렸습니다. \n5회 오류시 학생증 재발급이 가능합니다.")
						this.successPassword = false
					}
				}
			}
		},
		//회원 찾기
		async findAccount() {
			try {
				const response = await this.$axios.post("/api/findmyinfo/", {}, { params: { key: this.$sha256("이팔청춘의 U-PASS"), major: this.selectedGroupedMajor.label, stdnum: this.studentId, name: this.name, email: this.email } })
				if (response.status === 201) {
					this.showSuccess("회원 정보 입력 성공", "올바른 회원입니다. \n간편 비밀번호를 입력해주세요. ")
					localStorage.setItem("key", response.data.user_key)
					JSON.stringify(localStorage.setItem("findDid", true))
					this.successSignUp = true
					this.setMembers()
				}
			} catch (error) {
				if (error.response) {
					if (error.response.data.msg === "가입되지 않은 email입니다.") {
						this.showError("회원 찾기 오류", "가입된 이메일이 없습니다. \n잠시후 메인 화면으로 돌아갑니다.")
						setTimeout(() => {
							this.$router.replace("/login")
						}, 2000)
					} else if (error.response.data.msg === "잘못된 정보를 입력하였습니다.") {
						this.showError("회원 찾기 오류", "잘못된 정보를 입력하였습니다. \n다시 입력해주세요.")
						this.studentId = ""
						this.selectedGroupedMajor = null
						this.$refs.studentId.$el.focus()
					}
				}
			}
		},
		//간편 비밀번호 모달
		openPasswordModal(state) {
			if (state === "regenerate") this.checkRegenerateDID = true
			console.log(this.checkRegenerateDID)
			this.closeWarningModal()
			this.displayPasswordModal = true
		},
		closePasswordModal() {
			if (this.checkRegenerateDID) {
				this.generateUserDID()
			} else if (this.find !== "true") {
				this.openBasicModal()
				this.showSuccess("간편비밀번호 설정 완료", "간편비밀번호 설정이 완료되었습니다. \n학생증을 발급해주세요.")
			}
			this.successPassword = true
			this.displayPasswordModal = false
		},

		//기본 모달
		openBasicModal() {
			this.displayBasic = true
		},
		closeBasicModal() {
			this.displayBasic = false
		},

		//간편 비밀번호 경고 모달
		openWarningModal() {
			this.displayWarningModal = true
		},
		closeWarningModal() {
			this.displayWarningModal = false
		},

		//에러 토스트 메시지
		showError(summaryText, detailText) {
			this.$toast.add({ severity: "error", summary: summaryText, detail: detailText, life: 3000 })
		},
		//성공 토스트 메시지
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
	white-space: pre-wrap;
	font-size: small;
}
.password__warning-modal .p-dialog-content {
	border-radius: 20px 20px 0 0;
}
.password__warning-modal .p-dialog-footer {
	border-top: 1px solid #e2e2e2;
	padding: 1rem 1rem 1rem 1rem;
	border-radius: 0 0 20px 20px;
	text-align: center;
}
button.p-button.p-component.did-reissued {
	background: #fbc02d;
	border: 1px solid #fbc02d;
}
</style>
