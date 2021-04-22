<template>
	<div v-if="isShow">
		<nav class="top-nav top-nav--active">
			<router-link to="/" class="header__nav">
				<span>{{ title }}</span>
			</router-link>
			<router-link to="/" class="nav__login">
				<Avatar class="p-mr-2" style="background-color:#2196F3; color: #ffffff" shape="circle" icon="pi pi-user" />
			</router-link>
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
		return {}
	},
	methods: {},
}
</script>
<style scoped>
@import "./header.css";
</style>
