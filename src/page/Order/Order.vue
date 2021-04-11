<template>
	<Header />
	<div class="container">
		<HeaderSection :title="'주문서'" :subtitle="'음식을 주문해보세요.'" />
		<ul class="order-list">
			<div>
				<div class="oreder-component">
					<div>
						<li class="list__item">
							<div class="order-list__item--active order-list__item">
								<div class="item__summary">
									<span class="item__tags">
										<div class="tag-style">
											<input type="checkbox" />
										</div>
									</span>
								</div>
								<div class="item__content">
									<div class="item__txt">
										<div class="item__summary">
											<span class="item__tags">
												<div class="tag-style">
													<div></div>
												</div>
											</span>
										</div>
										<h3 class="item__name">
											<button onClick="{reduceCnt}">-</button>
											<button onClick="{addCnt}">+</button>
										</h3>
										<h3 class="item__name">{food.store}</h3>
									</div>
								</div>
								<div class="item__thumb">
									<span class="item__image" />
								</div>
							</div>
						</li>
					</div>
				</div>
			</div>
		</ul>
		<div class="order-content">
			<PassButton :title="'주문하기'" :color="'#5582F8'" @click="toggleModal = !toggleModal" />
		</div>
	</div>
	<QRVerification v-if="toggleModal" />
</template>
<script>
import Header from "../../components/Header/Header"
import PassButton from "../../components/PassButton/PassButton"
import QRVerification from "../../components/QRVerification/QRVerification"
import HeaderSection from "../../components/HeaderSection/HeaderSection"
export default {
	name: "Order",
	components: { Header, PassButton, QRVerification, HeaderSection },
	data() {
		return { toggleModal: false }
	},
	methods: {},
}
</script>
<style scoped>
@import "./order.css";
</style>
