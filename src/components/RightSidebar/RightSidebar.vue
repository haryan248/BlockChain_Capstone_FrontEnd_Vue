<template>
	<ConfirmDialog :class="{ dark__mode: $shared.checkDarkMode() }" class="setting_confirm-dialog"></ConfirmDialog>

	<div class="nav__button">
		<Button icon="pi pi-align-justify" @click="openVisibleRight()" class="p-mr-2" />
	</div>
	<div>
		<Sidebar v-model:visible="visibleRight" :baseZIndex="1000" position="right" style="width:12.5rem" :class="{ dark__mode: $shared.checkDarkMode() }">
			<!-- 프로필 화면 -->
			<div>
				<div class="blank__content"></div>
			</div>
			<a href="https://myaccount.google.com/u/1/personal-info" class="profile__content">
				<div class="img__content">
					<div class="student__img" :style="{ 'background-image': 'url(' + userImage + ')' }" style="width: 60px;height: 60px;"></div>
				</div>
				<div class="text__content">
					<div class="student__name">{{ name }}님 😃</div>
					<div class="student__id">{{ studentId }}</div>
					<div class="student__major">{{ major }}</div>
				</div>
			</a>
			<div class="sidebar_content">
				<Accordion :class="{ dark__mode: $shared.checkDarkMode() }">
					<AccordionTab header="간편비밀번호">
						<div class="accordian-item" @click="openPasswordModal">
							재설정
						</div>
					</AccordionTab>
					<AccordionTab header="다크모드">
						<div class="dark__mode-button">
							<div class="item-content">다크모드</div>
							<InputSwitch v-model="darkModeChecked" @click="confirmDarkMode()" />
						</div>
					</AccordionTab>
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
		<Dialog class="password-modal p-dialog-maximized" :class="{ dark__mode: $shared.checkDarkMode() }" v-model:visible="displayPasswordModal" :style="{ width: '100vw', height: '100vh' }" :modal="true">
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
			darkModeChecked: JSON.parse(localStorage.getItem("DarkMode")) === true ? true : false,
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
	emits: ["confirmSetting"],

	methods: {
		setMembers() {
			this.name = this.members.name
			this.studentId = this.members.studentId
			this.major = this.members.major
			this.userImage = this.members.userImage
		},
		logout() {
			this.$gAuth.instance.signOut()
			localStorage.removeItem("key")
			JSON.stringify(localStorage.setItem("hasLogout", true))
			this.$router.replace("/login")
		},
		confirmDarkMode() {
			this.closeVisibleRight()
			this.$confirm.require({
				message: JSON.parse(localStorage.getItem("DarkMode")) === true ? "다크모드를 비활성화 하시겠습니까?" : "다크모드를 활성화 하시겠습니까?",
				header: "다크모드 설정",
				icon: "pi",
				accept: () => {
					if (JSON.parse(localStorage.getItem("DarkMode")) === false || JSON.parse(localStorage.getItem("DarkMode")) === null) {
						JSON.stringify(localStorage.setItem("DarkMode", true))
					} else {
						JSON.stringify(localStorage.setItem("DarkMode", false))
					}
					this.openVisibleRight()
					this.$emit("confirmSetting")
				},
				reject: () => {},
			})
		},
		openVisibleRight() {
			this.visibleRight = true
		},
		closeVisibleRight() {
			this.visibleRight = false
		},
		// 패스워드 모달 관련 함수
		openPasswordModal() {
			this.closeVisibleRight()
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
/* 모달 닫기 버튼 */
.setting_confirm-dialog button.p-dialog-header-icon.p-dialog-header-close.p-link {
	display: none;
}
/* 다크모드  css*/
.p-sidebar.p-component.p-sidebar-right.p-sidebar-active.dark__mode {
	background: #333536;
}
.p-accordion.dark__mode .p-accordion-header .p-accordion-header-link {
	background: #495057;
	border: 1px solid #495057;
	color: #ffffff;
}
.p-accordion.dark__mode .p-accordion-header:not(.p-disabled).p-highlight:hover .p-accordion-header-link,
.p-accordion.dark__mode .p-accordion-header:not(.p-highlight):not(.p-disabled):hover .p-accordion-header-link,
.p-accordion.dark__mode .p-accordion-header:not(.p-disabled).p-highlight .p-accordion-header-link {
	background: #495057;
	border: 1px solid #495057;
	color: #ffffff;
}
.p-accordion.dark__mode .p-accordion-content {
	background: #858c92;
	border: 1px solid #495057;
	color: #ffffff;
}
.setting_confirm-dialog .p-dialog-header {
	border-radius: 10px 10px 0 0;
}
.setting_confirm-dialog .p-dialog-footer {
	border-radius: 0 0 10px 10px;
}

/* confirm-Dialog 다크모드 css */
.p-dialog.p-component.p-confirm-dialog.dark__mode .p-dialog-header,
.p-dialog.p-component.p-confirm-dialog.dark__mode .p-dialog-content,
.p-dialog.p-component.p-confirm-dialog.dark__mode .p-dialog-footer {
	background: #333536;
	color: #ffffff;
}
.p-dialog.p-component.p-confirm-dialog.dark__mode button.p-button.p-component.p-confirm-dialog-reject.p-button-text {
	color: #4a83e5;
}
.p-dialog.p-component.p-confirm-dialog.dark__mode button.p-button.p-component.p-confirm-dialog-accept {
	border: none !important;
	outline: none !important;
	box-shadow: none !important;
}
</style>
