<template>
	<div class="pass__button-nav">
		<div>
			<div class="pass__button-content" :style="{ backgroundColor: color }">{{ title }}</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "PassButton",
	props: {
		color: String,
		title: String,
	},
	components: {},
	methods: {},
}
</script>
<style scoped>
@import "./pass-button.css";
</style>
