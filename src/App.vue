<template>
	<Toast :style="{ width: '90%' }" position="top-right" :baseZIndex="100" />
	<router-view></router-view>
</template>

<script>
export default {
	name: "App",
	created() {
		// 두 손가락으로 확대 방지
		document.documentElement.addEventListener(
			"touchstart",
			function(event) {
				if (event.touches.length > 1) {
					event.preventDefault()
				}
			},
			false
		)
	},
}
</script>

<style>
@import "./index.css";
</style>
