<template>
	<div>
		<Header :title="'U-PASS'" @confirmSetting="confirmSetting" />
		<div class="container bg-gray" :class="{ 'bg-dark': darkModeState }">
			<div>
				<div class="student-content">
					<HeaderSection :title="'학생증'" :subtitle="'자신의 정보를 간편하게 관리해보세요.'" :darkModeState="darkModeState" />
					<Dialog class="QR-modal" :showHeader="false" v-model:visible="displayStudentModal" :style="{ width: '80vw' }" :baseZIndex="-1000" :class="{ dark__mode: darkModeState }">
						<!-- 학생증 카드 -->
						<div class="student-info">
							<div class="student-card">
								<div class="student-wrapper">
									<div class="box" :class="{ dark__mode: darkModeState }">
										<div class="student-card__item">
											<p class="item__univ">경기대학교</p>
											<div class="item__img">
												<div class="student__img" :style="{ 'background-image': 'url(' + userImage + ')' }"></div>
											</div>
											<p class="item__detail">학번 : {{ studentId }}</p>
											<p class="item__detail">성명 : {{ name }}</p>
											<p class="item__detail">소속(학과) : {{ major }}</p>
										</div>
									</div>
								</div>
							</div>
							<!-- 학생증 누를때 간편번호 입력 -->
							<Dialog class="password-modal p-dialog-maximized" :class="{ dark__mode: darkModeState }" header="" v-model:visible="displayPasswordModal" :style="{ width: '100vw', height: '100vh' }" :modal="true">
								<SimplePassword :title="'간편 비밀번호 입력'" :isSetting="false" @correctPassword="closePasswordModal" />
							</Dialog>
							<!-- qr 코드 화면 부분 -->
							<Dialog class="QR-modal" :class="{ dark__mode: darkModeState }" header="Header" :showHeader="false" v-model:visible="displayQRModal" :style="{ width: '80vw' }" :modal="true">
								<QRVerification @goBack="closeQRModal" :isStudentId="true" :did="DID" :SimplePassword="SimplePassword" />
							</Dialog>
						</div>
					</Dialog>
					<!-- 간편 비밀번호 없을때 설정 화면 띄우는 부분 -->
					<Dialog class="password-modal p-dialog-maximized" :class="{ dark__mode: darkModeState }" header="" :showHeader="false" v-model:visible="displayPasswordModalForNone" :style="{ width: '100vw', height: '100vh' }" :modal="true">
						<SimplePassword :title="'간편 비밀번호 설정'" :isSetting="true" @setCorrectPassword="closePasswordModalForNone" />
					</Dialog>
					<div class="student__id-content"></div>
					<div class="student__button">
						<Button label="학생증" icon="pi pi-id-card" @click="openPasswordModal" />
					</div>
				</div>

				<!-- 학생증 또는 간편비밀번호 설정되지 않았을때 화면 띄우는 부분 -->
				<Dialog class="did__error-modal" header="" :showHeader="false" v-model:visible="displayDIDModal" :style="{ width: '80vw' }" :modal="true">
					<p v-if="SimplePassword === null" class="password-warning__detail">
						<br /><span class="password-focus"> 오류 발생 <i class="pi pi-exclamation-triangle" style="color:#ff4b4b; margin-left:5px;"></i></span> <br />
						<br />
						<span class="focus__color">간편 비밀번호</span>를 설정하는 도중에 오류가 발생하였거나, 어플이 종료되었을 수 있습니다. <br /><br />
						기기에 <span class="focus__color">간편 비밀번호</span> 정보가 없으므로 <br /><span class="focus__color">간편 비밀번호</span>를 설정해주세요.
						<br />
					</p>
					<p v-else-if="DID === null" class="password-warning__detail">
						<br /><span class="password-focus"> 오류 발생 <i class="pi pi-exclamation-triangle" style="color:#ff4b4b; margin-left:5px;"></i></span> <br />
						<br />
						<span class="focus__color">DID (Decentralized Identifier)</span>을 발급하는 도중에 오류가 발생하였거나, 어플이 종료되었을 수 있습니다. <br /><br />
						기기에 <span class="focus__color">DID(학생증)</span> 정보가 없으므로 <span class="focus__color">DID(학생증)</span>을 발급해주세요.
						<br />
					</p>

					<template #footer>
						<div style="display: grid; align-items: center; justify-content: center;">
							<Button
								v-if="SimplePassword === null"
								label="간편 비밀번호 입력"
								style="margin-bottom:10px;"
								icon="pi pi-lock"
								iconPos="right"
								class="did-issued"
								:class="{ 'p-button-outlined': !successPassword }"
								:disabled="successPassword"
								@click="openPasswordModalForNone"
							/>
							<Button label="학생증 발급" icon="pi pi-user-plus" iconPos="right" class="p-button-outlined did-issued" :disabled="!successPassword" @click="generateUserDID" />
						</div>
					</template>
				</Dialog>
			</div>
		</div>
	</div>
	<BottomNav :darkModeState="darkModeState" />
</template>
<script>
import QRVerification from "../../components/QRVerification/QRVerification"
import HeaderSection from "../../components/HeaderSection/HeaderSection"
import SimplePassword from "../../components/SimplePasswd/SimplePasswd"

export default {
	name: "StudentId",
	components: {
		QRVerification,
		HeaderSection,
		SimplePassword,
	},
	data() {
		return {
			displayQRModal: false,
			displayPasswordModal: false,
			displayPasswordModalForNone: false,
			displayStudentModal: false,
			displayDIDModal: false,
			displayWarningModal: false,
			name: "",
			studentId: "",
			major: "",
			userImage: "",
			DID: localStorage.getItem("did"),
			SimplePassword: localStorage.getItem("simplePassword"),
			DIDPasswd: "",
			members: JSON.parse(localStorage.getItem("members")),
			successPassword: false,
			darkModeState: this.$shared.checkDarkMode(),
		}
	},
	created() {
		this.setMembers()
	},
	mounted() {
		//간편 비밀번호 또는 did 발급이 안됐을 때
		if (this.SimplePassword === null) {
			this.openDIDModal()
		} else if (this.DID === null) {
			this.successPassword = true
			this.openDIDModal()
		} else {
			this.openStudentModal()
			this.$shared.checkGoogleLogin(this.$gAuth)
		}
	},
	watch: {},
	methods: {
		confirmSetting() {
			this.darkModeState = this.$shared.checkDarkMode()
		},
		setMembers() {
			this.name = this.members.name
			this.studentId = this.members.studentId
			this.major = this.members.major
			this.userImage = this.members.userImage
		},
		// user 키 요청
		async getMember() {
			const response = await this.$axios.get("/api/members/", { params: { key: localStorage.getItem("key") } })
			if (response.status === 201) {
				this.name = this.members.name = response.data.name
				this.studentId = this.members.studentId = response.data.stdnum
				this.major = this.members.major = response.data.major
				this.userImage = this.members.userImage = response.data.image
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
							key: localStorage.getItem("key"),
							major: this.members.major,
							stdnum: this.members.studentId,
							name: this.members.name,
							email: this.members.email,
							studentId: this.members.studentId,
							SimplePassword: localStorage.getItem("simplePassword"),
						},
					}
				)
				if (response.status === 201) {
					localStorage.setItem("did", response.data.did)
					localStorage.removeItem("wrongPassword")
					this.showSuccess("학생증 발급 완료", "학생증 발급이 완료되었습니다.")
				}
			} catch (error) {
				if (error.response) {
					if (error.response.data.msg === "DID 발급 오류") {
						this.showError("DID발급 오류", "죄송합니다. \nDID 발급에 오류가 있습니다.")
					}
				}
			}
			this.loading = false
		},

		openQRModal() {
			this.displayQRModal = true
		},
		closeQRModal() {
			this.displayQRModal = false
		},
		openPasswordModal() {
			this.displayPasswordModal = true
		},
		closePasswordModal() {
			this.openQRModal()
			this.displayPasswordModal = false
		},
		openPasswordModalForNone() {
			this.closeStudentModal()
			this.displayPasswordModalForNone = true
		},
		closePasswordModalForNone() {
			this.displayPasswordModalForNone = false
			this.successPassword = true
			this.SimplePassword = localStorage.getItem("simplePassword")
			this.showSuccess("간편비밀번호 설정 완료", "간편비밀번호 설정이 완료되었습니다.")
		},
		openDIDModal() {
			this.closeStudentModal()
			this.displayDIDModal = true
		},
		closeDIDModal() {
			this.displayDIDModal = false
		},
		//학생증 모달
		openStudentModal() {
			this.displayStudentModal = true
		},
		closeStudentModal() {
			this.displayStudentModal = false
		},
		//간편 비밀번호 경고 모달
		openWarningModal() {
			this.displayWarningModal = true
		},
		closeWarningModal() {
			this.displayWarningModal = false
		},

		// 토스트 메시지
		showSuccess(summaryText, detailText) {
			this.$toast.add({ severity: "success", summary: summaryText, detail: detailText, life: 3000 })
		},
		showError(summaryText, detailText) {
			this.$toast.add({ severity: "error", summary: summaryText, detail: detailText, life: 3000 })
		},
	},
}
</script>
<style scoped>
@import "./student-id.css";
</style>
<style>
.p-dialog {
	border-radius: 20px;
}
.p-dialog.p-component.QR-modal {
	overflow: hidden;
	border-radius: 20px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.05), 0 5px 20px rgba(0, 0, 0, 0.05);
}
.p-dialog.p-component.did__error-modal {
	overflow: hidden;
	border-radius: 20px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.05), 0 5px 20px rgba(0, 0, 0, 0.05);
}
.p-dialog.p-component.password-modal.p-dialog-maximized .p-dialog-content {
	padding: 0 !important;
}

.did__error-modal .p-dialog-content {
	border-radius: 20px 20px 0 0;
}
.did__error-modal .p-dialog-footer {
	border-top: 1px solid #e2e2e2;
	padding: 1rem 1rem 1rem 1rem;
	border-radius: 0 0 20px 20px;
	text-align: center;
}

/* 다크모드 */
.p-dialog.p-component.QR-modal.dark__mode .p-dialog-content {
	background: #333536;
}
</style>
