<template>
	<div>
		<Header :title="'출입 여부'" @confirmSetting="confirmSetting" />

		<div class="container bg-gray" :class="{ 'bg-dark': darkModeState }">
			<div>
				<div class="entry__admin">
					<HeaderSection :title="building + ' 강의동' + ' (' + buildingName + ')'" :subtitle="'출입자 명단을 확인해보세요.'" :darkModeState="darkModeState" />
					<div class="filter__section">
						<Button label="날짜순" class="p-button-sm p-button-outlined filter__button" :class="{ dark__mode: darkModeState }" icon="pi pi-sort-up" @click="getEntryListForAdmin" />
						<Button label="시간순" class="p-button-sm p-button-outlined filter__button" :class="{ dark__mode: darkModeState }" icon="pi pi-sort-up" @click="getEntryListForAdmin" />
					</div>
					<div class="entryuser__container" :class="{ dark__mode: darkModeState }">
						<div class="item__content">
							<div class="entry__content">
								<div class="entryuser-list__content" :class="{ dark__mode: darkModeState }">
									<div v-if="!clickEntry">
										<div class="emptyuser-list">
											<i class="pi pi-users" style="fontSize: 2rem"></i>
											<br /><br />출입 여부를 <br />확인해보세요!
										</div>
									</div>
									<div v-else-if="entryList[0].building === ''">
										<div class="emptyuser-list">
											<i class="pi pi-users" style="fontSize: 2rem"></i>
											<br /><br />{{ building }} 강의동에 출입한 <br />학생이 없습니다.
										</div>
									</div>
									<div v-else v-for="(entryItem, index) in entryList" :key="index">
										<li class="list__item">
											<div class="entryuser-list__item">
												<div class="item__content">
													<div class="item__summary">
														<h3 class="entry__desc">{{ entryItem.date }}</h3>
														<h3 class="entry__desc">{{ entryItem.time }}</h3>
														<h3 class="entry__desc">{{ entryItem.building }}강의동</h3>
														<h3 class="entry__desc">{{ entryItem.did }}</h3>
													</div>
												</div>
											</div>
										</li>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="check__entry-button">
						<Button label="출입 여부 확인" icon="pi pi-sort-amount-down" class="p-button-sm" @click="getEntryListForAdmin" />
					</div>
				</div>
			</div>
		</div>
		<BottomNav :darkModeState="darkModeState" />
	</div>
</template>
<script>
import HeaderSection from "../../components/HeaderSection/HeaderSection"

export default {
	name: "EntryList",
	components: { HeaderSection },
	data() {
		return {
			darkModeState: this.$shared.checkDarkMode(),
			building: JSON.parse(localStorage.getItem("building")),
			buildingName: "",
			entryList: [
				{
					building: "",
					date: "",
					entryDid: "",
					time: "",
				},
			],
			clickEntry: false,
		}
	},
	created() {
		this.checkBuilding()
		console.log(this.entryList[0].building === "")
	},
	methods: {
		confirmSetting() {
			this.darkModeState = this.$shared.checkDarkMode()
		},
		checkBuilding() {
			switch (this.building) {
				case 1:
					this.buildingName = "진리관"
					break
				case 2:
					this.buildingName = "성신관"
					break
				case 3:
					this.buildingName = "애경관"
					break
				case 4:
					this.buildingName = "예지관"
					break
				case 5:
					this.buildingName = "덕문관"
					break
				case 6:
					this.buildingName = "광교관"
					break
				case 7:
					this.buildingName = "집현관"
					break
				case 8:
					this.buildingName = "육영관"
					break
				case 9:
					this.buildingName = "호연관"
					break
			}
		},
		//did 찾기
		async getEntryListForAdmin() {
			this.loading = true
			try {
				const response = await this.$axios.get("/api/entryadmin/", { params: { building_num: localStorage.getItem("building") } })
				if (response.status === 201) {
					this.clickEntry = true
					response.data.entry.forEach((item, i) => {
						this.entryList[i] = { building: item.building_num, time: item.entry_time, date: item.entry_date, did: item.entry_did }
					})
				}
			} catch (error) {
				if (error.response) {
					if (error.response.data.msg === "has no entry") {
						console.log(error.response.data)
						console.log(this.entryList)
						console.log(this.entryList.length)
						this.clickEntry = true
					}
				}
			}
			this.loading = false
		},
	},
}
</script>
<style scoped>
@import "./entry-list.css";
</style>
<style>
.p-button.p-button-outlined.filter__button {
	background: #ffffff;
	outline: none !important;
	box-shadow: none !important;
}
.p-button.p-button-outlined.filter__button {
	color: #495057;
	border: 1px solid #cbd5e0;
}
.p-button.p-button-outlined:enabled:hover {
	background: #ffffff;
	color: #435e6b;
	border: 1px solid #cbd5e0;
}

/* 다크모드 css  */
button.p-button.p-component.p-button-sm.p-button-outlined.filter__button.dark__mode {
	color: #ffffff;
	background-color: #333536;
	border: 1px solid #333536;
}
</style>
