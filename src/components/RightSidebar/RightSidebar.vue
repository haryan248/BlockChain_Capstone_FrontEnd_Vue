<template>
	<div class="nav__button">
		<Button icon="pi pi-arrow-left" @click="visibleRight = true" class="p-mr-2" />
	</div>
	<div>
		<Sidebar v-model:visible="visibleRight" :baseZIndex="1000" position="right" style="width:12rem">
			<h3>Right Sidebar</h3>
			<!-- <div class="setting__content">
				<div class="home-my">
					<h1 class="home__title">보안</h1>
					<ul class="recommend__list">
						선택한 추천 학습 별 리스트 페이지로 이동
						<li class="list__item">
							<div class="recommend__item">
								<span class="recommend__image" :class="'recommend__image--'"></span>
								<div class="recommend__content">
									<h2 class="recommend__title">
										간편비밀번호 재설정
									</h2>
									<p class="recommend__description"></p>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div> -->
			<div class="sidebar_content" @click="openPasswordModal">
				<Accordion>
					<AccordionTab header="Header I">
						간편비밀번호 재설정
					</AccordionTab>
					<AccordionTab header="Header II">
						Content
					</AccordionTab>
					<AccordionTab header="Header III">
						Content
					</AccordionTab>
				</Accordion>
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
		return { visibleRight: false, displayPasswordModal: false }
	},
	methods: {
		openPasswordModal() {
      this.visibleRight =false
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
