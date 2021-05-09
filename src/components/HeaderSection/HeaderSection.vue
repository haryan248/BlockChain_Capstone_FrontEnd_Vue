<template>
	<!-- 각 탭의 타이틀 영역 -->
	<div className="headersection__info">
		<h5 className="headerSection__time">{{ currentDate }}</h5>
		<h1 className="headerSection__title">{{ title }}</h1>
		<h3 className="headerSection__subttl">{{ subtitle }}</h3>
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
