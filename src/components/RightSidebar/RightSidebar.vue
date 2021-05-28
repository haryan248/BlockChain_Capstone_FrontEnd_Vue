<template>
	<!-- confirm dialog -->
	<ConfirmDialog :class="{ dark__mode: $shared.checkDarkMode() }" class="setting_confirm-dialog" />
	<!-- Student ID reissuance loading screen -->
	<div v-if="loading" class="loading__overlay-loginForm">
		<div class="loading__progressbar">
			<h5 class="loginForm_loading">학생증을 재발급 중입니다.</h5>
			<ProgressBar mode="indeterminate" style="height: .5em" />
		</div>
	</div>
	<div class="nav__button">
		<Button icon="pi pi-align-justify" @click="openVisibleRight()" class="p-mr-2" />
	</div>
	<div>
		<Sidebar v-model:visible="visibleRight" :baseZIndex="1000" position="right" style="width:12.5rem" :class="{ dark__mode: $shared.checkDarkMode() }">
			<!-- profile content -->
			<div>
				<div class="blank__content"></div>
			</div>
			<div class="profile__content" @click="goToProfile">
				<div v-if="isAdmin" class="admin">관리자</div>
				<div class="img__content">
					<div class="student__img" :style="{ 'background-image': 'url(' + userImage + ')' }" style="width: 60px;height: 60px;"></div>
				</div>
				<div class="text__content">
					<i class="pi pi-spin pi-cog profile__config" style="fontSize: 15px"></i>
					<div class="student__name">{{ name }}님 😃</div>
					<div class="student__id">{{ studentId }}</div>
					<div class="student__major">{{ major }}</div>
					<div class="student__email">{{ email }}</div>
				</div>
			</div>
			<!-- sidebar setting content -->
			<div class="sidebar_content">
				<!-- user sidebar -->
				<Accordion v-if="!isAdmin" :class="{ dark__mode: $shared.checkDarkMode() }">
					<AccordionTab header="간편비밀번호">
						<div class="accordian-item" @click="confirmRegenerateDID">
							재설정
						</div>
					</AccordionTab>
					<AccordionTab header="다크모드">
						<div class="dark__mode-button">
							<div class="item-content">다크모드</div>
							<InputSwitch v-model="darkModeChecked" @click="confirmDarkMode" />
						</div>
					</AccordionTab>
					<AccordionTab header="백업하기">
						<div class="accordian-item" @click="openBackupModal">간편비밀번호 백업</div>
					</AccordionTab>
				</Accordion>
				<!-- admin sidebar -->
				<Accordion v-else-if="$shared.checkAdminMode()" :class="{ dark__mode: $shared.checkDarkMode() }">
					<AccordionTab header="다크모드">
						<div class="dark__mode-button">
							<div class="item-content">다크모드</div>
							<InputSwitch v-model="darkModeChecked" @click="confirmDarkMode" />
						</div>
					</AccordionTab>
					<AccordionTab header="관리자 모드">
						<div class="dark__mode-button">
							<div class="item-content">관리자 모드</div>
							<InputSwitch v-model="adminChecked" @click="confirmAdminMode" />
						</div>
					</AccordionTab>
				</Accordion>
				<Accordion v-else :class="{ dark__mode: $shared.checkDarkMode() }">
					<AccordionTab header="간편비밀번호">
						<div class="accordian-item" @click="confirmRegenerateDID">
							재설정
						</div>
					</AccordionTab>
					<AccordionTab header="다크모드">
						<div class="dark__mode-button">
							<div class="item-content">다크모드</div>
							<InputSwitch v-model="darkModeChecked" @click="confirmDarkMode" />
						</div>
					</AccordionTab>
					<AccordionTab header="백업하기">
						<div class="accordian-item" @click="openBackupModal">간편비밀번호 백업</div>
					</AccordionTab>
					<AccordionTab header="관리자모드">
						<div class="dark__mode-button">
							<div class="item-content">관리자모드</div>
							<InputSwitch v-model="adminChecked" @click="confirmAdminMode" />
						</div>
					</AccordionTab>
				</Accordion>
			</div>
			<!-- logout button -->
			<div class="logout__button">
				<Button label="로그아웃" class="logout" icon="pi pi-sign-out" @click="confirmLogout" />
			</div>
			<!-- copyright -->
			<div class="copyright">
				<p>
					© 2021. 이팔청춘 All rights reserved.
				</p>
			</div>
		</Sidebar>
		<!-- Simple password reset modal -->
		<Dialog class="password-modal p-dialog-maximized" :class="[{ dark__mode: $shared.checkDarkMode() }]" v-model:visible="displayPasswordModal" :style="{ width: '100vw', height: '100vh' }" :modal="true">
			<SimplePassword :title="'간편 비밀번호 재설정'" :isSetting="true" @setCorrectPassword="closePasswordModal" />
		</Dialog>
		<!-- Backup personal consent modal -->
		<Dialog class="password__backup-modal" :class="{ dark__mode: $shared.checkDarkMode() }" :showHeader="false" v-model:visible="displayBackupModal" :style="{ width: '80vw' }" :modal="true">
			<p class="password__backup-detail">
				<br />
				<br />
				<span class="detail__title">간편 비밀번호를 백업하시겠습니까?</span>
				<br />
				<br />
				간편비밀번호를 백업할 경우에 자신의 비밀번호가 서버에 저장됩니다.
				<br />
				<br />
				디바이스가 변경되거나 앱이 삭제되어 재설치하는 경우 학생증을 불러오기 위해 비밀번호 입력이 필요합니다.
				<br />
				<br />
				(단, 비밀번호 재설정시 바뀐 비밀번호는 백업되지 않습니다.)
				<br />
				<br />
				<span class="p-field-checkbox" style="justify-content:center; margin-bottom:0px">
					<Checkbox name="개인정보 활용 동의" class="border-none" value="privacy" v-model="privacy" :binary="true" />
					<label for="privacy">개인정보 활용 동의</label>
				</span>
				<span v-if="privacyError || (privacyError && !privacy)" class="privacy__error">
					<p class="error__text">개인정보 활용 동의를 해주세요!</p>
				</span>
			</p>
			<template #footer>
				<Button label="취소" icon="pi pi-times" class="border-none p-button-outlined" @click="closeBackupModal" autofocus />
				<Button label="백업하기" icon="pi pi-cloud-upload" class="border-none p-button-outlined" @click="uploadBackup" autofocus />
			</template>
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
			displayBackupModal: false,
			darkModeChecked: JSON.parse(localStorage.getItem("DarkMode")) === true ? true : false,
			adminChecked: JSON.parse(localStorage.getItem("AdminMode")) === true ? true : false,
			isAdmin: localStorage.getItem("adminKey") !== null ? true : false,
			name: "",
			studentId: "",
			major: "",
			userImage: "",
			email: "",
			members: JSON.parse(localStorage.getItem("members")),
			loading: false,
			privacy: false,
			privacyError: false,
		}
	},
	created() {
		this.setMembers()
	},
	emits: ["confirmSetting"],
	methods: {
		// 프로필 설정 화면 새 창으로 이동
		goToProfile() {
			window.open("https://myaccount.google.com/u/1/personal-info")
		},
		// 개인정보 세팅
		setMembers() {
			this.name = this.members.name
			this.studentId = this.members.studentId
			this.major = this.members.major
			this.userImage = this.members.userImage
			this.email = this.members.email
		},
		// 다크모드 설정 함수
		confirmDarkMode() {
			this.closeVisibleRight()
			this.$confirm.require({
				message: JSON.parse(localStorage.getItem("DarkMode")) === true ? "다크모드를 비활성화 하시겠습니까?" : "다크모드를 활성화 하시겠습니까?",
				header: "다크모드 설정",
				icon: "pi",
				accept: () => {
					if (JSON.parse(localStorage.getItem("DarkMode")) === false || JSON.parse(localStorage.getItem("DarkMode")) === null) {
						JSON.stringify(localStorage.setItem("DarkMode", true))
						this.darkModeChecked = true
					} else {
						JSON.stringify(localStorage.setItem("DarkMode", false))
						this.darkModeChecked = false
					}
					this.$emit("confirmSetting")
				},
				reject: () => {
					if (JSON.parse(localStorage.getItem("DarkMode")) === false || JSON.parse(localStorage.getItem("DarkMode")) === null) {
						JSON.stringify(localStorage.setItem("DarkMode", false))
						this.darkModeChecked = false
					} else {
						JSON.stringify(localStorage.setItem("DarkMode", true))
						this.darkModeChecked = true
					}
					this.openVisibleRight()
				},
			})
		},
		// 관리자 모드 설정 함수
		confirmAdminMode() {
			this.closeVisibleRight()
			this.$confirm.require({
				message: JSON.parse(localStorage.getItem("AdminMode")) === true ? "관리자 모드를 비활성화 하시겠습니까?" : "관리자 모드를 활성화 하시겠습니까?",
				header: "관리자 모드 설정",
				icon: "pi",
				accept: () => {
					if (JSON.parse(localStorage.getItem("AdminMode")) === false || JSON.parse(localStorage.getItem("AdminMode")) === null) {
						JSON.stringify(localStorage.setItem("AdminMode", true))
						this.adminChecked = true
						this.$router.push("/entrylist")
					} else {
						JSON.stringify(localStorage.setItem("AdminMode", false))
						this.adminChecked = false
						this.$router.push("/")
					}
				},
				reject: () => {
					if (JSON.parse(localStorage.getItem("AdminMode")) === false || JSON.parse(localStorage.getItem("AdminMode")) === null) {
						JSON.stringify(localStorage.setItem("AdminMode", false))
						this.adminChecked = false
					} else {
						JSON.stringify(localStorage.setItem("AdminMode", true))
						this.adminChecked = true
						this.openVisibleRight()
					}
				},
			})
		},
		// 로그아웃 확인 함수
		confirmLogout() {
			this.closeVisibleRight()
			this.$confirm.require({
				message: "로그아웃 하시겠습니까? \n\n다시 로그인 시\n 간편 비밀번호 입력이 필요합니다.",
				header: "로그아웃",
				icon: "pi",
				accept: () => {
					this.$gAuth.instance.signOut()
					localStorage.removeItem("key")
					localStorage.removeItem("AdminMode")
					this.$router.replace("/login")
				},
			})
		},
		// 간편 비밀번호 재설정 함수
		confirmRegenerateDID() {
			this.closeVisibleRight()
			this.$confirm.require({
				message: "간편비밀번호를 재설정하시겠습니까? \n\n간편 비밀번호를 재설정 후 학생증을\n 재발급하게 됩니다. \n\n간편비밀번호 재설정을 의도적으로 할 경우\n 불이익이 갈 수 있으니 비밀번호를\n 기억해주세요!",
				header: "간편 비밀번호 재설정",
				icon: "pi",
				accept: () => {
					this.openPasswordModal()
				},
				reject: () => {
					return
				},
			})
		},

		// 사이드바 모달 토글 함수
		openVisibleRight() {
			this.visibleRight = true
		},
		closeVisibleRight() {
			this.visibleRight = false
		},

		// 백업 모달 토글 함수
		openBackupModal() {
			this.closeVisibleRight()
			this.displayBackupModal = true
		},
		closeBackupModal() {
			this.privacyError = false
			this.privacy = false
			this.displayBackupModal = false
		},

		// 패스워드 모달 토글 함수
		openPasswordModal() {
			this.closeVisibleRight()
			this.displayPasswordModal = true
		},
		closePasswordModal() {
			this.displayPasswordModal = false
			this.showSuccess("간편비밀번호 설정 완료", "간편비밀번호 설정이 완료되었습니다.")
			this.regenerateUserDID()
		},

		// did 재발급
		async regenerateUserDID() {
			this.loading = true
			try {
				const response = await this.$axios.post("/api/regeneratedid/", {}, { params: { key: localStorage.getItem("key"), std_num: this.members.studentId, simple_password: localStorage.getItem("simplePassword") } })
				if (response.status === 201) {
					localStorage.setItem("did", response.data.did)
					this.showSuccess("학생증 재발급 완료", "학생증 재발급이 완료되었습니다.")
				}
			} catch (error) {
				if (error.response) {
					// DID 재발급 오류 시
					if (error.response.data.msg === "DID 재발급 오류") {
						this.showError("DID 재발급 오류", "죄송합니다. \nDID 재발급에 오류가 있습니다.")
					}
				}
			}
			this.loading = false
		},
		// 간편 비밀번호 백업하기
		async uploadBackup() {
			if (!this.privacy) {
				this.privacyError = true
				return
			}
			this.closeBackupModal()
			try {
				const response = await this.$axios.post("/api/password/", {}, { params: { key: localStorage.getItem("key"), simple_password: localStorage.getItem("simplePassword") } })
				if (response.status === 201) {
					this.privacy = false
					this.showSuccess("백업 완료", "간편 비밀번호 백업이 완료되었습니다.")
				}
			} catch (error) {
				this.showError("백업 오류", "죄송합니다. \n백업에 오류가 있습니다.")
			}
		},
		// 성공 토스트 메시지
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
.password__backup-modal .p-dialog-content {
	border-radius: 20px 20px 0 0;
}
.password__backup-modal .p-dialog-footer {
	border-top: 1px solid #e2e2e2;
	padding-top: 1rem;
	border-radius: 0 0 20px 20px;
	text-align: center;
}

.setting_confirm-dialog .p-dialog-header {
	border-radius: 10px 10px 0 0;
}
.setting_confirm-dialog .p-dialog-footer {
	border-radius: 0 0 10px 10px;
}
.p-dialog.p-confirm-dialog .p-confirm-dialog-message {
	white-space: pre-wrap;
	text-align: center;
	font-size: 14px;
}
.regenerate__password.p-dialog-header-icons {
	display: none;
}
.p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-focus {
	box-shadow: none;
}
.p-accordion-header-text {
	font-size: 14px;
}
@media (min-height: 600px) and (max-height: 755px) {
	.sidebar_content {
		margin-top: 30px;
	}
	.sidebar_content .p-accordion .p-accordion-header .p-accordion-header-link {
		padding: 0.8rem;
	}
	.sidebar_content .accordian-item {
		padding: 6px;
		font-size: 12px;
	}
	.sidebar_content .p-accordion-header-text {
		font-size: 13px;
	}
	.sidebar_content .p-accordion .p-accordion-content {
		padding: 0.8rem;
	}
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

/* confirm-Dialog 다크모드 css */
.p-dialog.p-component.p-confirm-dialog.dark__mode .p-dialog-header,
.p-dialog.p-component.p-confirm-dialog.dark__mode .p-dialog-content,
.p-dialog.p-component.p-confirm-dialog.dark__mode .p-dialog-footer,
.p-dialog.p-component.password__backup-modal.dark__mode .p-dialog-content,
.p-dialog.p-component.password__backup-modal.dark__mode .p-dialog-footer {
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
