<template>
	<div>
		<div class="container bg-gray" :class="{ 'bg-dark': darkModeState }">
			<div class="calendar__content">
				<Header :title="'캘린더'" @confirmSetting="confirmSetting" />
				<v-calendar :attributes="attributes" :is-dark="darkModeState" @dayclick="onDayClick" is-expanded>
					<!-- <template #day-popover="{ dayTitle, attributes }">
						<div>
							<div class="text-xs text-gray-300 font-semibold text-center">
								{{ dayTitle }}
							</div>
							<ul>
								<li v-for="attr in attributes" :key="attr.key">
									{{ attr.customData.building }}
								</li>
							</ul>
						</div>
					</template> -->
				</v-calendar>
				<div class="schedule__content" v-if="!loading">
					<div class="item__content">
						<div v-for="(item, index) in selectDate" :key="index" class="entry__content">
							<div class="schedule__date">
								{{ item.day }}
							</div>
							<div class="entry-empty__list" v-if="item.attributes.length === 0">
								<li class="list__item">
									<div class="empty-list__item">
										<div class="item__content">
											<div class="item__summary">
												<h3 class="class__room">방문한 기록이 없어요!</h3>
											</div>
										</div>
									</div>
								</li>
							</div>
							<div class="entry-list__content" v-else>
								<div v-for="(attribute, index) in item.attributes" :key="index">
									<li class="list__item">
										<div class="entry-list__item">
											<div class="item__content">
												<div class="item__summary">
													<h3 class="entry__time">{{ attribute.time }}</h3>
													<h3 class="class__room">{{ attribute.building }}강의동 ( {{ checkBuildingName(attribute.building, index) }} )</h3>
												</div>
											</div>
										</div>
									</li>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<BottomNav :darkModeState="darkModeState" />
		</div>
	</div>
</template>
<script>
export default {
	name: "Calendar",
	data() {
		return {
			curYear: "",
			curMonth: "",
			curDay: "",
			buildingName: [],
			loading: true,
			selectDate: [
				{
					day: "",
					attributes: [],
				},
			],
			today: {
				highlight: {
					color: "blue",
					fillMode: "light",
				},
				dates: new Date(),
			},
			attributes: [
				{
					dot: "",
					key: 0,
					customData: {
						building: "",
					},
					dates: null,
				},
				{
					highlight: {
						color: "blue",
						fillMode: "light",
					},
					dates: new Date(),
				},
			],
			darkModeState: this.$shared.checkDarkMode(),
		}
	},
	created() {
		this.setDate()
		this.getEntry()
		this.selectDate[0].day = this.curYear + "-" + this.curMonth + "-" + this.curDay
	},
	methods: {
		confirmSetting() {
			this.darkModeState = this.$shared.checkDarkMode()
		},
		setDate() {
			let date = new Date()
			this.curYear = date.getFullYear()
			this.curMonth = date.getMonth() + 1
			this.curMonth = this.curMonth >= 10 ? this.curMonth : "0" + this.curMonth
			this.curDay = date.getDate()
			this.curDay = this.curDay >= 10 ? this.curDay : "0" + this.curDay
		},
		onDayClick(day) {
			console.log(day)
			this.selectDate[0].day = day.id
			this.selectDate[0].attributes = []
			day.attributes.forEach((item, i) => {
				if (item.customData !== undefined) {
					this.selectDate[0].attributes[i] = { building: item.customData.building, time: item.customData.time }
				}
			})
		},
		checkBuildingName(building, index) {
			switch (Number(building)) {
				case 1:
					this.buildingName[index] = "진리관"
					return this.buildingName[index]
				case 2:
					this.buildingName[index] = "성신관"
					return this.buildingName[index]
				case 3:
					this.buildingName[index] = "애경관"
					return this.buildingName[index]
				case 4:
					this.buildingName[index] = "예지관"
					return this.buildingName[index]
				case 5:
					this.buildingName[index] = "덕문관"
					return this.buildingName[index]
				case 6:
					this.buildingName[index] = "광교관"
					return this.buildingName[index]
				case 7:
					this.buildingName[index] = "집현관"
					return this.buildingName[index]
				case 8:
					this.buildingName[index] = "육영관"
					return this.buildingName[index]
				case 9:
					this.buildingName[index] = "육영관"
					return this.buildingName[index]
			}
		},
		async getEntry() {
			try {
				const response = await this.$axios.get("/api/getentry/", {
					params: { key: localStorage.getItem("key"), SimplePassword: localStorage.getItem("simplePassword"), did: localStorage.getItem("did"), year: this.curYear, month: this.curMonth, day: this.curDay },
				})
				if (response.status === 201) {
					response.data.transaction.forEach((item, i) => {
						this.attributes[i] = { key: i, bar: "red", customData: { building: item.building, time: item.time }, dates: new Date(item.date) }
					})
					this.attributes.push(this.today)
					this.attributes = [...this.attributes]
					this.loading = false
					this.onDayClick(new Date())
				}
			} catch (error) {
				if (error.response) {
					if (error.response.data.msg === "DID를 찾을 수 없습니다.") {
						console.log(error)
					}
				}
			}
		},
	},
}
</script>
<style scoped>
@import "./calendar.css";
</style>
