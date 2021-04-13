<template>
	<nav class="top-nav top-nav--active">
		<router-link to="/" class="header__nav">
			<span>U-PASS</span>
		</router-link>
		<router-link to="/simplepwd" class="nav__login">
			<Avatar
				class="p-mr-2"
				style="background-color:#2196F3; color: #ffffff"
				shape="circle"
				icon="pi pi-user"
			/>
		</router-link>
		<div class="nav__button">
			<Button icon="pi pi-arrow-left" @click="visibleRight = true" class="p-mr-2" />
		</div>

		<Sidebar v-model:visible="visibleRight" :baseZIndex="1000" position="right">
			<h3>Right Sidebar</h3>
		</Sidebar>
	</nav>
</template>
<script>
export default {
	name: "Header",
	props: {},
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
