<template>
	<div>
		<div class="container bg-gray" :class="{ 'bg-dark': darkModeState }">
			<div class="calendar__content">
				<Header :title="'캘린더'" @confirmSetting="confirmSetting" />
				<v-date-picker ref="calendar" :attributes="attributes" :is-dark="darkModeState" @dayclick="onDayClick" v-model="selectDate.date" @update:to-page="toPage" is-expanded />
				<!-- loading screen -->
				<div v-if="loading" class="loading__overlay">
					<div class="loading__progressbar">
						<h5 class="calendar_loading">출입 여부를 불러오는 중입니다.</h5>
						<ProgressBar mode="indeterminate" style="height: .5em" />
					</div>
				</div>
				<div class="schedule__content" :class="{ dark__mode: darkModeState }">
					<div class="item__content">
						<div v-for="(item, index) in selectDate" :key="index" class="entry__content">
							<div class="schedule__date">
								{{ item.day }}
							</div>
							<!-- entry download button -->
							<div class="refresh__button">
								<h4 class="load__text">{{ loadMonth }}월 출입 기록</h4>
								<Button icon="pi pi-download" @click="getEntry" class="border__none-refresh p-button-lg p-button-rounded p-button-text p-button-secondary" />
							</div>
							<!-- kyonggi university map button -->
							<div class="map__button">
								<h4 class="map__text">경기대학교 지도</h4>
								<Button icon="pi pi-map" @click="openDisplayMap" class="border__none-map p-button-lg p-button-rounded p-button-text p-button-secondary" />
							</div>
							<!-- before check entrylist -->
							<div v-if="loading" class="entry-empty__list" :class="{ dark__mode: darkModeState }">
								<li class="list__item">
									<div class="empty-list__item">
										<div class="item__content">
											<div class="item__summary">
												<h3 class="empty__desc">방문한 기록을 확인해보세요!</h3>
											</div>
										</div>
									</div>
								</li>
							</div>
							<!-- no entrylist -->
							<div v-else-if="item.attributes.length === 0" class="entry-empty__list" :class="{ dark__mode: darkModeState }">
								<li class="list__item">
									<div class="empty-list__item">
										<div class="item__content">
											<div class="item__summary">
												<h3 class="empty__desc">방문한 기록이 없어요!</h3>
											</div>
										</div>
									</div>
								</li>
							</div>
							<!-- has entrylist -->
							<div v-else class="entry-list__content" :class="{ dark__mode: darkModeState }">
								<div v-for="(attribute, index) in item.attributes" :key="index">
									<li class="list__item">
										<div class="entry-list__item">
											<div class="item__content">
												<div class="item__summary">
													<h3 class="entry__time">{{ attribute.time }}</h3>
													<h3 class="class__room">{{ checkBuildingName(attribute.building, index) }}</h3>
												</div>
											</div>
										</div>
									</li>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- kyonggi map modal -->
				<Dialog class="kyonggi__map-modal" :class="{ dark__mode: darkModeState }" :showHeader="false" v-model:visible="displayMapModal" :style="{ width: '90vw' }" :modal="true">
					<p class="kyonggi__map-detail">
						<iframe
							src="https://m.map.naver.com/search2/site.naver?query=%EA%B2%BD%EA%B8%B0%EB%8C%80&sm=hty&style=v5&code=11591483#/map"
							width="100%"
							height="400"
							frameborder="0"
							style="border:0; border-radius:4px"
							allowfullscreen=""
						></iframe>
					</p>
					<template #footer>
						<Button label="확인" icon="pi pi-check" class="border-none p-button-outlined" @click="closeDisplayMap" autofocus />
					</template>
				</Dialog>
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
			loadMonth: "",
			buildingName: [],
			loading: false,
			displayMapModal: false,
			selectDate: [
				{
					day: "",
					attributes: [],
				},
			],
			today: {
				highlight: {
					color: "blue",
					fillMode: "outline",
				},
				dates: new Date(),
			},
			attributes: [
				{
					dot: "",
					key: 0,
					customData: {
						building: "",
						time: "",
					},
					compareDate: null,
					dates: null,
				},
				{
					highlight: {
						color: "blue",
						fillMode: "outline",
					},
					dates: new Date(),
				},
			],
			darkModeState: this.$shared.checkDarkMode(),
		}
	},
	mounted() {
		this.$shared.checkGoogleLogin(this.$gAuth)
		this.setDate()
		this.selectDate[0].day = this.curYear + "-" + this.curMonth + "-" + this.curDay
	},
	methods: {
		confirmSetting() {
			this.darkModeState = this.$shared.checkDarkMode()
		},
		// 초기 데이트 설정
		setDate() {
			this.curYear = this.today.dates.getFullYear()
			this.curMonth = this.today.dates.getMonth() + 1
			this.curMonth = this.curMonth >= 10 ? this.curMonth : "0" + this.curMonth
			this.curDay = this.today.dates.getDate()
			this.curDay = this.curDay >= 10 ? this.curDay : "0" + this.curDay
		},
		// 달력 넘길 때 함수
		toPage(page) {
			this.loadMonth = page.month
			page.month = page.month >= 10 ? page.month : "0" + page.month
			this.curYear = page.year
			this.curMonth = page.month
			this.curDay = "01"
		},
		// 날짜 클릭 시 함수
		onDayClick(day) {
			this.curMonth = day.month
			this.curMonth = this.curMonth >= 10 ? this.curMonth : "0" + this.curMonth
			this.curYear = day.year
			this.curDay = day.day

			this.selectDate[0].day = day.id
			this.selectDate[0].attributes = []
			day.attributes.forEach((item, i) => {
				if (item.customData !== undefined) {
					this.selectDate[0].attributes[i] = { building: item.customData.building, time: item.customData.time }
				}
			})
		},
		// 강의동에 따른 건물 이름 매핑
		checkBuildingName(building, index) {
			switch (Number(building)) {
				case 1:
					this.buildingName[index] = "1강의동 (진리관)"
					return this.buildingName[index]
				case 2:
					this.buildingName[index] = "2강의동 (성신관)"
					return this.buildingName[index]
				case 3:
					this.buildingName[index] = "3강의동 (애경관)"
					return this.buildingName[index]
				case 4:
					this.buildingName[index] = "4강의동 (예지관)"
					return this.buildingName[index]
				case 5:
					this.buildingName[index] = "5강의동 (덕문관)"
					return this.buildingName[index]
				case 6:
					this.buildingName[index] = "6강의동 (광교관)"
					return this.buildingName[index]
				case 7:
					this.buildingName[index] = "7강의동 (집현관)"
					return this.buildingName[index]
				case 8:
					this.buildingName[index] = "8강의동 (육영관)"
					return this.buildingName[index]
				case 9:
					this.buildingName[index] = "9강의동 (호연관)"
					return this.buildingName[index]
				case 10:
					this.buildingName[index] = "E-스퀘어"
					return this.buildingName[index]
				case 11:
					this.buildingName[index] = "감성코어"
					return this.buildingName[index]
				case 12:
					this.buildingName[index] = "학생회관"
					return this.buildingName[index]
				case 13:
					this.buildingName[index] = "중앙도서관"
					return this.buildingName[index]
			}
		},
		// 출입 여부 받아오기
		async getEntry() {
			this.loading = true
			try {
				const response = await this.$axios.get("/api/entry/", {
					params: { key: localStorage.getItem("key"), entry_did: localStorage.getItem("did") },
				})
				if (response.status === 201) {
					// 달력에 데이터 바인딩
					response.data.entry.forEach((item, i) => {
						this.attributes[i] = { key: i, bar: "red", customData: { building: item.building_num, time: item.entry_time }, compareDate: item.entry_date, dates: new Date(item.entry_date) }
					})
					this.attributes.push(this.today)
					this.attributes = [...this.attributes]
					this.selectDate[0].day = this.curYear + "-" + this.curMonth + "-" + this.curDay
					// 현재 날짜에 맞는 달력의 데이터 바인딩
					let j = 0
					this.attributes.forEach((item) => {
						if (this.selectDate[0].day === item.compareDate) {
							this.selectDate[0].attributes[j++] = { building: item.customData.building, time: item.customData.time }
						}
						if (j === 0) this.selectDate[0].attributes = []
					})
				}
			} catch (error) {
				if (error.response) {
					if (error.response.data.msg === "has no entry") {
						// 해당 달에 출입한 적이 없을 때
						console.log(error.response.data.msg)
					}
				}
			}
			this.loading = false
		},

		// 경기대학교 지도 토글 함수
		openDisplayMap() {
			this.displayMapModal = true
		},
		closeDisplayMap() {
			this.displayMapModal = false
		},
	},
}
</script>
<style scoped>
@import "./calendar.css";
</style>
<style>
.vc-day-content:focus {
	font-weight: var(--font-bold);
	background-color: transparent !important;
}
.vc-day-content:hover {
	background-color: transparent !important;
}
.kyonggi__map-modal .p-dialog-content {
	border-radius: 20px 20px 0 0;
	padding: 15px;
}
.kyonggi__map-modal .p-dialog-footer {
	border-top: 1px solid #e2e2e2;
	padding: 15px;
	border-radius: 0 0 20px 20px;
	text-align: center;
}

/* 다크모드 css  */
.kyonggi__map-modal.dark__mode .p-dialog-content,
.kyonggi__map-modal.dark__mode .p-dialog-footer {
	background-color: #333536;
}
</style>
