<template>
	<div>
		<Header />
		<div class="container bg-gray">
			<div>
				<div class="student-content">
					<HeaderSection :title="'학생증'" :subtitle="'자신의 정보를 간편하게 관리해보세요.'" />
					<div class="student-info">
						<div class="student-card">
							<div class="student-wrapper">
								<div class="box">
									<div class="student-card__item">
										<p class="item__univ">경기대학교</p>
										<div class="item__img">
											<div class="student__img" />
										</div>
										<p class="item__temp">학번 : </p>
										<p class="item__temp">성명 : </p>
										<p class="item__temp">소속 : </p>
									</div>
								</div>
							</div>
							<div class="student__button">
								<Button
									label="학생증"
									icon="pi pi-id-card"
									iconPos="left"
									@goBack="openModal"
									@click="openModal"
								/>
							</div>
						</div>
						<!-- <Button label="Show" icon="pi pi-external-link" @click="openModal" /> -->
						<Dialog
							header="Header"
							:showHeader="false"
							v-model:visible="displayModal"
							:style="{ width: '80vw' }"
							:modal="true"
						>
							<!-- <template #content> -->
							<QRVerification @goBack="closeModal" />
							<!-- <Button label="No" icon="pi pi-times" @click="closeResponsive" class="p-button-text" />
								<Button label="Yes" icon="pi pi-check" @click="closeResponsive" autofocus /> -->
							<!-- </template> -->
						</Dialog>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Header from "../../components/Header/Header"
// import PassButton from "../../components/PassButton/PassButton"
import QRVerification from "../../components/QRVerification/QRVerification"
import HeaderSection from "../../components/HeaderSection/HeaderSection"

export default {
	name: "StudentId",
	components: {
		Header,
		QRVerification,
		HeaderSection,
	},
	data() {
		return {
			displayModal: false,
		}
	},
	methods: {
		openModal() {
			this.displayModal = true
		},
		closeModal() {
			this.displayModal = false
		},
	},
}
</script>
<style scoped>
@import "./student-id.css";
</style>
<style>
.p-dialog {
	border-radius: 20px;
}
.p-dialog .p-dialog-content {
	border-radius: 20px;
}
</style>
