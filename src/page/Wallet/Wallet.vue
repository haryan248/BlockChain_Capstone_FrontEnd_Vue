<template>
	<div>
		<Header :title="'지갑'" />
		<div class="container bg-gray" :class="{ 'bg-dark': $shared.checkDarkMode() }">
			<div>
				<div class="wallet__content">
					<HeaderSection :title="'결제'" :subtitle="'간편하게 지갑을 관리하세요.'" />

					<div class="card__content">
						<div class="card__menu" :class="{ dark__mode: $shared.checkDarkMode() }">
							<div class="tab__list">
								<div class="item__title p-text-bold">지불 관리</div>
							</div>
							<div class="tab__list">
								<Button label="+ 카드 추가하기" :class="{ dark__mode: $shared.checkDarkMode() }" class="p-button-text p-button-secondary" @click="visibleBottom = true" />
							</div>
						</div>
						<!-- 스와이퍼 영역 -->

						<div class="card__wrapper">
							<swiper :slides-per-view="1.3" :space-between="10" :centeredSlides="true" :pagination="true" :loop="true">
								<swiper-slide>
									<div class="credit-card__item">
										<div class="card__name">{{ "visa" }}</div>
										<div class="card__number">{{ "**** **** **** **** 3282" }}</div>
										<div class="card__holder">{{ "하현준" }}</div>
										<div class="card__expires">{{ "12/23" }}</div>
									</div>
								</swiper-slide>
								<swiper-slide>
									<div class="credit-card__item">
										<div class="card__name">{{ "visa" }}</div>
										<div class="card__number">{{ "**** **** **** **** 3282" }}</div>
										<div class="card__holder">{{ "하현준" }}</div>
										<div class="card__expires">{{ "12/23" }}</div>
									</div>
								</swiper-slide>
							</swiper>
						</div>
						<div class="card-delete__button">
							<Button label="카드 삭제" class="p-button-danger" icon="pi pi-times" iconPos="right" />
						</div>
						<Sidebar v-model:visible="visibleBottom" :baseZIndex="1000" position="bottom" style="height:30rem">
							<div class="card">
								<h3>카드 추가하기</h3>
								<div class="p-fluid p-formgrid p-grid">
									<div class="p-field p-col-12 p-md-6">
										<label for="username">이름</label>
										<InputText id="username" type="username" aria-describedby="username-help" />
										<small id="username-help">이름을 입력해주세요.</small>
									</div>
									<div class="p-field p-col-12">
										<label for="username">카드 번호</label>
										<InputText id="username" type="username" aria-describedby="username-help" />
										<small id="username-help">카드번호를 입력해주세요.</small>
									</div>
									<div class="p-field p-col-6 p-md-6">
										<label for="city">유효 기한</label>
										<InputText id="city" type="text" />
									</div>
									<div class="p-field p-col-6 p-md-3">
										<label for="zip">CVV</label>
										<InputText id="zip" type="text" />
									</div>
									<div class="p-field p-col-12">
										<Button label="카드 추가하기" class="p-button-success" icon="pi pi-check" iconPos="right" />
									</div>
								</div>
							</div>
						</Sidebar>
					</div>
				</div>
			</div>
		</div>
	</div>
	<BottomNav />
</template>
<script>
import HeaderSection from "../../components/HeaderSection/HeaderSection"

import { Swiper, SwiperSlide } from "swiper/vue"
import SwiperCore, { Pagination, Controller } from "swiper"
import "swiper/swiper-bundle.css"

SwiperCore.use(Pagination)
SwiperCore.use(Controller)
export default {
	name: "Wallet",
	components: { HeaderSection, Swiper, SwiperSlide },
	computed: {
		swiper() {
			const swiper = document.querySelector(".home-carousel").swiper
			return swiper
		},
	},
	mounted() {
		this.$shared.checkGoogleLogin(this.$gAuth)
	},
	data() {
		return { innerWidth: window.innerWidth, visibleBottom: false }
	},
	methods: {},
}
</script>
<style scoped>
@import "./wallet.css";
</style>
<style>
button.p-button.p-component.dark__mode.p-button-text.p-button-secondary {
	color: #fff;
}
</style>
