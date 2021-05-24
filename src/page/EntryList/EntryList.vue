<template>
	<div>
		<Header :title="'출입 여부'" @confirmSetting="confirmSetting" />

		<div class="container bg-gray" :class="{ 'bg-dark': darkModeState }">
			<div>
				<div class="entry__admin">
					<HeaderSection class="entry_admin-headersection" :viewDate="false" :title="buildingName" :subtitle="'출입자 명단을 확인해보세요.'" :darkModeState="darkModeState" />
					<div class="filter__section">
						<Button v-if="selectOrder === 'Desc'" label="날짜순" class="p-button-sm p-button-outlined filter__button" :class="{ dark__mode: darkModeState }" icon="pi pi-sort-up" @click="orderDate" />
						<Button v-if="selectOrder === 'Asc'" label="날짜순" class="p-button-sm p-button-outlined filter__button" :class="{ dark__mode: darkModeState }" icon="pi pi-sort-down" @click="orderDate" />
					</div>

					<div class="entryuser__container" :class="{ dark__mode: darkModeState }">
						<div class="item__content">
							<div class="entry__content">
								<div class="entryuser-list__content" :class="{ dark__mode: darkModeState }">
									<div v-if="entryList[0].building === ''">
										<div class="emptyuser-list">
											<p v-if="building === null">
												<i class="pi pi-users" style="fontSize: 2rem"></i>
												<br /><br />
												강의동을 <br />먼저 설정해주세요.
											</p>
											<p v-else>
												<i class="pi pi-users" style="fontSize: 2rem"></i>
												<br /><br />
												{{ buildingName }}에 출입한 <br />학생이 없습니다.
											</p>
										</div>
									</div>
									<div v-else v-for="(entryItem, index) in entryList" :key="index">
										<li class="list__item">
											<div class="entryuser-list__item">
												<div class="item__content">
													<div class="item__summary" @click="copyToClipboard" :data-date="entryItem.date" :data-time="entryItem.time" :data-building="entryItem.building" :data-did="entryItem.did">
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
						<Paginator :class="{ dark__mode: darkModeState }" :rows="10" :pageLinkSize="3" :totalRecords="totalRecords" @page="onPage($event)" />
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
			totalRecords: 0,
			curPage: 1,
			totalPage: "",
			selectOrder: "Asc",
		}
	},
	created() {
		this.checkBuilding()
		this.getEntryListForAdmin()
	},
	methods: {
		confirmSetting() {
			this.darkModeState = this.$shared.checkDarkMode()
		},
		checkBuilding() {
			switch (this.building) {
				case 1:
					this.buildingName = "1 강의동 (진리관)"
					break
				case 2:
					this.buildingName = "2 강의동 (성신관)"
					break
				case 3:
					this.buildingName = "3 강의동 (애경관)"
					break
				case 4:
					this.buildingName = "4 강의동 (예지관)"
					break
				case 5:
					this.buildingName = "5 강의동 (덕문관)"
					break
				case 6:
					this.buildingName = "6 강의동 (광교관)"
					break
				case 7:
					this.buildingName = "7 강의동 (집현관)"
					break
				case 8:
					this.buildingName = "8 강의동 (육영관)"
					break
				case 9:
					this.buildingName = "9 강의동 (호연관)"
					break
				case 10:
					this.buildingName = "E-스퀘어"
					break
				case 11:
					this.buildingName = "감성코어"
					break
				case 12:
					this.buildingName = "학생회관"
					break
				case 13:
					this.buildingName = "중앙도서"
					break
				default:
					this.buildingName = "강의동을 선택해주세요."
					break
			}
		},
		// 페이지네이션 클릭시
		onPage(event) {
			this.curPage = event.page + 1
			this.getEntryListForAdmin()
		},
		//정렬 버튼 클릭시
		orderDate() {
			if (this.selectOrder === "Asc") {
				this.selectOrder = "Desc"
			} else {
				this.selectOrder = "Asc"
			}
			this.getEntryListForAdmin()
		},
		copyToClipboard(evt) {
			const textNode = document.createElement("textarea")
			textNode.value = "날짜: " + evt.currentTarget.dataset.date + " 시간: " + evt.currentTarget.dataset.time + " 출입 건물: " + evt.currentTarget.dataset.building + " did: " + evt.currentTarget.dataset.did
			document.body.appendChild(textNode)
			textNode.select()
			const copy = document.execCommand("copy")
			document.body.removeChild(textNode)
			if (copy === true) {
				this.showSuccess("클립보드 복사 완료", "클립보드에 복사가 완료되었습니다.")
			} else {
				this.showError("클립보드 복사 실패", "죄송합니다. \n복사에 실패했습니다.")
			}
		},
		//did 찾기
		async getEntryListForAdmin() {
			this.loading = true
			try {
				const response = await this.$axios.get("/api/entryadmin/", { params: { building_num: localStorage.getItem("building"), page_num: this.curPage, order: this.selectOrder } })
				if (response.status === 201) {
					this.totalPage = response.data.total_page
					this.totalRecords = Number(response.data.total_count)
					this.entryList = []
					response.data.entry.forEach((item, i) => {
						this.entryList[i] = { building: item.building_num, time: item.entry_time, date: item.entry_date, did: item.entry_did }
					})
					this.entryList = [...this.entryList]
				}
			} catch (error) {
				if (error.response) {
					if (error.response.data.msg === "has no entry") {
						console.log(error.response.data)
					}
				}
			}
			this.loading = false
		},
		// 설정 완료시 띄워주는 toast message
		showSuccess(summaryText, detailText) {
			this.$toast.add({ severity: "info", summary: summaryText, detail: detailText, life: 3000 })
		},
		//에러 토스트 메시지
		showError(summaryText, detailText) {
			this.$toast.add({ severity: "error", summary: summaryText, detail: detailText, life: 3000 })
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
.p-button.p-button-outlined.filter__button:enabled:hover {
	background: #ffffff;
	color: #435e6b;
	border: 1px solid #cbd5e0;
}
.entry_admin-headersection .headerSection__title {
	margin-top: 20px;
}
.p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
	background: #4a83e5;
	border-color: #e3f2fd;
	color: #ffffff;
}
.p-link:focus {
	box-shadow: none !important;
}
.p-paginator {
	border: 1px solid #cbd5e0;
}
/* 다크모드 css  */
button.p-button.p-component.p-button-sm.p-button-outlined.filter__button.dark__mode {
	color: #ffffff;
	background-color: #333536;
	border: 1px solid #333536;
}

.p-paginator.p-component.dark__mode {
	color: #ffffff;
	background-color: #333536;
	border: 1px solid #333536;
}
.p-paginator.p-component.dark__mode .p-paginator-first,
.p-paginator.p-component.dark__mode .p-paginator-prev,
.p-paginator.p-component.dark__mode .p-paginator-next,
.p-paginator.p-component.dark__mode .p-paginator-last {
	color: #ffffff;
}
.p-paginator.p-component.dark__mode .p-link:focus {
	box-shadow: none !important;
}

.p-paginator.p-component.dark__mode button.p-paginator-page.p-paginator-element.p-link.p-highlight,
.p-paginator.p-component.dark__mode .p-paginator-page:not(.p-highlight):hover {
	background: #495057;
	border-color: #495057;
	color: #ffffff;
}
</style>
