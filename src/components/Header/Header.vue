<template>
	<nav class="top-nav top-nav--active">
		<div class="header__nav">
			<span>U-PASS</span>
		</div>
		<div class="nav__button">
			<Button icon="pi pi-arrow-right" @click="visibleRight = true" class="p-mr-2" />
		</div>
		<button type="button" class="nav__login">
			<div>로그인</div>
		</button>

		<Sidebar v-model:visible="visibleRight" :baseZIndex="1000" position="right">
			<h3>Right Sidebar</h3>
		</Sidebar>
	</nav>
</template>
<script>
export default {
	name: "Sample",
	components: {},
	data() {
		return {
			visibleRight: false,
		}
	},
	methods: {},
}
</script>
<style scoped>
@import "./header.css";
</style>
