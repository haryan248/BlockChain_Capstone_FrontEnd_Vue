<template>
	<div>
		<Header :title="'출입 여부'" @confirmSetting="confirmSetting" />
		<BottomNav :darkModeState="darkModeState" />
	</div>
</template>
<script>
export default {
	name: "EntryList",
	components: {},
	data() {
		return {}
	},
	methods: {},
}
</script>
<style scoped>
@import "./entry-list.css";
</style>
