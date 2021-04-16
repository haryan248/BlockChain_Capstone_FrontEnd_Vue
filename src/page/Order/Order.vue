<template>
	<div>
		<Header :title="'주문'" />
		<div class="container bg-gray">
			<div>
				<div class="order-content">
					<HeaderSection :title="'주문서'" :subtitle="'음식을 주문해보세요.'" />
					<div class="menu__tab">
						<div class="tab__list">
							<MultiSelect
								v-model="selectedRestaurant"
								:options="restaurant"
								optionLabel="brand"
								placeholder="교내식당을 선택하세요."
							/>
						</div>
						<div class="tab__list">
							<Button
								label="주문서 확인"
								class="p-button-outlined p-button-secondary"
								@click="openModal"
							/>
						</div>
					</div>
					<OrderList v-model="restaurant" listStyle="height:auto" dataKey="vin">
						<template #header>
							식당메뉴
						</template>
						<template #item="slotProps">
							<div class="p-caritem">
								<img :src="'demo/images/car/' + slotProps.item.brand + '.png'" />
								<div>
									<span class="p-caritem-vin">{{ slotProps.item.vin }}</span>
									<span>{{ slotProps.item.year }} - {{ slotProps.item.color }}</span>
								</div>
							</div>
						</template>
					</OrderList>
					<div class="order__button">
						<Button label="주문하기" icon="pi pi-check" iconPos="right" />
					</div>
				</div>
			</div>
		</div>

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
	<BottomNav />
</template>
<script>
import QRVerification from "../../components/QRVerification/QRVerification"
import HeaderSection from "../../components/HeaderSection/HeaderSection"
export default {
	name: "Order",
	components: { QRVerification, HeaderSection },
	data() {
		return {
			displayModal: false,
			selectedRestaurant: null,
			restaurant: [
				{ brand: "E-square", value: "E-square" },
				{ brand: "감성코어", value: "Emotional core" },
			],
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
@import "./order.css";
</style>
