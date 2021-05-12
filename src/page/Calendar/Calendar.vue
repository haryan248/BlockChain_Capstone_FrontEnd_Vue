<template>
	<div>
		<div class="container bg-gray">
			<div class="student-content">
				<Header :title="'캘린더'" />
				<!-- <Calendar /> -->
				<v-calendar is-expanded :attributes="attributes">
					<template #day-popover="{ day, format, masks }">
						<div class="text-xs text-gray-300 font-semibold text-center">
							{{ format(day.date, masks.dayPopover) }}
						</div>
					</template>
				</v-calendar>
			</div>
			<BottomNav />
		</div>
	</div>
</template>
<script>
export default {
	name: "Calendar",
	data() {
		const todos = [
			{
				description: "Take Noah to basketball practice.",
				isComplete: false,
				dates: { weekdays: 6 }, // Every Friday
				color: "red",
			},
		]
		return {
			attrs: [
				{
					key: "today",
					highlight: true,
					dates: new Date(),
				},
				{
					bar: "red",
					dates: [
						new Date(2021, 4, 4), // Jan 4th
						new Date(2021, 4, 10), // Jan 10th
						new Date(2021, 4, 15), // Jan 15th
					],
				},
			],
			incId: todos.length,
			todos,
		}
	},
	computed: {
		attributes() {
			return [
				// Attributes for todos
				...this.todos.map((todo) => ({
					dates: todo.dates,
					bar: {
						color: todo.color,
						class: todo.isComplete ? "opacity-75" : "",
					},
					popover: {
						label: todo.description,
					},
					customData: todo,
				})),
			]
		},
	},
	methods: {},
}
</script>
<style scoped>
@import "./calendar.css";
</style>
