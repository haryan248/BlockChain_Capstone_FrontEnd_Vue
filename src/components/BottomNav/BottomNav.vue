<template>
	<!-- 각 페이지의 하단 네비게이션 -->
	<div v-if="$route.path !== '/login' || $route.path !== '/simplepwd'">
		<aside class="bottom-nav footer--view">
			<router-link to="/" class="footer-btn" :class="{ 'footer-btn--active': $route.path === path.studentId }">
				<Button label="학생증" iconPos="top" icon="pi pi-id-card" class="p-button-text p-button-secondary border-none p-button-font--size" :class="{ 'p-button-text--active': $route.path === path.studentId }" />
			</router-link>
			<router-link to="/wallet" class="footer-btn" :class="{ 'footer-btn--active': $route.path === path.wallet }">
				<Button label="지갑" iconPos="top" icon="pi pi-wallet" class="p-button-text p-button-secondary border-none p-button-font--size" :class="{ 'p-button-text--active': $route.path === path.wallet }" />
			</router-link>
			<router-link to="/order" class="footer-btn" :class="{ 'footer-btn--active': $route.path === path.order }">
				<Button label="주문" iconPos="top" icon="pi pi-shopping-cart" class="p-button-text p-button-secondary border-none p-button-font--size" :class="{ 'p-button-text--active': $route.path === path.order }" />
			</router-link>
			<!-- <router-link to="/reservation" class="footer-btn" :class="{ 'footer-btn--active': $route.path === path.setting }">
				<Button label="예약" iconPos="top" icon="pi pi-ticket" class="p-button-text p-button-secondary border-none p-button-font--size" :class="{ 'p-button-text--active': $route.path === path.setting }" />
			</router-link> -->
			<router-link to="/calendar" class="footer-btn" :class="{ 'footer-btn--active': $route.path === path.calendar }">
				<Button label="캘린더" iconPos="top" icon="pi pi-calendar" class="p-button-text p-button-secondary border-none p-button-font--size" :class="{ 'p-button-text--active': $route.path === path.calendar }" />
			</router-link>
			<router-link to="/qrscanner" class="footer-btn" :class="{ 'footer-btn--active': $route.path === path.qrscanner }">
				<Button label="QR스캔" iconPos="top" icon="pi pi-camera" class="p-button-text p-button-secondary border-none p-button-font--size" :class="{ 'p-button-text--active': $route.path === path.qrscanner }" />
			</router-link>
		</aside>
	</div>
</template>
<script>
export default {
	name: "BottomNav",
	components: {},
	data() {
		return {
			path: {
				studentId: "/",
				wallet: "/wallet",
				order: "/order",
				reservation: "/reservation",
				calendar: "/calendar",
				qrscanner: "/qrscanner",
			},
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
