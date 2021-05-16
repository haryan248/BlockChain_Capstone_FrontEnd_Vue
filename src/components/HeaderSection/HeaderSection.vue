<template>
	<!-- 각 탭의 타이틀 영역 -->
	<div class="headersection__info" :class="{ dark__mode: darkModeState }">
		<h5 class="headerSection__time">{{ currentDate }}</h5>
		<h1 class="headerSection__title">{{ title }}</h1>
		<h3 class="headerSection__subttl">{{ subtitle }}</h3>
	</div>
</template>
<script>
export default {
	name: "HeaderSection",
	props: {
		title: String,
		subtitle: String,
		darkModeState: Boolean,
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
