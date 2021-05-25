<template>
	<div>
		<Header :title="'U-PASS'" @confirmSetting="confirmSetting" />
		<div class="container bg-gray" :class="{ 'bg-dark': darkModeState }">
			<div>
				<div class="student-content">
					<CoachMark :coachMarkType="'student-id'" :storageName="'studentId'" />
					<HeaderSection :title="'학생증'" :subtitle="'자신의 정보를 간편하게 관리해보세요.'" :darkModeState="darkModeState" />
					<Dialog class="QR-modal" :showHeader="false" v-model:visible="displayStudentModal" :style="{ width: '80vw' }" :baseZIndex="-1000" :class="{ dark__mode: darkModeState }">
						<!-- Student ID card -->
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
							<!-- Simplepassword modal input when pressing student ID -->
							<Dialog class="password-modal p-dialog-maximized" :class="{ dark__mode: darkModeState }" header="" v-model:visible="displayPasswordModal" :style="{ width: '100vw', height: '100vh' }" :modal="true">
								<SimplePassword :title="'간편 비밀번호 입력'" :isSetting="false" @correctPassword="closePasswordModal" />
							</Dialog>
							<!-- QR code screen part -->
							<Dialog class="QR-modal" :class="{ dark__mode: darkModeState }" header="Header" :showHeader="false" v-model:visible="displayQRModal" :style="{ width: '80vw' }" :modal="true">
								<QRVerification @goBack="closeQRModal" :isStudentId="true" :did="DID" :SimplePassword="SimplePassword" />
							</Dialog>
						</div>
					</Dialog>
					<div class="student__id-content"></div>
					<div class="student__button">
						<Button label="학생증" icon="pi pi-id-card" @click="openPasswordModal" />
					</div>
				</div>
			</div>
		</div>
	</div>
	<BottomNav :darkModeState="darkModeState" />
</template>
<script>
import QRVerification from "../../components/QRVerification/QRVerification"
import HeaderSection from "../../components/HeaderSection/HeaderSection"
import SimplePassword from "../../components/SimplePasswd/SimplePasswd"
import CoachMark from "../../components/CoachMark/CoachMark"

export default {
	name: "StudentId",
	components: {
		QRVerification,
		HeaderSection,
		SimplePassword,
		CoachMark,
	},
	data() {
		return {
			displayQRModal: false,
			displayPasswordModal: false,
			displayStudentModal: false,
			name: "",
			studentId: "",
			major: "",
			userImage: "",
			DID: localStorage.getItem("did"),
			SimplePassword: localStorage.getItem("simplePassword"),
			members: JSON.parse(localStorage.getItem("members")),
			darkModeState: this.$shared.checkDarkMode(),
		}
	},
	created() {
		this.setMembers()
	},
	mounted() {
		this.openStudentModal()
		this.$shared.checkGoogleLogin(this.$gAuth)
	},
	methods: {
		// 다크모드 세팅
		confirmSetting() {
			this.darkModeState = this.$shared.checkDarkMode()
		},
		// 개인정보 세팅
		setMembers() {
			this.name = this.members.name
			this.studentId = this.members.studentId
			this.major = this.members.major
			this.userImage = this.members.userImage
		},
		// QR 모달 토글 함수
		openQRModal() {
			this.displayQRModal = true
		},
		closeQRModal() {
			this.displayQRModal = false
		},
		// 간편비밀번호 모달 토글 함수
		openPasswordModal() {
			this.displayPasswordModal = true
		},
		closePasswordModal() {
			setTimeout(() => {
				this.openQRModal()
			}, 100)
			this.displayPasswordModal = false
		},
		//학생증 모달 토글 함수
		openStudentModal() {
			this.displayStudentModal = true
		},
		closeStudentModal() {
			this.displayStudentModal = false
		},

		// 상공 토스트 메시지
		showSuccess(summaryText, detailText) {
			this.$toast.add({ severity: "success", summary: summaryText, detail: detailText, life: 3000 })
		},
		// 에러 토스트 메시지
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
.p-dialog.p-component.password-modal.p-dialog-maximized .p-dialog-content {
	padding: 0 !important;
}

/* 다크모드 */
.p-dialog.p-component.QR-modal.dark__mode .p-dialog-content {
	background: #333536;
}
</style>
