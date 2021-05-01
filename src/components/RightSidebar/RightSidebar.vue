<template>
	<div class="nav__button">
		<Button icon="pi pi-align-justify" @click="visibleRight = true" class="p-mr-2" />
	</div>
	<div>
		<Sidebar v-model:visible="visibleRight" :baseZIndex="1000" position="right" style="width:12rem">
			<Avatar class="p-mr-2" size="large" style="background-color:#4a83e5; color: #ffffff" shape="circle" icon="pi pi-user" />
			<div class="sidebar_content">
				<Accordion>
					<AccordionTab header="간편비밀번호">
						<div class="accordian-item" @click="openPasswordModal">
							재설정
						</div>
						<div class="accordian-item" @click="openPasswordModal">
							찾기
						</div>
					</AccordionTab>
					<AccordionTab header="다크모드"> 다크모드 <InputSwitch v-model="checked" /> </AccordionTab>
					<AccordionTab header="DID 재발급">
						재발급
					</AccordionTab>
				</Accordion>

				<!-- <PanelMenu :model="items" /> -->
			</div>
		</Sidebar>
		<Dialog class="password-modal p-dialog-maximized" header="" :showHeader="true" v-model:visible="displayPasswordModal" :style="{ width: '100vw', height: '100vh' }" :modal="true">
			<SimplePassword :title="'간편 비밀번호 설정'" :isSetting="true" @setCorrectPassword="closePasswordModal" />
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
		}
	},
	methods: {
		openPasswordModal() {
			this.visibleRight = false
			this.displayPasswordModal = true
		},
		closePasswordModal() {
			this.displayPasswordModal = false
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
