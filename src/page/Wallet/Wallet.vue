<template>
	<div>
		<Header />
		<div class="container bg-gray">
			<div>
				<div class="wallet__content">
					<HeaderSection :title="'지갑'" :subtitle="'간편하게 지갑을 관리하세요.'" />

					<div class="card__content">
						<!-- 스와이퍼 영역 -->
						<div class="wallet__title">지불 관리</div>
						<button class="card__button">
							+ 카드 추가하기
						</button>
						<Drawer class="form-select" />
						<div class="card__wrapper">
							<swiper
								:slides-per-view="1.2"
								:space-between="10"
								:centeredSlides="true"
								:pagination="true"
								:loop="true"
							>
								<swiper-slide>
									<div class="credit-card__item">
										<div class="card__name">{{ "visa" }}</div>
										<div class="card__number">{{ "**** **** **** **** 3282" }}</div>
										<div class="card__holder">{{ "조규선" }}</div>
										<div class="card__expires">{{ "12/23" }}</div>
									</div>
								</swiper-slide>
								<swiper-slide>
									<div class="credit-card__item">
										<div class="card__name">{{ "visa" }}</div>
										<div class="card__number">{{ "**** **** **** **** 3282" }}</div>
										<div class="card__holder">{{ "조규선" }}</div>
										<div class="card__expires">{{ "12/23" }}</div>
									</div>
								</swiper-slide>
							</swiper>
						</div>

						<PassButton :title="'카드 삭제'" :color="'#F47B61'" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Header from "../../components/Header/Header"
import HeaderSection from "../../components/HeaderSection/HeaderSection"

import { Swiper, SwiperSlide } from "swiper/vue"
import SwiperCore, { Pagination, Controller } from "swiper"
import "swiper/swiper-bundle.css"
import Drawer from "../../components/Drawer/Drawer.vue"

SwiperCore.use(Pagination)
SwiperCore.use(Controller)
export default {
	name: "Wallet",
	components: { Header, HeaderSection, Swiper, SwiperSlide, Drawer },
	computed: {
		swiper() {
			const swiper = document.querySelector(".home-carousel").swiper
			return swiper
		},
	},
	data() {
		return { innerWidth: window.innerWidth }
	},
	methods: {},
}
</script>
<style scoped>
@import "./wallet.css";
</style>
