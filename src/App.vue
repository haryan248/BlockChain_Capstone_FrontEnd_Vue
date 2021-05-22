<template>
	<Toast :style="{ width: '90%' }" position="top-right" :baseZIndex="100" />
	<router-view></router-view>
</template>

<script>
export default {
	name: "App",
}
</script>

<style>
@import "./index.css";
</style>
