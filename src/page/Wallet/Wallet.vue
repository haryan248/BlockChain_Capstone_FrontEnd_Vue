<template>
	<div>
		<Header />
		<div class="container bg-gray">
			<div>
				<div class="wallet__content">
					<HeaderSection :title="'지갑'" :subtitle="'간편하게 지갑을 관리하세요.'" />

					<div class="card__content">
						<div class="card__menu">
							<div class="tab__list">
								<div class="item__title p-text-bold">지불 관리</div>
							</div>
							<div class="tab__list">
								<Button label="+ 카드 추가하기" class="p-button-text p-button-secondary" @click="visibleBottom = true" />
							</div>
						</div>
						<!-- 스와이퍼 영역 -->

						<div class="card__wrapper">
							<swiper :slides-per-view="1.2" :space-between="10" :centeredSlides="true" :pagination="true" :loop="true">
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
										<small id="username-help">Enter your username to reset your password.</small>
									</div>
									<div class="p-field p-col-12">
										<label for="username">카드 번호</label>
										<InputText id="username" type="username" aria-describedby="username-help" />
										<small id="username-help">Enter your username to reset your password.</small>
									</div>
									<div class="p-field p-col-12">
										<label for="username">유효 기한</label>
										<InputText id="username" type="username" aria-describedby="username-help" />
										<small id="username-help">Enter your username to reset your password.</small>
									</div>
									<div class="p-field p-col-6 p-md-6">
										<label for="city">City</label>
										<InputText id="city" type="text" />
									</div>
									<div class="p-field p-col-6 p-md-3">
										<label for="zip">Zip</label>
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
</template>
<script>
import Header from "../../components/Header/Header"
import HeaderSection from "../../components/HeaderSection/HeaderSection"

import { Swiper, SwiperSlide } from "swiper/vue"
import SwiperCore, { Pagination, Controller } from "swiper"
import "swiper/swiper-bundle.css"

SwiperCore.use(Pagination)
SwiperCore.use(Controller)
export default {
	name: "Wallet",
	components: { Header, HeaderSection, Swiper, SwiperSlide },
	computed: {
		swiper() {
			const swiper = document.querySelector(".home-carousel").swiper
			return swiper
		},
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
