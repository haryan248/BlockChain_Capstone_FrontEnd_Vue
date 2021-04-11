<template>
	<router-view></router-view>
	<BottomNav />
</template>

<script>
import BottomNav from "../src/components/BottomNav/BottomNav"

export default {
	name: "App",
	components: {
		BottomNav,
	},
}
</script>

<style>
@import "./index.css";
</style>
