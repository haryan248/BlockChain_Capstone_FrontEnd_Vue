<template>
	<div>
		<p class="error">{{ error }}</p>

		<p class="decode-result">
			Last result: <b>{{ result }}</b>
		</p>
		<qr-stream :camera="camera" @decode="onDecode" @init="onInit">
			<!-- 로딩화면 -->
			<div class="loading-indicator" v-if="loading">
				Loading...
			</div>
			<!-- 카메라 전환 -->
			<Button icon="pi pi-undo" @click="switchCamera" class="p-mr-2" alt="switch camera"  />

			<!-- qr 인증 되었을때 -->
			<div v-show="showScanConfirmation" class="scan-confirmation">
			</div>
		</qr-stream>
	</div>
</template>
<script>
import { QrStream } from "vue3-qr-reader"
export default {
	name: "QRScanner",
	components: { QrStream },
	data() {
		return { result: "", error: "", loading: false, camera: "auto", showScanConfirmation: false }
	},
	methods: {
		async onDecode(result) {
			this.result = result
			console.log(result)
			this.pause()
			await this.timeout(500)
			this.unpause()
		},
		unpause() {
			this.camera = "rear"
		},

		pause() {
			this.camera = "off"
		},

		//카메라 전환
		switchCamera() {
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
				this.showScanConfirmation = this.camera === "off"
				this.loading = false
			}
		},
	},
}
</script>
<style scoped>
@import "./qrscanner.css";
</style>
