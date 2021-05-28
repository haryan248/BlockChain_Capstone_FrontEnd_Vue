<template>
	<div>
		<Header :title="'QR인증'" :isShow="false" />
		<div class="container bg-gray">
			<div>
				<div class="qr-content">
					<div class="center stream">
						<div class="close__button">
							<Button icon="pi pi-times" @click="goBack" class="p-button" alt="switch camera" />
						</div>
						<QrStream v-if="!state.displayQRWarningModal" :camera="state.camera" @decode="onDecode" @init="onInit">
							<!-- Loading screen -->
							<div class="loading-indicator-qr" v-if="state.loading && !state.firstLoading">
								카메라가 로딩중입니다.
								<ProgressBar mode="indeterminate" style="height: .5em" />
							</div>
							<div v-else-if="validationSuccess" class="validation-success">
								<i class="pi pi-spin pi-spinner" style="fontSize: 5rem"></i>
							</div>
							<div v-else-if="validationPending" class="validation-pending">
								<i class="pi pi-spin pi-spinner" style="fontSize: 5rem"></i>
							</div>
							<!-- center QR screen -->
							<div v-else>
								<div class="QR_title">QR 인증</div>
								<div class="frame">
									<div class="center__box"><i class="pi pi-plus" style="fontSize: 1rem;"></i></div>
									<div class="left_top-box"></div>
									<div class="right_top-box"></div>
									<div class="left_bottom-box"></div>
									<div class="right_bottom-box"></div>
								</div>
								<div class="QR_descirpt"><span class="focus">QR코드</span>로 인증을 진행할 수 있습니다. <br />카메라 화면 안에 <span class="focus">QR 코드</span>를 <span class="focus">인식</span>시켜주세요.</div>
							</div>
						</QrStream>
						<!-- Camera switch -->
						<div class="switch__button" @click="switchCamera">
							<div>카메라 전환</div>
						</div>
					</div>
					<!-- QR Warning modal -->
					<Dialog class="qr__warning-modal" :showHeader="false" v-model:visible="state.displayQRWarningModal" :style="{ width: '80vw' }" :modal="true">
						<p class="warning-info__detail">
							<br />
							QR 인증을 위해서는<br />
							<span class="focus">강의동 선택</span>이 <br /><span class="focus">필수</span>로 필요합니다.
							<br />
							<br />
							강의동을 먼저 선택해주세요!
							<br />
							<br />
						</p>
						<template #footer>
							<Button label="확인" icon="pi pi-check" class="border-none p-button-outlined" @click="goBack" />
						</template>
					</Dialog>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { QrStream } from "vue3-qr-reader"
import { defineComponent, computed, reactive, onMounted } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import { useToast } from "primevue/usetoast"

export default defineComponent({
	name: "QRScanner",
	components: { QrStream },
	setup() {
		const router = useRouter()
		const toast = useToast()

		const state = reactive({
			isValid: undefined,
			result: "",
			error: "",
			loading: false,
			camera: "rear",
			checkQR: false,
			firstLoading: false,
			displayQRWarningModal: false,
		})
		onMounted(() => {
			if (localStorage.getItem("building") === null) {
				openQRWarningModal()
			}
		})
		// QR 검증 진행
		const validationPending = computed(() => state.checkQR === true)
		// QR 검증 완료
		const validationSuccess = computed(() => state.isValid === true)
		// QR 코드 해독
		async function onDecode(result) {
			state.firstLoading = true
			state.result = result
			let currentCamera = state.camera
			turnCameraOff()
			// pretend it's taking really long
			await timeout(1500)
			state.checkQR = true
			generateEntry(result, currentCamera)
		}
		// 인증 사운드
		const play = (sound) => {
			if (sound) {
				var audio = new Audio(sound)
				audio.play()
			}
		}
		// 검증 상태 초기화
		const resetValidationState = () => {
			state.isValid = undefined
		}
		// 카메라 켜기
		const turnCameraOn = (camera) => {
			state.camera = camera
		}
		// 카메라 끄기
		const turnCameraOff = () => {
			state.camera = "off"
		}
		// 뒤로가기 버튼 클릭시 카메라 끄고 이동
		const goBack = () => {
			router.go(-1)
		}
		// 카메라 전환
		function switchCamera() {
			switch (state.camera) {
				// 전면 카메라일 때
				case "front":
					state.camera = "rear"
					break
				// 후면 카메라 일때
				case "rear":
					state.camera = "front"
					break
			}
		}
		// 딜레이
		const timeout = (ms) => {
			return new Promise((resolve) => {
				window.setTimeout(resolve, ms)
			})
		}
		// 카메라 초기 세팅
		const onInit = async (promise) => {
			state.loading = true
			try {
				await promise
			} catch (error) {
				if (error.name === "NotAllowedError") {
					state.error = "ERROR: you need to grant camera access permisson"
				} else if (error.name === "NotFoundError") {
					state.error = "ERROR: no camera on this device"
				} else if (error.name === "NotSupportedError") {
					state.error = "ERROR: secure context required (HTTPS, localhost)"
				} else if (error.name === "NotReadableError") {
					state.error = "ERROR: is the camera already in use?"
				} else if (error.name === "OverconstrainedError") {
					state.error = "ERROR: installed cameras are not suitable"
				} else if (error.name === "StreamApiNotSupportedError") {
					state.error = "ERROR: Stream API is not supported in this browser"
				}
			} finally {
				state.loading = false
				resetValidationState()
			}
		}
		// 출입 여부 등록
		const generateEntry = async (result, currentCamera) => {
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
				const response = await axios.post(
					"/api/generateentry/",
					{},
					{
						params: {
							key: localStorage.getItem("key"),
							simple_password: localStorage.getItem("simplePassword"),
							admin_did: localStorage.getItem("did"),
							std_did: studentDid,
							year: year,
							building_num: building,
							month: month,
							day: day,
							time_stamp: timestamp,
							hashed_data: hash,
						},
					}
				)
				if (response.status === 201) {
					state.isValid = true
					turnCameraOn(currentCamera)
					showSuccess("인증 완료", "학생증이 인증되었습니다.")
				}
			} catch (error) {
				if (error.response) {
					if (error.response.data.msg === "check_DID error") {
						showError("본인 인증 오류", "죄송합니다. \n본인 인증에 오류가 있습니다.")
					} else if (error.response.data.msg === "timestamp error") {
						showError("유효 시간 오류", "죄송합니다. \n유효 시간이 지났습니다. 다시 찍어주세요.")
					} else {
						showError("인증 오류", "죄송합니다. \n본인 인증에 오류가 있습니다.")
					}
					turnCameraOn(currentCamera)
				}
			}
			state.checkQR = false
			play("https://soundbible.com/mp3/Checkout Scanner Beep-SoundBible.com-593325210.mp3")
		}
		// QR 경고 모달 토글 함수
		const openQRWarningModal = () => {
			state.displayQRWarningModal = true
		}
		// 성공 토스트 메시지
		const showSuccess = (summaryText, detailText) => {
			toast.add({ severity: "success", summary: summaryText, detail: detailText, life: 2000 })
		}
		// 에러 토스트 메시지
		const showError = (summaryText, detailText) => {
			toast.add({ severity: "error", summary: summaryText, detail: detailText, life: 2000 })
		}
		return {
			// ...toRefs(state),
			state,
			validationPending,
			validationSuccess,
			onDecode,
			play,
			resetValidationState,
			turnCameraOn,
			turnCameraOff,
			goBack,
			switchCamera,
			timeout,
			onInit,
			generateEntry,
			openQRWarningModal,
			showSuccess,
			showError,
		}
	},
})
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
.qr__warning-modal .p-dialog-content {
	border-radius: 20px 20px 0 0;
	padding: 10px;
}
.qr__warning-modal .p-dialog-footer {
	border-top: 1px solid #e2e2e2;
	padding-top: 1rem;
	border-radius: 0 0 20px 20px;
	text-align: center;
}
</style>
