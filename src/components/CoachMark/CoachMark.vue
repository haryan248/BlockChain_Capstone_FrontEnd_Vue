<template>
	<div>
		<div v-if="!clicked" class="coach__mark-overlay">
			<div>
				<div class="coach__mark-closebutton" @click="closeCoachMark">
					<i class="close__button pi pi-times" style="fontSize: 2rem"></i>
				</div>
				<div :class="coachMarkType + '__desc'">
					<div :class="coachMarkType + '__subtitle'">1. 관리자는 강의동 설정 탭에서 <br /><span class="focus">강의동</span>을 <span class="focus">선택</span> 해주세요 !</div>
					<div :class="coachMarkType + '__subtitle'">
						2. 두번 터치해서
						<span class="focus">출입자 <br />명단</span>을 <span class="focus">복사</span>
						해보세요 !
					</div>
					<div :class="coachMarkType + '__subtitle'">3. 강의동 <span class="focus">출입자 명부</span>를 확인하세요 !</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "CoachMark",
	props: {
		storageName: String,
		coachMarkType: String,
	},
	data() {
		return {
			clicked: false,
		}
	},
	created() {
		this.checkStorage()
		// 상단바 하단바 z-index 무시 class 삽입
		if (this.clicked === false) document.body.classList.add("unset__zindex")
	},
	methods: {
		// 코치마크 닫기 클릭 함수
		closeCoachMark() {
			document.body.classList.remove("unset__zindex")
			JSON.stringify(localStorage.setItem(this.storageName, true))
			this.clicked = true
		},
		// 로컬 스토리지 체크
		checkStorage() {
			if (localStorage.getItem(this.storageName) !== null && JSON.parse(localStorage.getItem(this.storageName)) === true) {
				this.clicked = true
			} else {
				this.clicked = false
			}
		},
	},
}
</script>
<style scoped>
@import "./coach-mark.css";
</style>
