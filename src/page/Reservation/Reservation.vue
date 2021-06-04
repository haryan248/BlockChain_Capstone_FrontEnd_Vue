<template>
	<div>
		<Header :title="'예약'" @confirmSetting="confirmSetting" />
		<div class="container bg-gray" :class="{ 'bg-dark': darkModeState }">
			<div class="reservation-content">
				<HeaderSection :title="'좌석 예약'" :subtitle="'자신의 좌석를 예약해주세요.'" :darkModeState="darkModeState" />
				<!-- seat UI -->
				<div class="row">
					<div class="col-8 py-5">
						<div>
							<table class="reservation__table">
								<tbody>
									<tr v-for="(idxr, r) in rows" :key="r">
										<td v-for="(idxc, c) in cols" class="seat__box" :class="{ dark__mode: darkModeState }" :key="c">
											<div @click="onSeatSelected(idxr, idxc)" v-if="!isAisle(idxr, idxc)" :class="classifier(idxr, idxc)" class="seat"></div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<!-- seat selection UI -->
					<div class="seat__content">
						<div class="seat__select" :class="{ dark__mode: darkModeState }">
							<div>
								<div class="select__item-header">좌석 선택</div>
								<ul class="select__item-body">
									<li @click="changeSeatStatus('RA')" class="list-group-item" :class="seatStatus('RA')">
										<div class="seat-box bg-white">
											<div class="cls-ra select-seat"></div>
										</div>
										<span class="seat__name">예약 가능한 좌석</span>
									</li>
									<li @click="changeSeatStatus('RB')" class="list-group-item" :class="seatStatus('RB')">
										<div class="seat-box">
											<div class="cls-rb select-seat"></div>
										</div>
										<span class="seat__name">예약 불가능 좌석</span>
									</li>
									<li @click="changeSeatStatus('MB')" class="list-group-item" :class="seatStatus('MB')">
										<div class="seat-box">
											<div class="cls-mb select-seat"></div>
										</div>
										<span class="seat__name">예약된 좌석</span>
									</li>
								</ul>
								<div class="select__item-footer">원하는 자리를 선택 후 예약해주세요.</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<BottomNav :darkModeState="darkModeState" />
</template>
<script>
import HeaderSection from "../../components/HeaderSection/HeaderSection"

export default {
	name: "Reservation",
	components: { HeaderSection },
	data() {
		return { errors: [], o: [], selectedSeat: null, rows: 12, cols: 7, seats: [], darkModeState: this.$shared.checkDarkMode() }
	},
	mounted() {
		// 좌석 배열하기
		this.generateSeats()
		this.$shared.checkGoogleLogin(this.$gAuth)
	},
	methods: {
		// 다크모드 세팅
		confirmSetting() {
			this.darkModeState = this.$shared.checkDarkMode()
		},
		// 좌석 가지고 오기
		getSeat(r, c) {
			for (let i = 0; i < this.seats.length; ++i) {
				if (this.seats[i].position.r == r && this.seats[i].position.c == c) {
					return this.seats[i]
				}
			}
			return null
		},
		// 좌석 배열하기
		generateSeats() {
			for (let y = 1; y <= this.rows; ++y) {
				for (let x = 1; x <= this.cols; ++x) {
					if (!this.isAisle(y, x)) {
						this.seats.push({
							position: { r: y, c: x },
							status: "RA",
						})
					}
				}
			}
		},
		// 좌석 분류
		classifier(r, c) {
			let seat = this.getSeat(r, c)
			if (seat != null) {
				if (this.selectedSeat != seat) {
					switch (seat.status) {
						case "RA":
							return "cls-ra"
						case "RB":
							return "cls-rb"
						case "MB":
							return "cls-mb"
						default:
							return "cls-ra"
					}
				} else {
					return "cls-selected"
				}
			}
		},
		// 통로인지 체크
		isAisle(r, c) {
			if (r == 3) {
				if (c >= 1 && c <= 11) {
					return true
				}
			}
			return false
		},
		// 선택된 좌석 함수
		onSeatSelected(r, c) {
			if (this.selectedSeat == this.getSeat(r, c)) {
				this.selectedSeat = null
			} else {
				this.selectedSeat = this.getSeat(r, c)
			}
		},
		// 좌석 상태 확인
		seatStatus(status) {
			if (this.selectedSeat != null) {
				if (this.selectedSeat.status == status) return "active"
			}
			return ""
		},
		// 좌석 변경
		changeSeatStatus(status) {
			if (this.selectedSeat != null) {
				for (let i = 0; i < this.seats.length; ++i) {
					if (this.seats[i].position.r == this.selectedSeat.position.r && this.seats[i].position.c == this.selectedSeat.position.c) {
						this.seats[i].status = status
						this.selectedSeat = null
						break
					}
				}
			}
		},
	},
}
</script>
<style scoped>
@import "./reservation.css";
</style>
