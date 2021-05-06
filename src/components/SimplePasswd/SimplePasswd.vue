<template>
	<div class="password-container">
		<div class="password-content">
			<h1 class="password-header">{{ title }}</h1>
			<h4 class="password-help">비밀번호를 입력해 주세요.</h4>
			<div class="password-info">
				<div class="password-filter" v-for="(item, index) in simplePasswd.length" :key="index" style="display:inline-block">
					<Button v-if="index === 6" icon="pi pi-plus" class="p-button-rounded p-button-secondary p-button-text" />
					<Button v-else icon="pi pi-circle-on" class="p-button-rounded p-button-secondary p-button-text" />
				</div>
				<div class="password-filter" v-for="(item, index) in 8 - simplePasswd.length" :key="index" style="display:inline-block">
					<Button v-if="simplePasswd.length <= 6 && index === 6 - simplePasswd.length" icon="pi pi-plus" class="p-button-rounded p-button-secondary p-button-text" />
					<Button v-else icon="pi pi-circle-off" class="p-button-rounded p-button-secondary p-button-text" />
				</div>
				<div v-if="checkWrongPassword" class="password__wrong">
					비밀번호가 틀렸습니다.
					<br />
					확인 후 다시 입력해 주세요.
				</div>
				<div v-if="!isFirstSettingPassword">
					간편 비밀번호를 한 번 더 입력해 주세요.
				</div>
				<div v-if="checkSettingPassword" class="password__wrong">
					입력한 비밀번호가 동일하지 않습니다.
					<br />
					확인 후 다시 설정해 주세요.
				</div>
				<Button v-if="!isSetting" label="비밀번호를 몰라요" class="p-button-sm p-button-raised p-button-secondary" @click="findSimplePasswd" />
				<div class="password-inputter">
					<div class="password-wrapper">
						<div class="inputter__flex">
							<!-- 숫자 자판 -->
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
							<!-- 영어 자판 -->
							<div v-else>
								<button v-for="(item, index) in alphaPasswdArray" :key="index" ref="passwdButton" :class="{ 'num-button__flex--active': touchAlphaStart[index] }" class="num-button__flex spread-effect fantasy-font__2_3rem--alpha">
									<button v-if="index === 21" class="num-button__flex spread-effect fantasy-font__2_3rem--alpha">
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
		</div>
	</div>
</template>
<script>
export default {
	name: "SimplePassword",
	props: { title: String, isSetting: Boolean },
	components: {},
	data() {
		return {
			passwdArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			alphaPasswdArray: null,
			tempNum: null,
			simplePasswd: "",
			passwdMaxLength: 7,
			checkWrongPassword: false,
			tempPassword: "",
			checkSettingPassword: false,
			isFirstSettingPassword: true,
			touchstart: [],
			touchAlphaStart: [],
		}
	},
	created() {
		this.shuffle(this.passwdArray)
		this.genCharArray("a", "z")
		this.shuffle(this.alphaPasswdArray)
	},
	mounted() {
		document.addEventListener("touchstart", (event) => {
			this.touchStartListener(event)
		})
		document.addEventListener("touchend", (event) => {
			this.touchEndListener(event)
		})
	},
	unmounted() {
		document.removeEventListener("touchstart", this.touchStartListener)
		document.removeEventListener("touchend", this.touchEndListener)
	},
	methods: {
		genCharArray(charA, charZ) {
			var a = [],
				i = charA.charCodeAt(0),
				j = charZ.charCodeAt(0)
			for (; i <= j; ++i) {
				a.push(String.fromCharCode(i))
			}
			this.alphaPasswdArray = a
		},
		shuffle(array) {
			array.sort(() => Math.random() - 0.5)
		},
		touchStartListener(event) {
			if (this.simplePasswd.length <= 6) {
				this.touchstart[event.target.getAttribute("value")] = true
			} else {
				this.touchAlphaStart[event.target.getAttribute("value")] = true
			}
		},
		touchEndListener(event) {
			setTimeout(() => {
				if (this.simplePasswd.length <= 6) {
					this.touchstart[event.target.getAttribute("value")] = false
				} else {
					this.touchAlphaStart[event.target.getAttribute("value")] = false
				}
			}, 300)
		},
		checkInvisibleNum(num) {
			this.tempNum = num
		},
		setPasswd(num) {
			if (this.simplePasswd.length !== this.passwdMaxLength) {
				this.simplePasswd = this.simplePasswd + String(num)
			}
		},
		erasePasswd() {
			this.simplePasswd = this.simplePasswd.slice(0, this.simplePasswd.length === 0 ? 0 : this.simplePasswd.length - 1)
		},
		findSimplePasswd() {
			console.log(find)
		},
	},
	watch: {
		simplePasswd(data) {
			if (this.isSetting === false && data.length === this.passwdMaxLength) {
				if (data === localStorage.getItem("simplePassword")) this.$emit("correctPassword")
				else {
					this.checkWrongPassword = true
					this.simplePasswd = ""
				}
			}
			//비밀 번호 설정 관련
			else if (this.isSetting === true && data.length === this.passwdMaxLength) {
				if (this.isFirstSettingPassword) {
					this.tempPassword = this.simplePasswd
					this.simplePasswd = ""
					this.isFirstSettingPassword = false
					this.checkSettingPassword = false
				} else {
					if (this.tempPassword === this.simplePasswd) {
						localStorage.setItem("simplePassword", this.simplePasswd)
						this.$emit("setCorrectPassword")
						console.log("입력한 비밀번호가 올바릅니다.")
					} else {
						this.isFirstSettingPassword = true
						this.checkSettingPassword = true
						this.simplePasswd = ""
						console.log("입력한 비밀번호가 올바르지 않습니다.")
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
