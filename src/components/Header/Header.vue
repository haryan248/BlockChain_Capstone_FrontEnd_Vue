<template>
	<div v-if="isShow">
		<nav class="top-nav top-nav--active">
			<router-link to="/" class="header__nav">
				<span>{{ title }}</span>
			</router-link>
			<router-link to="/" class="nav__login">
				<Avatar class="p-mr-2" style="background-color:#2196F3; color: #ffffff" shape="circle" icon="pi pi-user" />
			</router-link>
			<div class="nav__button">
				<Button icon="pi pi-arrow-left" @click="visibleRight = true" class="p-mr-2" />
			</div>

			<Sidebar v-model:visible="visibleRight" :baseZIndex="1000" position="right" style="width:12rem">
				<h3>Right Sidebar</h3>
			</Sidebar>
		</nav>
	</div>
</template>
<script>
export default {
	name: "Header",
	props: { title: String, isShow: { type: Boolean, default: true } },
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
