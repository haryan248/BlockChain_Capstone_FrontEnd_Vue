<template>
	<div class="login__form-container" :class="{ dark__mode: darkModeState }">
		<div class="loadpassword__button"></div>
		<!-- loading progress bar -->
		<div v-if="loading" class="loading__overlay-loginForm">
			<div class="loading__progressbar">
				<h5 class="loginForm_loading">{{ loadingText }}</h5>
				<ProgressBar mode="indeterminate" style="height: .5em" />
			</div>
		</div>
		<Dialog class="login-form" v-model:visible="displayBasic" :showHeader="false" position="bottom" :style="{ width: '80vw' }">
			<!-- member registration information input screen -->
			<div class="login__form-box">
				<div class="p-fluid">
					<div class="sign-in">
						<div class="p-field">
							<label for="studentId" ref="usernameInput" class="input__form">학번 *</label>
							<InputText ref="studentId" :class="{ 'p-invalid': failId }" autocomplete="off" id="studentId" placeholder="학번" type="text" :maxlength="9" v-model="studentId" :disabled="successSignUp" />
							<small v-if="failId" class="p-error" id="studentid-help">{{ failIdText }}</small>
							<small v-else id="studentid-help">학번을 입력해주세요.</small>
						</div>
						<div class="p-field">
							<label for="major" class="input__form" ref="majorInput">학과 *</label>
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
							<small v-if="failMajor" class="p-error" id="usermajor-help">{{ failMajorText }}</small>
							<small v-else id="usermajor-help">학과를 선택해주세요.</small>
						</div>
						<div v-if="find !== 'true'" class="p-field">
							<label for="adminCode" class="input__form" ref="adminCodeInput"
								>관리자 코드
								<span class="p-field-checkbox" style="display:inline; position: absolute;right: 24px;">
									<Checkbox name="관리자" class="border-none" value="admin" v-model="admin" :binary="true" :disabled="successSignUp || checkAdminCodeState || (selectedGroupedMajor === null && studentId === '')" />
								</span>
							</label>
							<div v-if="admin">
								<InputText :class="{ 'p-invalid': failAdmin && admin }" autocomplete="off" id="adminCode" placeholder="관리자 코드" type="text" v-model="adminCode" :disabled="checkAdminCodeState" />
								<small v-if="failAdmin && admin" class="p-error" id="admincode-help">{{ failAdminText }}</small>
								<small v-else id="admincode-help">관리자인 경우 입력해주세요.</small>
							</div>
						</div>
						<!-- find student ID button -->
						<div v-if="find === 'true'">
							<Button label="회원 정보 입력" icon="pi pi-pencil" iconPos="right" :class="{ 'p-button-outlined': !successSignUp }" :disabled="successSignUp" @click="checkValidate" />
							<Button v-if="successSignUp" label="간편 비밀번호 입력" icon="pi pi-lock" iconPos="right" class="login__form-button" :class="{ 'p-button-outlined': !successPassword }" :disabled="successPassword" @click="openPasswordModal" />
							<Button v-if="successPassword" label="학생증 찾기" icon="pi pi-search" iconPos="right" class="login__form-button" :class="{ 'p-button-outlined': !successFindDID }" :disabled="successFindDID" @click="getUserDID" />
							<Button v-if="regenerateDID" label="학생증 재발급" icon="pi pi-clone" iconPos="right" class="did-reissued" @click="openWarningModal" :disabled="!successSignUp" />
							<Button v-if="successSignUp && !successPassword" label="간편 비밀번호 찾기" icon="pi pi-cloud-download" iconPos="right" class="p-button-info login__form-button" @click="getPassword" />
						</div>
						<!-- sign up button -->
						<div v-else>
							<Button v-if="admin" label="관리자 코드 확인" icon="pi pi-key" iconPos="right" :class="{ 'p-button-outlined': !successAdminCode }" :disabled="successAdminCode" @click="checkAdminCode" style="margin-bottom: 20px;" />
							<Button label="회원 정보 입력" icon="pi pi-check" iconPos="right" :class="{ 'p-button-outlined': !successSignUp }" :disabled="successSignUp" @click="checkValidate" />
							<Button v-if="successSignUp" label="간편 비밀번호 설정" icon="pi pi-lock" iconPos="right" class="login__form-button" :class="{ 'p-button-outlined': !successPassword }" :disabled="successPassword" @click="openWarningModal" />
							<Button
								v-if="successPassword"
								label="학생증 발급"
								icon="pi pi-user-plus"
								iconPos="right"
								class="p-button-outlined login__form-button"
								:class="{ 'p-button-outlined': !successGenerateDID }"
								:disabled="successGenerateDID"
								@click="generateUserDID"
							/>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
		<!-- password input/setting modal -->
		<Dialog class="password-modal p-dialog-maximized" :class="{ dark__mode: darkModeState }" :showHeader="false" v-model:visible="displayPasswordModal" :style="{ width: '100vw', height: '100vh' }" :modal="true">
			<SimplePassword :title="find === 'true' ? '간편 비밀번호 입력' : '간편 비밀번호 설정'" :isSetting="true" @setCorrectPassword="closePasswordModal" />
		</Dialog>
		<!-- find password modal -->
		<Dialog class="password__finding-modal" header="" :showHeader="false" v-model:visible="displayFindPasswordModal" :style="{ width: '80vw' }" :modal="true">
			<div class="password-finding__detail">
				<br />
				<br />
				<span class="detail__title"> 간편 비밀번호 </span>
				<br />
				<br />
				<p v-if="simplePassword.length === 0">백업한 비밀번호가 존재하지 않습니다.</p>
				<p v-else class="password__text">{{ simplePassword }}</p>
			</div>
			<template #footer>
				<Button label="확인" icon="pi pi-check" class="border-none p-button-outlined" @click="closeFindPasswordModal" />
			</template>
		</Dialog>
		<!-- warning modal when setting password -->
		<Dialog class="password__warning-modal" header="" :showHeader="false" v-model:visible="displayWarningModal" :style="{ width: '80vw' }" :modal="true">
			<p v-if="regenerateDID" class="password-warning__detail">
				<br /><span class="password-focus"> 주의 사항 <i class="pi pi-exclamation-triangle" style="color:#ff4b4b; margin-left:5px;"></i></span> <br />
				<br />
				<br />
				악의적으로 학생증을 재발급시 <br />사용자에게 불이익이 갈 수 있습니다.
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
				<Button label="취소" icon="pi pi-times" class="border-none p-button-outlined" @click="closeWarningModal" />
				<Button label="확인" icon="pi pi-check" class="border-none p-button-outlined" @click="regenerateDID ? openPasswordModal('regenerate') : openPasswordModal()" />
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
			failAdmin: false,
			failAdminText: "",
			selectedGroupedMajor: null,
			displayPasswordModal: false,
			displayWarningModal: false,
			displayFindPasswordModal: false,
			displayBasic: false,
			successSignUp: false,
			successPassword: false,
			successFindDID: false,
			successGenerateDID: false,
			successAdminCode: false,
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
				email: "",
				studentId: "",
				major: "",
				userImage: "",
			},
			darkModeState: this.$shared.checkDarkMode(),
			loading: false,
			loadingText: "",
			simplePassword: "",
			tempKey: "",
			admin: false,
			adminCode: "",
			checkAdminCodeState: false,
		}
	},
	mounted() {
		setTimeout(() => {
			this.openBasicModal()
		}, 600)
	},
	methods: {
		// 개인정보 설정
		setMembers() {
			this.members.name = this.name
			this.members.email = this.email
			this.members.studentId = this.studentId
			this.members.major = this.selectedGroupedMajor.label
			this.members.userImage = this.imgUrl
			localStorage.setItem("members", JSON.stringify(this.members))
		},
		// 입력창 유효성 검사
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
			} else if (this.admin === true) {
				if (this.adminCode.length === 0) {
					this.failId = false
					this.failMajor = false
					this.failAdmin = true
					this.$refs.adminCodeInput.focus()
					this.failAdminText = "관리자 코드를 입력해주세요."
					return
				} else if (this.checkAdminCodeState === false) {
					this.failId = false
					this.failMajor = false
					this.failAdmin = true
					console.log(this.$refs.adminCodeInput)
					this.$refs.adminCodeInput.focus()
					this.failAdminText = "관리자 코드를 검증해주세요."
					return
				}
			}
			this.failMajor = false
			if (this.find === "true") {
				// 회원 찾기 시
				this.findAccount()
			} else {
				// 회원가입 시
				this.getUserKey()
			}
		},
		// User key 요청
		async getUserKey() {
			this.isFirstMember = false
			try {
				const response = await this.$axios.get("/api/members/", { params: { key: this.$sha256("이팔청춘의 U-PASS"), major: this.selectedGroupedMajor.label, std_num: this.studentId, name: this.name, email: this.email } })
				if (response.status === 201) {
					this.successSignUp = true
					this.showSuccess("회원정보 입력 완료", "회원 정보 입력이 완료되었습니다. \n간편비밀번호를 설정해주세요.")
					this.tempKey = response.data.user_key
					this.setMembers()
				}
			} catch (error) {
				// 가입된 회원일 때
				if (error.response.data.msg === "Email is already exists") {
					localStorage.removeItem("key")
					this.showError("회원가입 오류", "이미 등록된 이메일입니다.\n잠시후 메인 화면으로 이동합니다.")
					setTimeout(() => {
						this.$router.replace("/login")
					}, 2000)
				} else if (error.response.data.msg === "user info is not exists in blockchain") {
					this.showError("회원 정보 입력 오류", "잘못된 정보를 입력하였습니다. \n다시 입력해주세요.")
					this.studentId = ""
					this.selectedGroupedMajor = null
					this.$refs.studentId.$el.focus()
				}
			}
		},
		// did 발급 및 회원가입
		async generateUserDID() {
			this.loading = true
			this.loadingText = "학생증을 발급하는 중입니다."
			try {
				const response = await this.$axios.post(
					"/api/members/",
					{},
					{
						params: {
							key: this.tempKey,
							major: this.selectedGroupedMajor.label,
							std_num: this.studentId,
							email: this.email,
							simple_password: localStorage.getItem("simplePassword"),
							position: this.checkAdminCodeState ? "admin" : "",
						},
					}
				)
				if (response.status === 201) {
					this.successGenerateDID = true
					localStorage.setItem("key", this.tempKey)
					localStorage.setItem("did", response.data.did)
					if (this.checkAdminCodeState) localStorage.setItem("adminKey", this.$sha256(this.adminCode))
					localStorage.removeItem("wrongPassword")
					this.showSuccess("학생증 발급 완료", "학생증 발급이 완료되었습니다. \n 잠시후 학생증 페이지로 이동합니다.")
					setTimeout(() => {
						this.$router.replace("/")
					}, 1500)
				}
			} catch (error) {
				// DID 발급 오류 시
				if (error.response) {
					if (error.response.data.msg === "DID generate error") {
						this.showError("DID발급 오류", "죄송합니다. \nDID 발급에 오류가 있습니다.")
					}
				}
			}
			this.loading = false
		},
		// did 재발급
		async regenerateUserDID() {
			this.loading = true
			this.loadingText = "학생증을 재발급하는 중입니다."
			try {
				const response = await this.$axios.post("/api/regeneratedid/", {}, { params: { key: this.tempKey, std_num: this.members.studentId, simple_password: localStorage.getItem("simplePassword") } })
				if (response.status === 201) {
					localStorage.setItem("key", this.tempKey)
					localStorage.setItem("did", response.data.did)
					localStorage.removeItem("wrongPassword")
					this.showSuccess("학생증 재발급 완료", "학생증 재발급이 완료되었습니다. \n잠시후 학생증 페이지로 이동합니다.")
					setTimeout(() => {
						this.$router.replace("/")
					}, 1500)
				}
			} catch (error) {
				if (error.response) {
					// DID 재발급 오류 시
					if (error.response.data.msg === "DID regenerate error") {
						this.showError("DID 재발급 오류", "죄송합니다. \nDID 재발급에 오류가 있습니다.")
					}
				}
			}
			this.loading = false
		},
		// did 찾기
		async getUserDID() {
			this.loading = true
			this.loadingText = "학생증을 불러오는 중입니다."
			try {
				const response = await this.$axios.get("/api/getdid/", { params: { key: this.tempKey, simple_password: localStorage.getItem("simplePassword") } })
				if (response.status === 201) {
					this.successFindDID = true
					localStorage.setItem("key", this.tempKey)
					localStorage.setItem("did", response.data.did)
					localStorage.removeItem("wrongPassword")
					localStorage.removeItem("findDid")
					this.showSuccess("학생증 불러오기 성공", "학생증 찾기를 성공하였습니다. \n잠시후 학생증 페이지로 이동합니다.")
					setTimeout(() => {
						this.$router.replace("/")
					}, 1500)
				}
			} catch (error) {
				if (error.response) {
					// 해당하는 DID 정보가 없을 때
					if (error.response.data.msg === "DID not found") {
						JSON.stringify(localStorage.setItem("wrongPassword", this.failCount++))
						if (JSON.parse(localStorage.getItem("wrongPassword")) === 5) this.regenerateDID = true
						this.showError("학생증 찾기 오류", "간편 비밀번호를 " + JSON.parse(localStorage.getItem("wrongPassword")) + "회 틀렸습니다. \n5회 오류시 학생증 재발급이 가능합니다.")
						this.successPassword = false
					}
				}
			}
			this.loading = false
		},
		// 회원 찾기
		async findAccount() {
			try {
				const response = await this.$axios.get("/api/findmyinfo/", { params: { key: this.$sha256("이팔청춘의 U-PASS"), major: this.selectedGroupedMajor.label, std_num: this.studentId, email: this.email } })
				if (response.status === 201) {
					this.showSuccess("회원 정보 입력 성공", "올바른 회원입니다. \n간편 비밀번호를 입력해주세요. ")
					this.tempKey = response.data.user_key
					if (response.data.admin_key !== null || response.data.admin_key !== undefined) localStorage.setItem("adminKey", response.data.admin_key)
					JSON.stringify(localStorage.setItem("findDid", true))
					this.successSignUp = true
					this.setMembers()
				}
			} catch (error) {
				if (error.response) {
					// 가입되지 않은 이메일 일때
					if (error.response.data.msg === "not join email") {
						this.showError("회원 찾기 오류", "가입된 이메일이 없습니다. \n잠시후 메인 화면으로 돌아갑니다.")
						setTimeout(() => {
							this.$router.replace("/login")
						}, 2000)
					}
					// 사용자가 잘못된 정보를 입력했을 때
					else if (error.response.data.msg === "user info is not exists in blockchain") {
						this.showError("회원 찾기 오류", "잘못된 정보를 입력하였습니다. \n다시 입력해주세요.")
						this.studentId = ""
						this.selectedGroupedMajor = null
						this.$refs.studentId.$el.focus()
					}
				}
			}
		},
		// 간편 비밀번호 찾기
		async getPassword() {
			this.openFindPasswordModal()
			const response = await this.$axios.get("/api/password/", { params: { key: this.tempKey } })
			if (response.status === 201) {
				this.simplePassword = response.data.wallet_key
			}
		},
		// 관리자 코드 검증
		async checkAdminCode() {
			this.checkValidate()
			if (this.failMajor === false && this.failId === false) {
				try {
					const response = await this.$axios.get("/api/admincheck/", { params: { key: this.$sha256(this.adminCode) } })
					if (response.status === 201) {
						this.checkAdminCodeState = true
						this.successAdminCode = true
						this.failAdmin = false
						this.showSuccess("관리자 코드 인증 성공", "관리자 검증이 완료되었습니다.")
					}
				} catch (error) {
					if (error.response) {
						// 올바르지 않은 검증키일 때
						if (error.response.data.msg === "Key is error") {
							this.showError("관리자 코드 인증 실패", "올바르지 않은 관리자 코드입니다.")
							this.adminCode = ""
						}
					}
				}
			}
		},
		// 간편 비밀번호 찾기 모달 토글 함수
		openFindPasswordModal() {
			this.displayFindPasswordModal = true
		},
		closeFindPasswordModal() {
			this.displayFindPasswordModal = false
		},

		// 간편 비밀번호 모달 토글 함수
		openPasswordModal(state) {
			if (state === "regenerate") this.checkRegenerateDID = true
			this.closeWarningModal()
			this.displayPasswordModal = true
		},
		closePasswordModal() {
			if (this.checkRegenerateDID) {
				this.regenerateUserDID()
			} else if (this.find !== "true") {
				this.openBasicModal()
				this.showSuccess("간편비밀번호 설정 완료", "간편비밀번호 설정이 완료되었습니다. \n학생증을 발급해주세요.")
			}
			this.successPassword = true
			this.displayPasswordModal = false
		},

		// 기본 모달 토글 함수
		openBasicModal() {
			this.displayBasic = true
		},
		closeBasicModal() {
			this.displayBasic = false
		},

		// 간편 비밀번호 경고 모달 토글 함수
		openWarningModal() {
			this.displayWarningModal = true
		},
		closeWarningModal() {
			this.displayWarningModal = false
		},

		// 성공 토스트 메시지
		showSuccess(summaryText, detailText) {
			this.$toast.add({ severity: "success", summary: summaryText, detail: detailText, life: 2000 })
		},
		// 에러 토스트 메시지
		showError(summaryText, detailText) {
			this.$toast.add({ severity: "error", summary: summaryText, detail: detailText, life: 2000 })
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
.password__warning-modal .p-dialog-content,
.password__finding-modal .p-dialog-content {
	border-radius: 20px 20px 0 0;
}

.password__warning-modal .p-dialog-footer,
.password__finding-modal .p-dialog-footer {
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
