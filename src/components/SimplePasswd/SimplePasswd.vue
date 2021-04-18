<template>
	<div class="password-container">
		<div class="password-content">
			<h1 class="password-header">간편 비밀번호</h1>

			<div class="password-info">
				<div
					class="password-filter"
					v-for="(item, index) in simplePasswd.length"
					:key="index"
					style="display:inline-block"
				>
					<Button
						icon="pi pi-circle-on"
						class="p-button-rounded p-button-secondary p-button-text"
					/>
				</div>
				<div
					class="password-filter"
					v-for="(item, index) in 6 - simplePasswd.length"
					:key="index"
					style="display:inline-block"
				>
					<Button
						icon="pi pi-circle-off"
						class="p-button-rounded p-button-secondary p-button-text"
					/>
				</div>
				<div v-show="checkWrongPassword" class="password__wrong">
					비밀번호가 틀렸습니다.
					<br />
					확인 후 다시 입력해주세요.
				</div>

				<div class="password-inputter">
					<div class="password-wrapper">
						<div class="inputter__flex">
							<button
								v-for="(item, index) in passwdArray"
								:key="index"
								class="num-button__flex spread-effect fantasy-font__2_3rem"
							>
								<button
									v-if="index === 9"
									class="num-button__flex spread-effect fantasy-font__2_3rem"
								>
									{{ checkInvisibleNum(item) }}
								</button>
								<div v-else @click="setPasswd(item)">{{ item }}</div>
							</button>
							<button class="num-button__flex spread-effect fantasy-font__2_3rem">
								{{ tempNum }}
							</button>
							<button
								class="num-button__flex spread-effect fantasy-font__2_3rem"
								@click="erasePasswd"
							>
								←
							</button>
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
	props: {},
	components: {},
	data() {
		return {
			passwdArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			tempNum: null,
			simplePasswd: "",
			passwdMaxLength: 6,
			checkWrongPassword: false,
		}
	},
	created() {
		this.shuffle(this.passwdArray)
	},
	watch: {
		simplePasswd(data) {
			if (data.length === this.passwdMaxLength) {
				if (data === "111111") this.$emit("correctPassword")
				else {
					this.checkWrongPassword = true
					this.simplePasswd = ""
				}
			}
		},
	},
	methods: {
		shuffle(array) {
			array.sort(() => Math.random() - 0.5)
		},
		checkInvisibleNum(num) {
			this.tempNum = num
		},
		setPasswd(num) {
			if (this.simplePasswd.length !== this.passwdMaxLength) {
				this.simplePasswd = this.simplePasswd + String(num)
				console.log(this.simplePasswd)
			}
		},
		erasePasswd() {
			this.simplePasswd = this.simplePasswd.slice(
				0,
				this.simplePasswd.length === 0 ? 0 : this.simplePasswd.length - 1
			)
		},
	},
}
</script>
<style scoped>
@import "./simple-passwd.css";
</style>
