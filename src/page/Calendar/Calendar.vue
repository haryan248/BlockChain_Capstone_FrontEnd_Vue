<template>
	<div>
		<!-- <Header :title="'캘린더'" /> -->
		<Calendar />
		<DatePicker v-model="date" />
		<!-- <BottomNav /> -->
	</div>
</template>
<script>
import { Calendar, DatePicker } from "v-calendar"

export default {
	name: "Calendar",
	components: {
		Calendar,
		DatePicker,
	},
	data() {
		return { date: new Date() }
	},
	methods: {},
}
</script>
<style scoped>
@import "./calendar.css";
</style>
