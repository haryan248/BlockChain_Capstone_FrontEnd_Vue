<template>
	<Toast :style="{ width: '90%' }" position="top-right" :baseZIndex="100" />
	<router-view v-slot="{ Component }">
		<keep-alive max="3" include="Calendar">
			<component :is="Component" :key="routeKey ? routeKey : $route.fullPath" />
		</keep-alive>
	</router-view>
</template>

<script>
export default {
	name: "App",
	computed: {
		routeKey() {
			const helper = this.$route.meta ? this.$route.meta.key : ""
			return helper ? helper(this.$route) : undefined
		},
	},
}
</script>

<style>
@import "./index.css";
</style>
