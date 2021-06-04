<template>
	<div class="QR-Verification">
		<div class="QR-card">
			<div class="QR-wrapper">
				<div class="box">
					<div class="qr-card__item">
						<!-- qr code title -->
						<p v-if="isStudentId" class="item__title">입장을 위한 QR코드</p>
						<p v-else class="item__title p-text-center p-text-bold">주문 확인을 위한 QR코드</p>
						<div v-if="isStudentId" class="item__time">
							<i class="pi pi-clock" style="fontSize: 14px; margin-right:5px"></i>
							<!-- qr code remaining time -->
							<div v-if="countDown === 0">인증 유효시간 초과</div>
							<div v-else class="time__sec">
								<div class="rest__time-text">남은 시간</div>
								<div class="rest__time">{{ countDown }}</div>
							</div>
						</div>
						<div class="demo-container p-p-4">
							<!-- qr code output part -->
							<div class="item__code" :class="{ item__refresh: countDown === 0 }">
								<VueQrcode :value="qrString" :size="150" />
							</div>
						</div>
						<!-- reissue when qr time expires -->
						<Button v-if="countDown === 0" iconPos="top" size="large" icon="pi pi-refresh" @click="resetQR" class="p-button-rounded refresh__button" />
						<p class="item__desc p-text-center p-text-bold">QR코드를 리더기에 제시해주세요</p>
					</div>
				</div>
			</div>
		</div>
		<!-- back button -->
		<div class="qr-verification__button">
			<Button label="돌아가기" icon="pi pi-times" iconPos="left" @click="goBack()" />
		</div>
	</div>
</template>
<script>
import VueQrcode from "qrcode.vue"

export default {
	name: "QRVerification",
	props: {
		isStudentId: null,
		SimplePassword: null,
		did: null,
	},
	components: {
		VueQrcode,
	},
	data() {
		return { countDown: 15, polling: null, timeStamp: null, qrString: "", darkModeState: this.$shared.checkDarkMode() }
	},
	created() {
		this.setQRString()
		this.countDownTimer()
	},
	unmounted() {
		// polling 제거
		clearInterval(this.polling)
	},
	methods: {
		// qr코드 = H(H(did + simplepassword) + timestamp) + did + timestamp
		setQRString() {
			this.timeStamp = Math.round(+new Date() / 1000)
			this.qrString = "https://" + "_" + this.$sha256(this.$sha256(this.did + this.SimplePassword) + this.timeStamp) + "_" + this.did + "_" + this.timeStamp
		},
		// 15초 카운트 다운
		countDownTimer() {
			if (this.isStudentId) {
				this.polling = setInterval(() => {
					this.countDown-- //1찍 감소
					if (this.countDown <= 0) clearInterval(this.polling)
				}, 1000)
			}
		},
		// qr 재발급
		resetQR() {
			clearInterval(this.polling)
			this.countDown = 15
			this.countDownTimer()
			this.setQRString()
		},
		// 뒤로가기
		goBack() {
			this.$emit("goBack")
		},
	},
}
</script>
<style scoped>
@import "./qrverification.css";
</style>
