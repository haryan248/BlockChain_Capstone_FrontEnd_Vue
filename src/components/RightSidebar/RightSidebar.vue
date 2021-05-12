<template>
	<div class="nav__button">
		<Button icon="pi pi-align-justify" @click="visibleRight = true" class="p-mr-2" />
	</div>
	<div>
		<Sidebar v-model:visible="visibleRight" :baseZIndex="1000" position="right" style="width:12rem">
			<!-- 프로필 화면 -->
			<a href="https://myaccount.google.com/u/1/personal-info">
				<div class="blank__content"></div>
			</a>
			<div class="profile__content">
				<div class="student__img" :style="{ 'background-image': 'url(' + userImage + ')' }"></div>
				<div class="student__name">{{ name }} 님</div>
				<div class="student__id">{{ studentId }}</div>
				<div class="student__major">{{ major }}</div>
			</div>
			<div class="sidebar_content">
				<Accordion>
					<AccordionTab header="간편비밀번호">
						<div class="accordian-item" @click="openPasswordModal">
							재설정
						</div>
					</AccordionTab>
					<AccordionTab header="다크모드"> 다크모드 <InputSwitch v-model="checked" /> </AccordionTab>
					<AccordionTab header="DID 재발급">
						재발급
					</AccordionTab>
				</Accordion>
			</div>
			<!-- 로그아웃 버튼 -->
			<div class="logout__button">
				<Button label="로그아웃" class="logout" icon="pi pi-sign-out" iconPos="right" @click="logout" />
			</div>
		</Sidebar>
		<!-- 간편번호 재설정시 띄우는 화면 -->
		<Dialog class="password-modal p-dialog-maximized" header="" :showHeader="true" v-model:visible="displayPasswordModal" :style="{ width: '100vw', height: '100vh' }" :modal="true">
			<SimplePassword :title="'간편 비밀번호 재설정'" :isSetting="true" :isResetting="true" @setCorrectPassword="closePasswordModal" />
		</Dialog>
	</div>
</template>
<script>
import SimplePassword from "../../components/SimplePasswd/SimplePasswd"

export default {
	name: "RightSidebar",
	components: { SimplePassword },
	data() {
		return {
			visibleRight: false,
			displayPasswordModal: false,
			checked: false,
			name: "",
			studentId: "",
			major: "",
			userImage: "",
			members: JSON.parse(localStorage.getItem("members")),
		}
	},
	created() {
		this.setMembers()
	},
	methods: {
		setMembers() {
			this.name = this.members.name
			this.studentId = this.members.studentId
			this.major = this.members.major
			this.userImage = this.members.userImage
		},
		logout() {
			this.$gAuth.instance.currentUser.get().signOut()
			localStorage.removeItem("key")
			localStorage.setItem("hasLogout", true)
			this.$router.replace("/login")
		},
		// 패스워드 모달 관련 함수
		openPasswordModal() {
			this.visibleRight = false
			this.displayPasswordModal = true
		},
		closePasswordModal() {
			this.displayPasswordModal = false
			this.showSuccess("간편비밀번호 설정 완료", "간편비밀번호 설정이 완료되었습니다.")
		},
		// 설정 완료시 띄워주는 toast message
		showSuccess(summaryText, detailText) {
			this.$toast.add({ severity: "success", summary: summaryText, detail: detailText, life: 3000 })
		},
	},
}
</script>
<style scoped>
@import "./right-sidebar.css";
</style>
<style>
/* 판넬 css overwritting */
.p-panelmenu .p-panelmenu-header > a {
	/* border: 1px solid #FFF; */
	background: #fff;
}
.p-accordion .p-accordion-header:not(.p-disabled) .p-accordion-header-link:focus {
	box-shadow: 0 0 0;
}
.p-sidebar .p-sidebar-close {
	border: none !important;
	background: transparent !important;
	outline: none !important;
	box-shadow: none !important;
}
</style>
