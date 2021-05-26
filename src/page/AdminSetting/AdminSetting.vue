<template>
	<div>
		<Header :title="'관리자 설정'" @confirmSetting="confirmSetting" />
		<div class="container bg-gray" :class="{ 'bg-dark': darkModeState }">
			<div class="admin__setting-content">
				<HeaderSection :title="'강의동 설정'" :subtitle="'강의동을 선택해주세요.'" :darkModeState="darkModeState" />
				<!-- Lecture building selection screen -->
				<div class="setting__select" :class="{ dark__mode: darkModeState }">
					<div class="item__content">
						<div class="select__list" :class="{ dark__mode: darkModeState }">
							<li v-for="item in selectBuilding" :key="item.key" class="p-field-radiobutton">
								<RadioButton :id="item.key" :name="item" :value="item" v-model="building" />
								<label :for="item.key">{{ item.name }}</label>
							</li>
						</div>
					</div>
				</div>
				<!-- Settings confirmation button -->
				<div class="setting-confirm__button">
					<Button label="설정 확인" icon="pi pi-check" iconPos="left" @click="confirmBuilding" />
				</div>
			</div>
		</div>
		<BottomNav :darkModeState="darkModeState" />
	</div>
</template>
<script>
import HeaderSection from "../../components/HeaderSection/HeaderSection"

export default {
	name: "AdminSetting",
	components: { HeaderSection },
	data() {
		return {
			building: null,
			darkModeState: this.$shared.checkDarkMode(),
			checkBuilding: JSON.parse(localStorage.getItem("building")),
			selectBuilding: [
				{
					name: "1강의동 (진리관)",
					key: "1",
				},
				{
					name: "2강의동 (성신관)",
					key: "2",
				},
				{
					name: "3강의동 (애경관)",
					key: "3",
				},
				{
					name: "4강의동 (예지관)",
					key: "4",
				},
				{
					name: "5강의동 (덕문관)",
					key: "5",
				},
				{
					name: "6강의동 (광교관)",
					key: "6",
				},
				{
					name: "7강의동 (집현관)",
					key: "7",
				},
				{
					name: "8강의동 (육영관)",
					key: "8",
				},
				{
					name: "9강의동 (호연관)",
					key: "9",
				},
				{
					name: "E-스퀘어",
					key: "10",
				},
				{
					name: "감성코어",
					key: "11",
				},
				{
					name: "학생회관",
					key: "12",
				},
				{
					name: "중앙도서관",
					key: "13",
				},
			],
		}
	},
	created() {
		// 설정되어 있는 강의동 확인
		if (this.checkBuilding) {
			this.building = this.selectBuilding[this.checkBuilding - 1]
		}
	},
	methods: {
		// 다크모드 설정
		confirmSetting() {
			this.darkModeState = this.$shared.checkDarkMode()
		},
		// 강의동 선택 함수
		confirmBuilding() {
			JSON.stringify(localStorage.setItem("building", this.building.key))
			if (this.building === null) this.showError("강의동 설정 실패", "강의동을 선택해주세요.")
			else this.showSuccess("강의동 설정 완료", "선택하신 강의동이 설정되었습니다.")
		},
		// 성공 토스트 메시지
		showSuccess(summaryText, detailText) {
			this.$toast.add({ severity: "success", summary: summaryText, detail: detailText, life: 3000 })
		}, // 에러 토스트 메시지
		showError(summaryText, detailText) {
			this.$toast.add({ severity: "error", summary: summaryText, detail: detailText, life: 3000 })
		},
	},
}
</script>
<style scoped>
@import "./admin-setting.css";
</style>
