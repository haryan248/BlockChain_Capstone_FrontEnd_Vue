<template>
	<div>
		<Header :title="'QR인증'" :isShow="false" />
		<div class="container bg-gray">
			<div>
				<div class="qr-content">
					<div class="center stream">
						<div class="close__button">
							<Button icon="pi pi-times" @click="goBack" class="p-button-lg" alt="switch camera" />
						</div>
						<!-- 카메라 전환 -->

						<button class="conver__button" type="button" @click="switchCamera"></button>
						<qr-stream :camera="camera" @decode="onDecode" class="mb" @init="onInit">
							<!-- 로딩화면 -->
							<div class="loading-indicator-qr" v-if="loading">
								잠시만 기다려주세요.
								<ProgressBar mode="indeterminate" style="height: .5em" />
								<!-- <ProgressSpinner  /> -->
							</div>
							<div v-if="validationSuccess" class="validation-success">
								{{ result }}
							</div>

							<div v-if="validationFailure" class="validation-failure">
								This is NOT a URL!
							</div>

							<div v-if="validationPending" class="validation-pending">
								Long validation in progress...
							</div>
							<div v-else style="color: #ff4b4b;" class="frame"></div>
						</qr-stream>
					</div>
					<!-- qr 인증 되었을때 -->
					<!-- <div v-show="showScanConfirmation" class="scan-confirmation">{{ result }}</div> -->
				</div>
			</div>
		</div>
	</div>
	<!-- <BottomNav /> -->
</template>
<script>
import { QrStream } from "vue3-qr-reader"

export default {
	name: "QRScanner",
	components: { QrStream },
	data() {
		return { isValid: undefined, result: "", error: "", loading: false, camera: "front", showScanConfirmation: false }
	},
	mounted() {
		this.$shared.checkGoogleLogin(this.$gAuth)
	},
	computed: {
		validationPending() {
			return this.isValid === undefined && this.camera === "off"
		},

		validationSuccess() {
			return this.isValid === true
		},

		validationFailure() {
			return this.isValid === false
		},
	},
	methods: {
		async onDecode(result) {
			this.result = result
			this.turnCameraOff()

			// pretend it's taking really long
			await this.timeout(3000)
			this.generateEntry(result)

			this.play("https://soundbible.com/mp3/Checkout Scanner Beep-SoundBible.com-593325210.mp3")

			// some more delay, so users have time to read the message
			await this.timeout(2000)
			this.turnCameraOn()
		},
		play(sound) {
			if (sound) {
				var audio = new Audio(sound)
				audio.play()
				console.log(audio.play())
			}
		},

		resetValidationState() {
			this.isValid = undefined
		},
		turnCameraOn() {
			this.camera = "front"
		},

		turnCameraOff() {
			this.camera = "off"
		},

		goBack() {
			this.$router.go(-1)
		},
		//카메라 전환
		switchCamera() {
			console.log(this.camera)
			switch (this.camera) {
				case "front":
					this.camera = "rear"
					break
				case "rear":
					this.camera = "front"
					break
			}
		},

		timeout(ms) {
			return new Promise((resolve) => {
				window.setTimeout(resolve, ms)
			})
		},
		async generateEntry(result) {
			let date = new Date()
			let year = date.getFullYear()
			let month = date.getMonth() + 1
			month = month >= 10 ? month : "0" + month
			let day = date.getDate()
			day = day >= 10 ? day : "0" + day
			let hash = result.split("_")[1]
			let studentDid = result.split("_")[2]
			let timestamp = result.split("_")[3]
			let building = JSON.parse(localStorage.getItem("building"))
			try {
				const response = await this.$axios.post(
					"/api/generateentry/",
					{},
					{
						params: {
							key: localStorage.getItem("key"),
							SimplePassword: localStorage.getItem("simplePassword"),
							admin_did: localStorage.getItem("did"),
							std_did: studentDid,
							year: year,
							building: building,
							month: month,
							day: day,
							timestamp: timestamp,
							hashedData: hash,
						},
					}
				)
				if (response.status === 201) {
					this.isValid = true
					this.showSuccess("인증 완료", "학생증이 인증되었습니다.")
				}
			} catch (error) {
				if (error.response) {
					if (error.response.data.msg === "check_DID error") {
						this.showError("본인 인증 오류", "죄송합니다. \n본인 인증에 오류가 있습니다.")
					} else if (error.response.data.msg === "timestamp error") {
						this.showError("유효 시간 오류", "죄송합니다. \n유효 시간이 지났습니다. 다시 찍어주세요.")
					}
				}
			}
		},
		async onInit(promise) {
			this.loading = true
			try {
				await promise
			} catch (error) {
				if (error.name === "NotAllowedError") {
					this.error = "ERROR: you need to grant camera access permisson"
				} else if (error.name === "NotFoundError") {
					this.error = "ERROR: no camera on this device"
				} else if (error.name === "NotSupportedError") {
					this.error = "ERROR: secure context required (HTTPS, localhost)"
				} else if (error.name === "NotReadableError") {
					this.error = "ERROR: is the camera already in use?"
				} else if (error.name === "OverconstrainedError") {
					this.error = "ERROR: installed cameras are not suitable"
				} else if (error.name === "StreamApiNotSupportedError") {
					this.error = "ERROR: Stream API is not supported in this browser"
				}
			} finally {
				// this.showScanConfirmation = this.camera === "off"
				this.loading = false
				this.resetValidationState()
			}
		},
		showError(summaryText, detailText) {
			this.$toast.add({ severity: "error", summary: summaryText, detail: detailText, life: 3000 })
		},
		showSuccess(summaryText, detailText) {
			this.$toast.add({ severity: "success", summary: summaryText, detail: detailText, life: 3000 })
		},
	},
}
</script>
<style scoped>
@import "./qrscanner.css";
</style>
<style>
@keyframes p-progress-spinner-color {
	100%,
	0% {
		stroke: #2196f3;
	}
	40% {
		stroke: #2196f3;
	}
	66% {
		stroke: #2196f3;
	}
	80%,
	90% {
		stroke: #2196f3;
	}
}
</style>
