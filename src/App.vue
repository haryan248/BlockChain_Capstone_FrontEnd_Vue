<template>
	<Toast :style="{ width: '90%' }" position="top-right" :baseZIndex="100" />
	<router-view></router-view>
</template>

<script>
export default {
	name: "App",
	created() {
		// 두번 탭 방지
		let lastTouchEnd = 0
		document.documentElement.addEventListener(
			"touchend",
			function(event) {
				let now = new Date().getTime()
				if (now - lastTouchEnd <= 300) {
					event.preventDefault()
				}
				lastTouchEnd = now
			},
			false
		)
	},
}
</script>

<style>
@import "./index.css";
</style>
