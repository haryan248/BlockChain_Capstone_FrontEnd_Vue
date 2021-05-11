<template>
	<div>
		<div class="container bg-gray">
			<div class="student-content">
				<Header :title="'캘린더'" />
				<!-- <Calendar /> -->
				<v-calendar is-expanded :attributes="attrs" />
			</div>
			<BottomNav />
		</div>
	</div>
</template>
<script>
export default {
	name: "Calendar",
	data() {
		return {
			attrs: [
				{
					key: "today",
					highlight: true,
					dates: new Date(),
				},
			],
		}
	},
	methods: {},
}
</script>
<style scoped>
@import "./calendar.css";
</style>
