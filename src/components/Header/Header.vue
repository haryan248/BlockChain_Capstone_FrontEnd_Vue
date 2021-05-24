<template>
	<div v-if="isShow">
		<nav class="top-nav top-nav--active" :class="{ dark__mode: darkModeState }">
			<div v-if="$route.path === '/'" to="/" class="header__nav header__title1">
				<div class="" />
			</div>
			<div v-else class="header__nav">
				<span class="header__title2">{{ title }}</span>
			</div>
			<!-- right sidebar -->
			<RightSidebar @confirmSetting="confirmSetting" />
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
		return { logo: { backgroundImage: `url(../../assets/upass.png")` }, darkModeState: this.$shared.checkDarkMode() }
	},
	emits: ["confirmSetting"],
	methods: {
		//다크 모드 세팅
		confirmSetting() {
			this.darkModeState = this.$shared.checkDarkMode()
			this.$emit("confirmSetting")
		},
	},
}
</script>
<style scoped>
@import "./header.css";
</style>
