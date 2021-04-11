<template>
	<div>
		<aside class="bottom-nav footer--view">
			<div
				to=""
				class="footer-btn"
				:class="{ 'footer-btn--active': $route.path === path.studentId }"
				@click="goToPage(`/`)"
			>
				<p />
				학생증
			</div>
			<div
				to="/wallet"
				class="footer-btn"
				:class="{ 'footer-btn--active': $route.path === path.wallet }"
				@click="goToPage(`/wallet`)"
			>
				<p />
				지갑
			</div>
			<div
				to="/order"
				class="footer-btn"
				:class="{ 'footer-btn--active': $route.path === path.order }"
				@click="goToPage(`/order`)"
			>
				<p />
				주문
			</div>
			<div
				to="/setting"
				class="footer-btn"
				:class="{ 'footer-btn--active': $route.path === path.setting }"
				@click="goToPage(`/setting`)"
			>
				<p />
				설정
			</div>
			<div
				to="/todo"
				class="footer-btn"
				:class="{ 'footer-btn--active': $route.path === `/todo` }"
				@click="goToPage(`/todo`)"
			>
				<p />
				할일
			</div>
			<div
				to="/qrscanner"
				class="footer-btn"
				:class="{ 'footer-btn--active': $route.path === path.qrscanner }"
				@click="goToPage(`/qrscanner`)"
			>
				<p />
				qrscan
			</div>
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
				setting: "/setting",
				qrscanner: "/qrscanner",
			},
		}
	},
	methods: {
		goToPage(path) {
			this.$router.push(path)
		},
	},
}
</script>
<style scoped>
@import "./bottom-nav.css";
</style>
