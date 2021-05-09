<template>
	<div class="nav__button">
		<Button icon="pi pi-align-justify" @click="visibleRight = true" class="p-mr-2" />
	</div>
	<div>
		<Sidebar v-model:visible="visibleRight" :baseZIndex="1000" position="right" style="width:12rem">
			<!-- 프로필 화면 -->
			<!-- <Avatar class="p-mr-2" size="large" style="background-color:#4a83e5; color: #ffffff" shape="circle" icon="pi pi-user" /> -->
			<div class="profile__content">
				<div class="student__img" :style="{ 'background-image': 'url(' + userImage + ')' }"></div>
			</div>
			<div class="sidebar_content">
				<Accordion>
					<AccordionTab header="간편비밀번호">
						<div class="accordian-item" @click="openPasswordModal">
							{{ userImage }}
							재설정
						</div>
					</AccordionTab>
					<AccordionTab header="다크모드"> 다크모드 <InputSwitch v-model="checked" /> </AccordionTab>
					<AccordionTab header="DID 재발급">
						재발급
					</AccordionTab>
				</Accordion>
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
			key: localStorage.getItem("key"),
			userImage: "",
		}
	},
	created() {
		this.getUserImage()
	},
	methods: {
		async getUserImage() {
			try {
				const response = await this.$axios.get("/api/members/" + this.key, {})
				if (response.status === 201) {
					this.userImage = response.data.image
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
