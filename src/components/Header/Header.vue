<template>
	<!-- 해더 부분 -->
	<div v-if="isShow">
		<nav class="top-nav top-nav--active">
			<div v-if="$route.path === '/'" to="/" class="header__nav header__title1">
				<div class="" />
			</div>
			<div v-else class="header__nav">
				<span class="header__title2">{{ title }}</span>
			</div>
			<!-- <router-link to="/" class="nav__login">
				<Avatar class="p-mr-2" style="background-color:#2196F3; color: #ffffff" shape="circle" icon="pi pi-user" />
			</router-link> -->
			<!-- 오른쪽 사이드바 -->
			<RightSidebar />
		</nav>
	</div>
</template>
<script>
import RightSidebar from "../RightSidebar/RightSidebar"
export default {
	name: "Header",
	props: { title: String, isShow: { type: Boolean, default: true } },
	components: { RightSidebar },
	data() {
		return { logo: { backgroundImage: `url(../../assets/upass.png")` } }
	},
	methods: {},
}
</script>
<style scoped>
@import "./header.css";
</style>
