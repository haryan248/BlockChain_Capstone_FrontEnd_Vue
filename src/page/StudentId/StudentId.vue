<template>
	<div>
		<Toast :style="{ width: '90%' }" position="top-right" />
		<Header :title="'U-PASS'" />
		<div class="container bg-gray">
			<div>
				<div class="student-content">
					<HeaderSection :title="'학생증'" :subtitle="'자신의 정보를 간편하게 관리해보세요.'" />
					<Dialog class="QR-modal" :showHeader="false" v-model:visible="displayStudentModal" :style="{ width: '80vw' }">
						<!-- 학생증 카드 -->
						<div class="student-info">
							<div class="student-card">
								<div class="student-wrapper">
									<div class="box">
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
							<Dialog class="password-modal p-dialog-maximized" header="" v-model:visible="displayPasswordModal" :style="{ width: '100vw', height: '100vh' }" :modal="true">
								<SimplePassword :title="'간편 비밀번호 입력'" :isSetting="false" @correctPassword="closePasswordModal" />
							</Dialog>
							<!-- qr 코드 화면 부분 -->
							<Dialog class="QR-modal" header="Header" :showHeader="false" v-model:visible="displayQRModal" :style="{ width: '80vw' }" :modal="true">
								<QRVerification @goBack="closeQRModal" :isStudentId="true" :DIDPasswd="DIDPasswd" />
							</Dialog>
						</div>
					</Dialog>
					<!-- 간편 비밀번호 없을때 설정 화면 띄우는 부분 -->
					<Dialog class="password-modal p-dialog-maximized" header="" :showHeader="false" v-model:visible="displayPasswordModalForNone" :style="{ width: '100vw', height: '100vh' }" :modal="true">
						<SimplePassword :title="'간편 비밀번호 설정'" :isSetting="true" @setCorrectPassword="closePasswordModalForNone" />
					</Dialog>
					<div class="student__id-content"></div>
					<div class="student__button">
						<Button label="학생증" icon="pi pi-id-card" iconPos="left" @click="openPasswordModal" />
					</div>
				</div>
				<!-- 학생증 발급되지 않았을때 화면 띄우는 부분 -->
				<Dialog class="did__error-modal" header="" :showHeader="false" v-model:visible="displayDIDModal" :style="{ width: '80vw' }" :modal="true">
					<div class="did-modal">
						<div class="did-card">
							<div class="did-wrapper">
								<div class="box">
									<div class="did-card__item">
										<p class="item__title">학생증 발급 필요</p>
										<p class="item__detail">
											<br />DID (Decentralized Identifier)을 발급하는 도중에 오류가 발생하였거나, 어플이 종료되었을 수 있습니다. <br /><br />
											기기에 DID정보가 없으므로 학생증을 발급해주세요.<br />
										</p>

										<Button label="학생증 발급" icon="pi pi-user-plus" iconPos="right" class="p-button-outlined did-issued" @click="getUserDID" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</Dialog>
			</div>
		</div>
	</div>
	<BottomNav />
</template>
<script>
import QRVerification from "../../components/QRVerification/QRVerification"
import HeaderSection from "../../components/HeaderSection/HeaderSection"
import SimplePassword from "../../components/SimplePasswd/SimplePasswd"
// import * as querystring from "querystring"

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
			name: "",
			studentId: "",
			major: "",
			userImage: "",
			DID: localStorage.getItem("did"),
			SimplePassword: localStorage.getItem("simplePassword"),
			DIDPasswd: "",
			summaryText: "",
			detailText: "",
			members: {
				name: "",
				studentId: "",
				major: "",
				userImage: "",
			},
		}
	},
	created() {
		this.getMember()
	},
	mounted() {
		if (localStorage.getItem("simplePassword") === null) this.openPasswordModalForNone()
		else if (localStorage.getItem("did") === null) this.openDIDModal()
		else {
			this.displayStudentModal = true
			this.$shared.checkGoogleLogin(this.$gAuth)
		}
	},
	methods: {
		async getMember() {
			try {
				const response = await this.$axios.get("/api/members/", { params: { key: localStorage.getItem("key") } })
				if (response.status === 201) {
					this.name = this.members.name = response.data.name
					this.studentId = this.members.studentId = response.data.stdnum
					this.major = this.members.major = response.data.major
					this.userImage = this.members.userImage = response.data.image
					localStorage.setItem("members", JSON.stringify(this.members))
				}
			} catch (error) {
				if (error.response) {
					// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
					// console.log(error.response.data)
					// console.log(error.response.status)
					// console.log(error.response.headers)
				}
			}
		},
		async getUserDID() {
			try {
				const response = await this.$axios.get("/api/runpython/", { params: { key: localStorage.getItem("key") } })
				if (response.status === 201) {
					localStorage.setItem("did", response.data.did)
					this.closeDIDModal()
				}
			} catch (error) {
				if (error.response) {
					this.summaryText = "DID발급 오류"
					this.detailText = "죄송합니다. \nDID 발급에 오류가 있습니다."
					this.showError(this.summaryText, this.detailText)
				}
			}
		},
		setQRString() {
			this.DIDPasswd = this.$sha256(this.did + this.SimplePassword)
		},
		openQRModal() {
			this.displayQRModal = true
		},
		closeQRModal() {
			this.displayQRModal = false
		},
		openPasswordModal() {
			this.setQRString()
			this.displayPasswordModal = true
		},
		closePasswordModal() {
			this.openQRModal()
			this.displayPasswordModal = false
		},
		openPasswordModalForNone() {
			this.displayStudentModal = false
			this.displayPasswordModalForNone = true
		},
		closePasswordModalForNone() {
			if (localStorage.getItem("did") === null) this.openDIDModal()
			this.displayStudentModal = true
			this.displayPasswordModalForNone = false
			this.showSuccess("간편비밀번호 설정 완료", "간편비밀번호 설정이 완료되었습니다.")
		},
		openDIDModal() {
			this.displayStudentModal = false
			this.displayDIDModal = true
		},
		closeDIDModal() {
			if (localStorage.getItem("simplePassword") === null) this.openPasswordModalForNone()
			this.displayStudentModal = true
			this.displayDIDModal = false
			this.showSuccess("학생증 발급 완료", "학생증 발급이 완료되었습니다.")
		},
		showSuccess(summaryText, detailText) {
			this.$toast.add({ severity: "success", summary: summaryText, detail: detailText, life: 3000 })
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
</style>
