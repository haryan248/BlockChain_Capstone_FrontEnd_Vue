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
				<!-- 학생증 발급되지 않았을때 화면 띄우는 부분 -->
				<Dialog class="did__error-modal" header="" :showHeader="false" v-model:visible="displayDIDModal" :style="{ width: '80vw', zIndex: 900 }" :modal="true">
					<p v-if="checkDid" class="password-warning__detail">
						<br /><span class="password-focus"> DID 오류 <i class="pi pi-exclamation-triangle" style="color:#ff4b4b; margin-left:5px;"></i></span> <br />
						<br />
						학생증 찾기 도중에 오류가 발생하였거나, 어플이 종료되었을 수 있습니다.
						<br /><br />
						기기에 DID정보가 없으므로 학생증을 <br />발급해주세요.
						<br />
					</p>
					<p v-else class="password-warning__detail">
						<br /><span class="password-focus"> DID 오류 <i class="pi pi-exclamation-triangle" style="color:#ff4b4b; margin-left:5px;"></i></span> <br />
						<br />
						DID (Decentralized Identifier)을 발급하는 도중에 오류가 발생하였거나, 어플이 종료되었을 수 있습니다.
						<br /><br />
						기기에 DID정보가 없으므로 학생증을 발급해주세요.
						<br />
					</p>
					<template #footer>
						<div v-if="checkDid" style="display: grid; align-items: center; justify-content: center;">
							<Button
								label="간편 비밀번호 입력"
								style="margin-bottom:10px;"
								icon="pi pi-lock"
								iconPos="right"
								class="did-issued"
								:class="{ 'p-button-outlined': !successPassword }"
								:disabled="successPassword"
								@click="openPasswordModalForNone"
							/>
							<Button
								label="학생증 찾기"
								icon="pi pi-search"
								style="margin-bottom:10px;"
								iconPos="right"
								class="p-button-outlined did-issued"
								:class="{ 'p-button-outlined': !successFindDID }"
								:disabled="!successFindDID"
								@click="getUserDID"
							/>
							<Button v-if="regenerateDID" label="학생증 재발급" icon="pi pi-clone" iconPos="right" class="did-reissued" @click="openWarningModal" />
						</div>
						<Button v-else label="학생증 발급" icon="pi pi-user-plus" iconPos="right" class="p-button-outlined did-issued" @click="generateUserDID" />
					</template>
				</Dialog>

				<!-- 비밀번호 설정시 경고모달 -->
				<Dialog class="password__warning-modal" header="" :showHeader="false" v-model:visible="displayWarningModal" :style="{ width: '80vw' }" :modal="true">
					<p v-if="regenerateDID" class="password-warning__detail">
						<br /><span class="password-focus"> 주의 사항 <i class="pi pi-exclamation-triangle" style="color:#ff4b4b; margin-left:5px;"></i></span> <br />
						<br />
						학생증 재발급 시 이전의 출입했던 <br />기록은 찾을 수 없습니다.
						<br />
						<br />
						유의해 주시길 바랍니다.
						<br />
					</p>
					<template #footer>
						<Button label="취소" icon="pi pi-times" class="border-none p-button-outlined" @click="closeWarningModal" autofocus />
						<Button label="확인" icon="pi pi-check" class="border-none p-button-outlined" @click="openPasswordModalForNone('regenerate')" autofocus />
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
			checkDid: JSON.parse(localStorage.getItem("findDid")),
			failCount: JSON.parse(localStorage.getItem("wrongPassword")) ? JSON.parse(localStorage.getItem("wrongPassword")) : 1,
			regenerateDID: JSON.parse(localStorage.getItem("wrongPassword")) >= 5 ? true : false,
			checkRegenerateDID: false,
			successPassword: false,
			successFindDID: false,
			darkModeState: this.$shared.checkDarkMode(),
		}
	},
	created() {
		this.setMembers()
	},
	mounted() {
		if (localStorage.getItem("did") === null) this.openDIDModal()
		else {
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
		async getMember() {
			const response = await this.$axios.get("/api/members/", { params: { key: localStorage.getItem("key") } })
			if (response.status === 201) {
				this.name = this.members.name = response.data.name
				this.studentId = this.members.studentId = response.data.stdnum
				this.major = this.members.major = response.data.major
				this.userImage = this.members.userImage = response.data.image
			}
		},
		async generateUserDID() {
			try {
				const response = await this.$axios.post("/api/generatedid/", {}, { params: { key: localStorage.getItem("key"), SimplePassword: localStorage.getItem("simplePassword") } })
				if (response.status === 201) {
					localStorage.setItem("did", response.data.did)
					this.closeDIDModal()
				}
			} catch (error) {
				if (error.response) {
					if (error.response.data.msg === "DID 발급 오류") {
						this.showError("DID발급 오류", "죄송합니다. \nDID 발급에 오류가 있습니다.")
					}
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
					this.closeDIDModal()
				}
			} catch (error) {
				if (error.response) {
					if (error.response.data.msg === "DID를 찾을 수 없습니다.") {
						JSON.stringify(localStorage.setItem("wrongPassword", this.failCount++))
						if (JSON.parse(localStorage.getItem("wrongPassword")) === 5) this.regenerateDID = true
						this.showError("학생증 찾기 오류", "간편 비밀번호를 " + JSON.parse(localStorage.getItem("wrongPassword")) + "회 틀렸습니다. \n5회 오류시 학생증을 재발급이 가능합니다.")
						this.successPassword = false
						this.successFindDID = false
						this.showError("학생증 찾기 오류", "간편비밀번호가 틀렸습니다 \n확인 후 다시 입력해주세요.")
					}
				}
			}
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
		openPasswordModalForNone(state) {
			if (state === "regenerate") {
				this.closeWarningModal()
				this.checkRegenerateDID = true
			}
			this.closeStudentModal()
			this.displayPasswordModalForNone = true
		},
		closePasswordModalForNone() {
			this.displayPasswordModalForNone = false
			if (this.checkRegenerateDID) this.generateUserDID()
			else if (this.checkDid) {
				this.successPassword = true
				this.successFindDID = true
			} else {
				if (localStorage.getItem("did") === null) this.openDIDModal()
				this.openStudentModal()
				this.showSuccess("간편비밀번호 설정 완료", "간편비밀번호 설정이 완료되었습니다.")
			}
		},
		openDIDModal() {
			this.closeStudentModal()
			this.displayDIDModal = true
		},
		closeDIDModal() {
			this.openStudentModal()
			this.displayDIDModal = false
			if (this.checkRegenerateDID) {
				this.showSuccess("학생증 재발급 완료", "학생증 재발급이 완료되었습니다.")
			} else if (this.checkDid) {
				this.showSuccess("학생증 찾기 성공", "학생증 찾기를 성공하였습니다.")
			} else {
				this.showSuccess("학생증 발급 완료", "학생증 발급이 완료되었습니다.")
			}
		},
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
