<template>
	<div>
		<Header :title="'U-PASS'" />
		<div class="container bg-gray">
			<div>
				<div class="student-content">
					<HeaderSection :title="'학생증'" :subtitle="'자신의 정보를 간편하게 관리해보세요.'" />
					<div class="student-info">
						<div class="student-card">
							<div class="student-wrapper">
								<div class="box">
									<div class="student-card__item">
										<p class="item__univ">경기대학교</p>
										<div class="item__img">
											<img class="student__img" src="../../assets/KakaoTalk_20210418_124638504.jpg" />
										</div>
										<p class="item__temp">학번 : 203011123</p>
										<p class="item__temp">성명 : 뽀삐</p>
										<p class="item__temp">소속(학과) : 심쿵시킬과</p>
									</div>
								</div>
							</div>
							<div class="student__button">
								<Button label="학생증" icon="pi pi-id-card" iconPos="left" @click="openPasswordModal" />
							</div>
						</div>
						<!-- <Button label="Show" icon="pi pi-external-link" @click="openModal" /> -->
						<Dialog class="QR-modal" header="Header" :showHeader="false" v-model:visible="displayQRModal" :style="{ width: '80vw' }" :modal="true">
							<QRVerification @goBack="closeQRModal" :isStudentId="true" />
						</Dialog>
						<Dialog class="password-modal p-dialog-maximized" header="" v-model:visible="displayPasswordModal" :style="{ width: '100vw', height: '100vh' }" :modal="true">
							<SimplePassword :title="'간편 비밀번호 입력'" :isSetting="false" @correctPassword="closePasswordModal" />
						</Dialog>
					</div>
				</div>
			</div>
		</div>
	</div>
	<BottomNav />
</template>
<script>
import QRVerification from "../../components/QRVerification/QRVerification"
import HeaderSection from "../../components/HeaderSection/HeaderSection"
import SimplePassword from "../../components/SimplePasswd/SimplePasswd"
import { SHA256 } from "../../sha256.js"
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
		}
	},
	mounted() {
		console.log(SHA256("blockchain"))
		this.$shared.checkGoogleLogin(this.$gAuth)
	},
	methods: {
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
}
.p-dialog.p-component.password-modal.p-dialog-maximized .p-dialog-content {
	padding: 0 !important;
}
</style>
