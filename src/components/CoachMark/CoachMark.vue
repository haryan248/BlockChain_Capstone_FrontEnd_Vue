<template>
	<div>
		<div v-if="!clicked" class="coach__mark-overlay">
			<div>
				<div class="coach__mark-closebutton" @click="closeCoachMark">
					<i class="close__button pi pi-times" style="fontSize: 2rem"></i>
				</div>
				<!-- Clipboard coach mark screen -->
				<div v-if="coachMarkType === 'clipboard'" :class="coachMarkType + '__desc'">
					<div :class="coachMarkType + '__subtitle'">1. 관리자는 강의동 설정 탭에서 <br /><span class="focus">강의동</span>을 <span class="focus">선택</span> 해주세요 !</div>
					<div :class="coachMarkType + '__subtitle'">
						2. 두번 터치해서
						<span class="focus">출입자 <br />명단</span>을 <span class="focus">복사</span>
						해보세요 !
					</div>
					<div :class="coachMarkType + '__subtitle'">3. 강의동 <span class="focus">출입자 명부</span>를 확인하세요 !</div>
				</div>
				<!-- Student Id coach mark screen -->
				<div v-else-if="coachMarkType === 'student-id'" :class="coachMarkType + '__desc'">
					<div :class="coachMarkType + '__title'">
						안녕하세요! <span class="focus">{{ name }}</span> 님
						<br />
						<br />
						U-PASS를 이용해 주셔서 <br />감사합니다.
					</div>
					<div :class="coachMarkType + '__content'">
						<div :class="coachMarkType + '__subtitle'">분산 네트워크를 사용한 안전한 <br /><span class="focus">학생증 어플</span>입니다.</div>
						<div :class="coachMarkType + '__subtitle'">학생증 기능뿐만 아니라 <br />다양한 기능을 사용해보세요 !</div>
						<div :class="coachMarkType + '__subtitle'">
							<span class="focus">학생증 버튼</span>을 클릭해 간편하게 <br />
							학생증을 사용해보세요!
						</div>
						<br />
						<i class="pi pi-arrow-down" style="fontSize: 2rem"></i>
					</div>
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
			name: JSON.parse(localStorage.getItem("members")).name,
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
