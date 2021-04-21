<template>
	<div class="login-box">
		<div class="p-fluid">
			<div class="sign-in">
				<div class="p-field">
					<label for="studentId" ref="usernameInput">학번</label>
					<InputText :class="{ 'p-invalid': failId }" autocomplete="off" id="studentId" placeholder="학번" type="text" :maxlength="9" v-model="studentId" />
					<small v-if="failId" class="p-error" id="studentid-help">{{ failIdText }}</small>
					<small v-else id="studentid-help">학번을 입력해주세요.</small>
				</div>
				<div class="p-field">
					<label for="id" ref="majorInput">학과</label>
					<Dropdown v-model="selectedGroupedMajor" :options="groupedMajor" optionLabel="label" placeholder="학과를 선택해주세요." optionGroupLabel="label" optionGroupChildren="items" :class="{ 'major-invalid': failMajor }">
						<template #optiongroup="slotProps">
							<div class="p-d-flex p-ai-center country-item">
								<div>{{ slotProps.option.label }}</div>
							</div>
						</template>
					</Dropdown>
					<small v-if="failMajor" class="p-error" id="studentid-help">{{ failMajorText }}</small>

					<small v-else id="usermajor-help">학과를 선택해주세요.</small>
				</div>

				<Button label="회원 가입" icon="pi pi-check" iconPos="right" @click="checkValidate" />
			</div>
			<Dialog class="password-modal p-dialog-maximized" header="" :showHeader="false" v-model:visible="displayPasswordModal" :style="{ width: '100vw', height: '100vh' }" :modal="true">
				<SimplePassword :title="'간편 비밀번호 설정'" :isSetting="true" @setCorrectPassword="closePasswordModal" />
			</Dialog>
		</div>
	</div>
</template>
<script>
import SimplePassword from "../../components/SimplePasswd/SimplePasswd"

export default {
	name: "LoginForm",
	components: { SimplePassword },
	props: { name: String, imgUrl: String, email: String },
	data() {
		return {
			studentId: "",
			failId: false,
			failIdText: "",
			failMajor: false,
			failMajorText: "",
			selectedGroupedMajor: null,
			displayPasswordModal: false,

			//임시 학과 데이터
			groupedMajor: [
				{
					label: "소프트웨어경영대학",
					code: "SE",
					items: [
						{ label: "국제산업정보학과", value: "국제산업정보학과" },
						{ label: "경영학과", value: "경영학과" },
						{ label: "컴퓨터공학부", value: "컴퓨터공학부" },
						{ label: "융합보안학과", value: "융합보안학과" },
						{ label: "산업경영공학과", value: "산업경영공학과" },
					],
				},
			],
		}
	},
	mounted() {},
	methods: {
		//유효성 검사
		checkValidate() {
			let regexp = /^[0-9]*$/
			if (!regexp.test(this.studentId) || this.studentId.length !== 9) {
				this.failId = true
				this.failIdText = "9자리 숫자만 입력하세요."
				this.$refs.usernameInput.focus()
				return
			} else if (this.studentId === "") {
				this.failId = true
				this.failIdText = "필수 입력 사항입니다."
				this.$refs.usernameInput.focus()
				return
			} else if (this.selectedGroupedMajor === null) {
				this.failId = false
				this.failMajor = true
				this.$refs.majorInput.focus()
				this.failMajorText = "필수 입력 사항입니다."
				return
			}
			console.log(this.selectedGroupedMajor.label)
			this.failMajor = false
			//회원가입 완료시 post 해서 그정보를
			this.signUp()
			this.openPasswordModal()
		},
		signUp() {
			this.isFirstMember = false
			console.log(this.email)
			console.log(this.name)
			console.log(this.imgUrl)
			console.log(this.studentId)
			console.log(this.selectedGroupedMajor)
			//구글 이메일, 이름, 이미지 url로 API POST
			// post 완료시 키값 저장
			// localStorage.setItem('key', data.key)
		},
		openPasswordModal() {
			this.displayPasswordModal = true
		},
		closePasswordModal() {
			this.displayPasswordModal = false
			this.$router.push("/")
		},
	},
}
</script>
<style scoped>
@import "./login-form.css";
</style>
