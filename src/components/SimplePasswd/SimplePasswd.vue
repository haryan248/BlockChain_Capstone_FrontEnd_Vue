<template>
	<div class="password-container">
		<div class="password-content" :class="{ dark__mode: darkModeState }">
			<!-- password header title -->
			<h1 class="password-header">{{ title }}</h1>
			<!-- password info text -->
			<div v-if="isResetting" class="password-help" v-html="resettingText"></div>
			<div v-else class="password-help">숫자 6자리 + 영문자 1자리</div>

			<div class="password-info">
				<!-- Password number icon -->
				<div class="password-filter" v-for="(item, index) in simplePasswd.length" :key="index" style="display:inline-block">
					<Button v-if="index === 6" icon="pi pi-plus" class="p-button-rounded p-button-secondary p-button-text border-none" />
					<Button v-else icon="pi pi-circle-on" class="p-button-rounded p-button-secondary p-button-text border-none" />
				</div>
				<div class="password-filter" v-for="(item, index) in 8 - simplePasswd.length" :key="index" style="display:inline-block">
					<Button v-if="simplePasswd.length <= 6 && index === 6 - simplePasswd.length" icon="pi pi-plus" class="p-button-rounded p-button-secondary p-button-text  border-none" />
					<Button v-else icon="pi pi-circle-off" class="p-button-rounded p-button-secondary p-button-text  border-none" />
				</div>
				<div class="password__wrong" v-html="simplePasswdText"></div>

				<!-- Password input screen -->
				<div class="password-inputter">
					<div class="password-wrapper">
						<div class="inputter__flex">
							<!-- number keypad -->
							<div v-if="simplePasswd.length !== 6">
								<button v-for="(item, index) in passwdArray" :key="index" ref="passwdButton" :class="{ 'num-button__flex--active': touchstart[index] }" class="num-button__flex spread-effect fantasy-font__2_3rem">
									<button v-if="index === 9" class="num-button__flex spread-effect fantasy-font__2_3rem">
										{{ checkInvisibleNum(item) }}
									</button>
									<div v-else @click="setPasswd(item)" :value="index">{{ item }}</div>
								</button>
								<button class="num-button__flex spread-effect fantasy-font__2_3rem">
									<div @click="setPasswd(tempNum)">{{ tempNum }}</div>
								</button>
								<button class="num-button__flex spread-effect fantasy-font__2_3rem" @click="erasePasswd">
									←
								</button>
							</div>
							<!-- alphabet keypad -->
							<div v-else>
								<button v-for="(item, index) in alphaPasswdArray" :key="index" ref="passwdButton" :class="{ 'num-button__flex--active': touchAlphaStart[index] }" class="num-button__flex spread-effect fantasy-font__2_3rem--alpha">
									<button v-if="index === 21" class="num-button__flex spread-effect 1">
										{{ checkInvisibleNum(item) }}
									</button>
									<div v-else @click="setPasswd(item)" :value="index">{{ item }}</div>
								</button>
								<button class="num-button__flex spread-effect fantasy-font__2_3rem--alpha">
									<div @click="setPasswd(tempNum)">{{ tempNum }}</div>
								</button>
								<button class="num-button__flex spread-effect fantasy-font__2_3rem--alpha" @click="erasePasswd">
									←
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- password warning text -->
			<div v-if="isSetting || isResetting" class="warning-info">
				<i class="pi pi-shield" style="fontSize: 8px"></i>
				<div class="text">
					간편비밀번호를 잊어버리면 찾을 수 없으니<br />
					주의해주시기 바랍니다.
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "SimplePassword",
	props: { title: String, isSetting: Boolean, isResetting: Boolean },
	components: {},
	data() {
		return {
			passwdArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			alphaPasswdArray: null,
			tempNum: null,
			simplePasswd: "",
			tempPassword: "",
			passwdMaxLength: 7,
			isFirstSettingPassword: true,
			correctCurrentPassword: false,
			simplePasswdText: "",
			resettingText: "현재 사용중인 비밀번호를 입력해주세요.",
			touchstart: [],
			touchAlphaStart: [],
			darkModeState: this.$shared.checkDarkMode(),
		}
	},
	created() {
		// 자판 무작위 배열
		this.shuffle(this.passwdArray)
		this.genCharArray("a", "z")
		this.shuffle(this.alphaPasswdArray)
	},
	mounted() {
		// 터치 이벤트 등록
		document.addEventListener("touchstart", (event) => {
			this.touchStartListener(event)
		})
		document.addEventListener("touchend", (event) => {
			this.touchEndListener(event)
		})
	},
	unmounted() {
		// 터치 이벤트 제거
		document.removeEventListener("touchstart", this.touchStartListener)
		document.removeEventListener("touchend", this.touchEndListener)
	},
	methods: {
		// 영어 자판 배열 생성
		genCharArray(charA, charZ) {
			var a = [],
				i = charA.charCodeAt(0),
				j = charZ.charCodeAt(0)
			for (; i <= j; ++i) {
				a.push(String.fromCharCode(i))
			}
			this.alphaPasswdArray = a
		},
		// 배열 무작위 셔플
		shuffle(array) {
			array.sort(() => Math.random() - 0.5)
		},

		// 자판 터치 이벤트
		touchStartListener(event) {
			if (this.simplePasswd.length + 1 <= 6) {
				this.touchstart[event.target.getAttribute("value")] = true
			} else {
				this.touchAlphaStart[event.target.getAttribute("value")] = true
			}
		},
		touchEndListener(event) {
			if (this.simplePasswd.length + 1 <= 6) {
				setTimeout(() => {
					this.touchstart[event.target.getAttribute("value")] = false
				}, 300)
			} else if (this.simplePasswd.length + 1 === 6) {
				this.touchstart[event.target.getAttribute("value")] = false
			} else {
				this.touchAlphaStart[event.target.getAttribute("value")] = false
			}
		},

		checkInvisibleNum(num) {
			this.tempNum = num
		},

		// 비밀번호 설정
		setPasswd(num) {
			if (this.simplePasswd.length !== this.passwdMaxLength) {
				this.simplePasswd = this.simplePasswd + String(num)
			}
		},

		// 비밀번호 지우기
		erasePasswd() {
			this.simplePasswd = this.simplePasswd.slice(0, this.simplePasswd.length === 0 ? 0 : this.simplePasswd.length - 1)
		},
	},
	watch: {
		// 입력한 비밀번호 Watch
		simplePasswd(data) {
			if (data.length >= 1) this.simplePasswdText = ""

			// 비밀번호 입력 관련
			if (this.isSetting === false && data.length === this.passwdMaxLength) {
				if (data === localStorage.getItem("simplePassword")) this.$emit("correctPassword")
				else {
					this.simplePasswdText = "비밀번호가 틀렸습니다.<br> 확인 후 다시 입력해 주세요."
					this.simplePasswd = ""
				}
			}
			// 비밀번호 재설정 관련
			else if (this.correctCurrentPassword === false && this.isResetting === true && data.length === this.passwdMaxLength) {
				if (data === localStorage.getItem("simplePassword")) {
					this.resettingText = "변경할 비밀번호를 입력해주세요."
					this.simplePasswd = ""
					this.simplePasswdText = ""
					this.correctCurrentPassword = true
				} else {
					this.simplePasswdText = "비밀번호가 틀렸습니다.<br> 확인 후 다시 입력해 주세요."
					this.simplePasswd = ""
				}
			}
			// 비밀 번호 설정 관련
			else if ((this.isSetting === true && data.length === this.passwdMaxLength) || (this.correctCurrentPassword === true && data.length === this.passwdMaxLength)) {
				// 처음 비밀번호 입력
				if (this.isFirstSettingPassword) {
					this.tempPassword = this.simplePasswd
					this.simplePasswd = ""
					this.isFirstSettingPassword = false
					this.simplePasswdText = "간편 비밀번호를 한 번 더 입력해 주세요."
				} else {
					// 두번째 비밀번호 입력
					if (this.tempPassword === this.simplePasswd) {
						localStorage.setItem("simplePassword", this.simplePasswd)
						this.$emit("setCorrectPassword")
					} else {
						this.isFirstSettingPassword = true
						this.simplePasswdText = "입력한 비밀번호가 동일하지 않습니다.<br>확인 후 다시 설정해 주세요."
						this.simplePasswd = ""
					}
				}
			}
		},
	},
}
</script>
<style scoped>
@import "./simple-passwd.css";
</style>
<style>
/* 다크모드 css*/
.p-dialog.p-component.password-modal.p-dialog-maximized.dark__mode .p-dialog-header,
.p-dialog.p-component.password-modal.p-dialog-maximized.dark__mode .p-dialog-content {
	background-color: #333536;
}
</style>
