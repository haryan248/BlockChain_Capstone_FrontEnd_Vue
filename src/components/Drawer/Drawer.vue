<template>
	<div class="select__container" @click="toggleShow">
		<div class="select__name">
			{{ selected.name }}
			<div class="select__count" v-if="viewCnt">{{ cnt }}</div>
		</div>
	</div>
	<!-- sort-bar section -->
	<transition>
		<div class="sort-bar__overlay" v-if="isShow" @click="toggleShow">
			<div class="sort-bar">
				<div
					class="sort-bar__btn"
					:class="option.name === selected.name && 'active__btn'"
					v-for="(option, idx) in optionList"
					:key="idx"
					@click.stop.prevent="selectOption(option)"
				>
					{{ option.name }}
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: "SortBar",
	props: {
		optionList: { type: Array, required: true },
		listTitle: { type: String, required: false, default: "전체" },
		viewCnt: Boolean,
		cnt: Number,
	},
	emits: ["commitValue"],
	created() {
		// this.selected = this.optionList[0]
	},
	data() {
		return {
			selected: { value: "", name: "" },
			isShow: false,
			curPage: this.$route.name,
		}
	},
	methods: {
		toggleShow() {
			this.isShow = !this.isShow
		},
		selectOption(selected) {
			this.selected = selected
			this.$emit("commitValue", selected.value)
			this.toggleShow()
		},
	},
}
</script>

<style scoped>
@import "./drawer.css";
</style>
