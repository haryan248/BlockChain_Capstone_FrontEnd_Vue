<template>
	<div>
		<Header />
		<div class="container bg-gray">
			<div>
				<div class="student-content">
					<HeaderSection :title="'학생증'" :subtitle="'자신의 정보를 간편하게 관리해보세요.'" />
					<div class="student-info">
						<div v-if="!toggleModal" class="student-card">
							<div class="student-wrapper">
								<div class="box">
									<div class="student-card__item">
										<p class="item__univ">경기대학교</p>
										<div class="item__img">
											<div class="student__img" />
										</div>
										<p class="item__temp">학번 : {}</p>
										<p class="item__temp">성명 : {}</p>
										<p class="item__temp">소속 : {}</p>
									</div>
								</div>
							</div>
							<PassButton
								:title="'학생증'"
								:color="'#5582F8'"
								@click="toggleModal = !toggleModal"
							/>
						</div>
						<QRVerification v-if="toggleModal" @goBack="toggleButton" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Header from "../../components/Header/Header"
import PassButton from "../../components/PassButton/PassButton"
import QRVerification from "../../components/QRVerification/QRVerification"
import HeaderSection from "../../components/HeaderSection/HeaderSection"

export default {
	name: "StudentId",
	components: {
		PassButton,
		Header,
		QRVerification,
		HeaderSection,
	},
	data() {
		return {
			toggleModal: false,
		}
	},
	methods: {
		toggleButton() {
			this.toggleModal = !this.toggleModal
		},
	},
}
</script>
<style scoped>
@import "./student-id.css";
</style>
