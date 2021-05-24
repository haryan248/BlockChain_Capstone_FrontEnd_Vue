<template>
	<div>
		<Header :title="'예약'" />
		<div class="container bg-gray">
			<div class="reservation-content">
				<div class="row">
					<div class="col-8 py-5">
						<div>
							<table class="mx-auto">
								<tbody>
									<tr v-for="(idxr, r) in rows" :key="r">
										<td v-for="(idxc, c) in cols" class="pl-2" style="width: 50px;" :key="c">
											<div @click="onSeatSelected(idxr, idxc)" v-if="!isAisle(idxr, idxc)" :class="classifier(idxr, idxc)" style="width: 30px; height: 30px; border: 1px solid black;"></div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="col-4 pt-3">
						<div class="card" v-show="selectedSeat != null" style="display: none;">
							<div class="card-header">Properties</div>
							<div class="card-body">
								<ul class="list-group">
									<li @click="changeSeatStatus('RA')" class="list-group-item" :class="seatStatus('RA')">
										<div class="float-left bg-white" style="width: 25px;"><div class="cls-ra" style="width: 30px; height: 30px; border: 1px solid black;"></div></div>
										<span class="px-3">Available</span>
									</li>
									<li @click="changeSeatStatus('RB')" class="list-group-item" :class="seatStatus('RB')">
										<div class="float-left" style="width: 25px;"><div class="cls-rb" style="width: 30px; height: 30px; border: 1px solid black;"></div></div>
										<span class="px-3">Booked</span>
									</li>
									<li @click="changeSeatStatus('FA')" class="list-group-item" :class="seatStatus('FA')">
										<div class="float-left" style="width: 25px;"><div class="cls-fa" style="width: 30px; height: 30px; border: 1px solid black;"></div></div>
										<span class="px-3">Reserve for Female</span>
									</li>
									<li @click="changeSeatStatus('FB')" class="list-group-item" :class="seatStatus('FB')">
										<div class="float-left" style="width: 25px;"><div class="cls-fb" style="width: 30px; height: 30px; border: 1px solid black;"></div></div>
										<span class="px-3">Reserve for Female - Booked</span>
									</li>
									<li @click="changeSeatStatus('MA')" class="list-group-item" :class="seatStatus('MA')">
										<div class="float-left" style="width: 25px;"><div class="cls-ma" style="width: 30px; height: 30px; border: 1px solid black;"></div></div>
										<span class="px-3">Reserve for Male</span>
									</li>
									<li @click="changeSeatStatus('MB')" class="list-group-item" :class="seatStatus('MB')">
										<div class="float-left" style="width: 25px;"><div class="cls-mb" style="width: 30px; height: 30px; border: 1px solid black;"></div></div>
										<span class="px-3">Reserve for Male - Booked</span>
									</li>
								</ul>
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
export default {
	name: "Reservation",
	components: {},
	data() {
		return { errors: [], o: [], selectedSeat: null, rows: 12, cols: 7, seats: [], darkModeState: this.$shared.checkDarkMode() }
	},
	computed: {},
	methods: {
		confirmSetting() {
			this.darkModeState = this.$shared.checkDarkMode()
		},
		getSeat(r, c) {
			for (let i = 0; i < this.seats.length; ++i) {
				if (this.seats[i].position.r == r && this.seats[i].position.c == c) {
					return this.seats[i]
				}
			}
			return null
		},
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
		classifier(r, c) {
			let seat = this.getSeat(r, c)
			if (seat != null) {
				if (this.selectedSeat != seat) {
					switch (seat.status) {
						case "RA":
							return "cls-ra"
						case "RB":
							return "cls-rb"
						case "FA":
							return "cls-fa"
						case "FB":
							return "cls-fb"
						case "MA":
							return "cls-ma"
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
		isAisle(r, c) {
			if (r == 3) {
				if (c >= 1 && c <= 11) {
					return true
				}
			}
			return false
		},
		onSeatSelected(r, c) {
			if (this.selectedSeat == this.getSeat(r, c)) {
				this.selectedSeat = null
			} else {
				this.selectedSeat = this.getSeat(r, c)
			}
		},
		seatStatus(status) {
			if (this.selectedSeat != null) {
				if (this.selectedSeat.status == status) return "active"
			}
			return ""
		},
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
	beforeMount() {},
	mounted() {
		this.generateSeats()
	},
}
</script>
<style scoped>
@import "./reservation.css";
</style>
