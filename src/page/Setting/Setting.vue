<template>
	<div><Header /> <BottomNav /></div>
</template>
<script>
export default {
	name: "Setting",
	components: {},
	data() {
		return {}
	},
	mounted() {
		this.$shared.checkGoogleLogin(this.$gAuth)
	},
	methods: {},
}
</script>
<style scoped></style>
