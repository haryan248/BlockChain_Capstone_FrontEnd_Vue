<template>
	<div className="headersection__info">
		<!-- <Clock date="{new" Date()} /> -->
		<div className="headerSection__time">{{ currentDate }}</div>
		<h1 className="headerSection__title">{{ title }}</h1>
		<div className="headerSection__subttl">{{ subtitle }}</div>
	</div>
</template>
<script>
export default {
	name: "HeaderSection",
	props: {
		title: String,
		subtitle: String,
	},
	components: {},
	data() {
		return { currentDate: String }
	},
	created() {
		this.setTime()
	},
	methods: {
		setTime() {
			let date = new Date()
			this.currentDate = date.getFullYear() + "년 " + (date.getMonth() + 1) + "월 " + date.getDate() + "일"
		},
	},
}
</script>
<style scoped>
@import "./header-section.css";
</style>
