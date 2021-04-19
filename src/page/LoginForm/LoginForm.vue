<template>
	<div>
		<div v-if="isFirstMember === null" class="sign-in">
			<div class="p-field">
				<label for="studentId" ref="usernameInput">학번</label>
				<InputText :class="{ 'p-invalid': failId }" autocomplete="off" id="studentId" placeholder="학번" type="text" :maxlength="9" v-model="studentId" />
				<small v-if="failId" class="p-error" id="studentid-help">{{ failIdText }}</small>
				<small v-else id="studentid-help">학번을 입력해주세요.</small>
			</div>
			<div class="p-field">
				<label for="id" ref="majorInput">학과</label>
				<Dropdown
					v-model="selectedGroupedMajor"
					:options="groupedMajor"
					optionLabel="label"
					placeholder="학과를 선택해주세요."
					optionGroupLabel="label"
					optionGroupChildren="items"
					:class="{ 'major-invalid': failMajor }"
				>
					<template #optiongroup="slotProps">
						<div class="p-d-flex p-ai-center country-item">
							<!-- <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" width="18" /> -->
							<div>{{ slotProps.option.label }}</div>
						</div>
					</template>
				</Dropdown>
				<small v-if="failMajor" class="p-error" id="studentid-help">{{ failMajorText }}</small>

				<small v-else id="usermajor-help">학과를 선택해주세요.</small>
			</div>

			<Button label="회원 가입" icon="pi pi-check" iconPos="right" @click="checkValidate" />
		</div>
	</div>
</template>
<script>
export default {
	name: "LoginForm",
	components: {},
	data() {
		return {}
	},
	methods: {},
}
</script>
<style scoped>
@import "./login-form.css";
</style>
