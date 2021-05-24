<template>
	<!-- Bottom navigation of each page -->
	<div v-if="$route.path !== '/login' || $route.path !== '/simplepwd'">
		<!-- User bottom navigation -->
		<aside v-if="!adminModeState" class="bottom-nav footer--view" :class="{ dark__mode: darkModeState }">
			<router-link to="/" class="footer-btn" :class="{ 'footer-btn--active': $route.path === path.studentId }">
				<Button
					label="학생증"
					iconPos="top"
					icon="pi pi-id-card"
					class="p-button-text p-button-secondary border-none p-button-font--size"
					:class="[{ 'p-button-text--active': $route.path === path.studentId }, { dark__mode: darkModeState }]"
				/>
			</router-link>
			<router-link to="/wallet" v-if="!adminModeState" class="footer-btn" :class="{ 'footer-btn--active': $route.path === path.wallet }">
				<Button label="지갑" iconPos="top" icon="pi pi-wallet" class="p-button-text p-button-secondary border-none p-button-font--size" :class="[{ 'p-button-text--active': $route.path === path.wallet }, { dark__mode: darkModeState }]" />
			</router-link>
			<router-link to="/order" class="footer-btn" :class="{ 'footer-btn--active': $route.path === path.order }">
				<Button
					label="주문"
					iconPos="top"
					icon="pi pi-shopping-cart"
					class="p-button-text p-button-secondary border-none p-button-font--size"
					:class="[{ 'p-button-text--active': $route.path === path.order }, { dark__mode: darkModeState }]"
				/>
			</router-link>
			<router-link to="/reservation" class="footer-btn" :class="{ 'footer-btn--active': $route.path === path.reservation }">
				<Button
					label="예약"
					iconPos="top"
					icon="pi pi-ticket"
					class="p-button-text p-button-secondary border-none p-button-font--size"
					:class="[{ 'p-button-text--active': $route.path === path.reservation }, { dark__mode: darkModeState }]"
				/>
			</router-link>
			<router-link to="/calendar" class="footer-btn" :class="{ 'footer-btn--active': $route.path === path.calendar }">
				<Button
					label="캘린더"
					iconPos="top"
					icon="pi pi-calendar"
					class="p-button-text p-button-secondary border-none p-button-font--size"
					:class="[{ 'p-button-text--active': $route.path === path.calendar }, { dark__mode: darkModeState }]"
				/>
			</router-link>
		</aside>
		<!-- Admin bottom navigation -->
		<aside v-else class="bottom-nav footer--view" :class="{ dark__mode: darkModeState }">
			<router-link to="/entrylist" class="footer-btn" :class="{ 'footer-btn--active': $route.path === path.entrylist }">
				<Button
					label="출입 확인"
					iconPos="top"
					icon="pi pi-table"
					class="p-button-text p-button-secondary border-none p-button-font--size"
					:class="[{ 'p-button-text--active': $route.path === path.entrylist }, { dark__mode: darkModeState }]"
				/>
			</router-link>
			<router-link to="/qrscanner" class="footer-btn" :class="{ 'footer-btn--active': $route.path === path.qrscanner }">
				<Button
					label="QR스캔"
					iconPos="top"
					icon="pi pi-camera"
					class="p-button-text p-button-secondary border-none p-button-font--size"
					:class="[{ 'p-button-text--active': $route.path === path.qrscanner }, { dark__mode: darkModeState }]"
				/>
			</router-link>
			<router-link to="/adminsetting" class="footer-btn" :class="{ 'footer-btn--active': $route.path === path.adminsetting }">
				<Button
					label="관리자설정"
					iconPos="top"
					icon="pi pi-cog"
					class="p-button-text p-button-secondary border-none p-button-font--size"
					:class="[{ 'p-button-text--active': $route.path === path.adminsetting }, { dark__mode: darkModeState }]"
				/>
			</router-link>
		</aside>
	</div>
</template>
<script>
export default {
	name: "BottomNav",
	components: {},
	props: { darkModeState: Boolean },
	data() {
		return {
			path: {
				studentId: "/",
				wallet: "/wallet",
				order: "/order",
				reservation: "/reservation",
				calendar: "/calendar",
				qrscanner: "/qrscanner",
				entrylist: "/entrylist",
				adminsetting: "/adminsetting",
			},
			adminModeState: this.$shared.checkAdminMode(),
		}
	},
	methods: {},
}
</script>
<style scoped>
@import "./bottom-nav.css";
</style>
<style>
.footer-btn--active .p-button-label {
	font-weight: bold;
}
</style>
