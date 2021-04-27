<template>
	<div class="QR-Verification">
		<div class="QR-card">
			<div class="QR-wrapper">
				<div class="box">
					<div class="qr-card__item">
						<p v-if="isStudentId" class="item__desc">입장을 위한 QR코드</p>
						<p v-else class="item__desc p-text-center p-text-bold">주문 확인을 위한 QR코드</p>

						<!-- <QRCode value="http://facebook.github.io//" /> -->
						<div class="demo-container p-p-4">
							<div class="item__code" :class="{ item__refresh: countDown === 0 }">
								<VueQrcode :value="qrString" :size="150" />
							</div>
							<Button v-if="countDown === 0" iconPos="top" size="large" icon="pi pi-refresh" @click="resetQR" class="p-button-rounded refresh__button" />
						</div>

						<!-- qr발급시간이 끝날시 -->
						<!-- <div v-if="countDown === 0" class="item__code-empty">
							<div class="item__reload" @click="countDownTimer"></div>
						</div> -->
						<p class="item__temp p-text-center p-text-bold">QR코드를 리더기에 제시해주세요</p>
						<div v-if="isStudentId" class="item__time">
							남은 시간
							<div class="time__sec">{{ countDown }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div style="display:block; font-size: 2px; width:100% word-break:normal;">
			{{ qrString }}
		</div>
		<div class="qr-verification__button">
			<Button label="돌아가기" icon="pi pi-backward" iconPos="left" @click="goBack()" />
		</div>
	</div>
</template>
<script>
import VueQrcode from "qrcode.vue"
import { SHA256 } from "../../sha256.js"

export default {
	name: "QRVerification",
	props: {
		isStudentId: null,
		DIDPasswd: String,
	},
	components: {
		VueQrcode,
	},
	data() {
		return { countDown: 15, polling: null, timeStamp: null, qrString: "" }
	},
	created() {
		this.setQRString()
		this.countDownTimer()
	},
	unmounted() {
		clearInterval(this.polling)
	},
	methods: {
		setQRString() {
			this.timeStamp = Math.round(+new Date() / 1000)
			this.qrString = SHA256(this.DIDPasswd + this.timeStamp)
		},
		countDownTimer() {
			if (this.isStudentId) {
				this.polling = setInterval(() => {
					this.countDown-- //1찍 감소
					if (this.countDown <= 0) clearInterval(this.polling)
				}, 1000)
			}
		},
		resetQR() {
			clearInterval(this.polling)
			this.countDown = 15
			this.countDownTimer()
			this.setQRString()
		},

		goBack() {
			this.$emit("goBack")
		},
	},
}
</script>
<style scoped>
@import "./qrverification.css";
</style>
