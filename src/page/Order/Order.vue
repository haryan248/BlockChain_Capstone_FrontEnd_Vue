<template>
	<div>
		<Header :title="'주문'" @confirmSetting="confirmSetting" />
		<div class="container bg-gray" :class="{ 'bg-dark': darkModeState }">
			<div>
				<div class="order-content">
					<HeaderSection :title="'주문서'" :subtitle="'음식을 주문해보세요.'" :darkModeState="darkModeState" />
					<div class="menu__tab" :class="{ dark__mode: darkModeState }">
						<!-- select university cafeteria -->
						<div class="tab__list">
							<MultiSelect class="order__multiselect" v-model="selectedRestaurant" :options="restaurant" optionLabel="brand" placeholder="교내식당을 선택하세요." />
						</div>
						<!-- order QR code  -->
						<div class="tab__list">
							<Button label="주문서 확인" class="order__qr-button p-button-outlined p-button-secondary" @click="openOrderQRModal" />
						</div>
					</div>
					<!-- orderList -->
					<OrderList :class="{ dark__mode: darkModeState }" v-model="foods" listStyle="height:auto" dataKey="id">
						<template #header>
							식당 메뉴
						</template>
						<template #item="slotProps">
							<div class="product-item">
								<div class="image-container">
									<img class="food__image" :src="slotProps.item.image" :alt="slotProps.item.name" />
								</div>
								<div class="product-list-detail">
									<h6 class="p-mb-2">{{ slotProps.item.name }}</h6>
									<i class="pi pi-tag product-category-icon"></i>
									<span class="product-category">{{ slotProps.item.category }}</span>
								</div>
								<div class="product-list-action">
									<h6 class="p-mb-2">{{ slotProps.item.price }} KRW</h6>
									<span :class="'product-badge status-' + slotProps.item.inventoryStatus.toLowerCase()">{{ slotProps.item.inventoryStatusText }}</span>
								</div>
							</div>
						</template>
					</OrderList>
					<!-- order button -->
					<div class="order__button">
						<Button label="주문하기" icon="pi pi-check" />
					</div>
				</div>
			</div>
		</div>
		<!-- order QR Modal -->
		<Dialog class="OrderModal" :class="{ dark__mode: darkModeState }" header="Header" :showHeader="false" v-model:visible="displayOrderQRModal" :style="{ width: '80vw' }" :modal="true">
			<QRVerification @goBack="closeOrderQRModal" :did="DID" :SimplePassword="SimplePassword" />
		</Dialog>
	</div>
	<BottomNav :darkModeState="darkModeState" />
</template>
<script>
import QRVerification from "../../components/QRVerification/QRVerification"
import HeaderSection from "../../components/HeaderSection/HeaderSection"
export default {
	name: "Order",
	components: { QRVerification, HeaderSection },
	data() {
		return {
			displayOrderQRModal: false,
			selectedRestaurant: null,
			restaurant: [
				{ brand: "E-square", value: "E-square" },
				{ brand: "감성코어", value: "Emotional Core" },
			],
			darkModeState: this.$shared.checkDarkMode(),
			DID: localStorage.getItem("did"),
			SimplePassword: localStorage.getItem("simplePassword"),
			// 임시 음식 데이터
			foods: [
				{
					id: "1000",
					code: "f230fh0g3",
					name: "돈까스",
					description: "Product Description",
					image: require("../../images/Food/돈까스.jpg"),
					price: "6,000",
					category: "일식",
					quantity: 24,
					inventoryStatusText: "주문 가능",
					inventoryStatus: "INSTOCK",
					rating: 5,
				},
				{
					id: "1001",
					code: "nvklal433",
					name: "라면",
					description: "Product Description",
					image: require("../../images/Food/라면.jpg"),
					price: "4,000",
					category: "분식",
					quantity: 61,
					inventoryStatusText: "주문 가능",
					inventoryStatus: "INSTOCK",
					rating: 4,
				},
				{
					id: "1002",
					code: "zz21cz3c1",
					name: "떡볶이",
					description: "Product Description",
					image: require("../../images/Food/떡볶이.jpg"),
					price: "3,000",
					category: "분식",
					quantity: 2,
					inventoryStatusText: "재료 부족",
					inventoryStatus: "LOWSTOCK",
					rating: 3,
				},
				{
					id: "1003",
					code: "244wgerg2",
					name: "김밥",
					description: "Product Description",
					image: require("../../images/Food/김밥.jpg"),
					price: "2,000",
					category: "분식",
					quantity: 25,
					inventoryStatusText: "주문 가능",
					inventoryStatus: "INSTOCK",
					rating: 5,
				},
			],
		}
	},
	mounted() {
		this.$shared.checkGoogleLogin(this.$gAuth)
	},
	methods: {
		// 다크모드 설정
		confirmSetting() {
			this.darkModeState = this.$shared.checkDarkMode()
		},

		// 주문 qr코드 토글 함수
		openOrderQRModal() {
			this.displayOrderQRModal = true
		},
		closeOrderQRModal() {
			this.displayOrderQRModal = false
		},
	},
}
</script>
<style scoped>
@import "./order.css";
</style>

<style>
.p-dialog.p-component.OrderModal {
	overflow: hidden;
	border-radius: 20px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.05), 0 5px 20px rgba(0, 0, 0, 0.05);
}
.p-orderlist .p-orderlist-list {
	height: 60% !important;
}
/* 스크롤바 custom */
.p-orderlist-list::-webkit-scrollbar {
	width: 7px;
}
.p-orderlist-list::-webkit-scrollbar-thumb {
	background-color: #607d8b;
	border-radius: 5px;
	background-clip: padding-box;
	border: 2px solid transparent;
}
.p-orderlist-list::-webkit-scrollbar-track {
	background-color: #cbd5e0;
	border-radius: 3px;
	box-shadow: inset 0px 0px 5px white;
}
button.p-button.p-component.order__qr-button.p-button-outlined.p-button-secondary {
	background: #ffffff;
	border: 1px solid #cbd5e0;
}
.p-orderlist.p-component .p-orderlist-list .p-orderlist-item {
	border-bottom: 1px solid #cbd5e0;
}
/* 스와이퍼 css */
.swiper-pagination-bullet-active {
	background: #607d8b !important;
}
.swiper-pagination-bullet {
	width: 9px !important;
	height: 9px !important;
}
/* Galaxy Tab 1, 2, 3 */
@media screen and (min-device-width: 768px) and (max-device-height: 1280px) {
	.p-orderlist .p-orderlist-list {
		height: 70% !important;
	}
	.p-orderlist .p-orderlist-controls {
		padding: 10px !important;
	}
	.p-orderlist-controls .p-button.p-button-icon-only {
		width: 3rem;
		height: 3rem;
	}
	.p-orderlist .p-orderlist-header {
		padding: 15px;
		font-size: 1.6rem;
	}
	.p-orderlist .p-orderlist-controls .pi {
		font-size: 1.6rem;
	}
	.food__image {
		width: 40%;
	}
	.order__button .p-button-label,
	.order__button .pi {
		font-size: 1.6rem;
	}
	.p-mb-2 {
		font-size: 1.3rem;
	}
	.product-badge {
		font-size: 20px;
	}
	.product-item .product-category-icon,
	.product-item .product-category {
		font-size: 1.375rem;
	}
}
/* Galaxy S8, S8+, S9, S10, S10+ S10 lite edge */
@media screen and (min-device-width: 360px) and (max-device-height: 740px) {
	.p-orderlist .p-orderlist-list {
		height: 55% !important;
	}
	.p-orderlist .p-orderlist-controls {
		padding: 10px !important;
	}
	.p-orderlist-controls .p-button.p-button-icon-only {
		width: 2rem;
		height: 2rem;
	}
	.p-orderlist .p-orderlist-header {
		padding: 15px;
		font-size: 14px;
	}
	.p-orderlist .p-orderlist-controls .pi {
		font-size: 13px;
	}
	.food__image {
		width: 75%;
	}
}
/* iphone 6, 7, 8 */
@media screen and (min-device-width: 375px) and (max-device-height: 667px) {
	.p-orderlist .p-orderlist-list {
		height: 50% !important;
	}
	.p-orderlist .p-orderlist-controls {
		padding: 10px !important;
	}
	.p-orderlist-controls .p-button.p-button-icon-only {
		width: 1.8rem;
		height: 1.8rem;
	}
	.p-orderlist .p-orderlist-header {
		padding: 10px;
		font-size: 12px;
	}
	.p-orderlist .p-orderlist-controls .pi {
		font-size: 10px;
	}
	.food__image {
		width: 70%;
	}
}
/* Galaxy S6, S7, S7 edge */
@media screen and (min-device-width: 360px) and (max-device-height: 640px) {
	.p-orderlist .p-orderlist-list {
		height: 30% !important;
	}
	.p-orderlist .p-orderlist-controls {
		padding: 10px !important;
	}
	.p-orderlist-controls .p-button.p-button-icon-only {
		width: 1.8rem;
		height: 1.8rem;
	}
	.p-orderlist .p-orderlist-header {
		padding: 10px;
		font-size: 12px;
	}
	.p-orderlist .p-orderlist-controls .pi {
		font-size: 10px;
	}
	.food__image {
		width: 70%;
	}
}
/* 다크모드 css */
.p-orderlist.p-component.dark__mode .p-orderlist-header {
	background: #333536;
	color: #ffffff;
	border: 1px solid #333536;
}
.p-orderlist.p-component.dark__mode .p-orderlist-list {
	border: 1px solid #333536;
	background: #333536;
	color: #ffffff;
}
.p-orderlist.p-component.dark__mode .p-orderlist-list:focus {
	box-shadow: inset 0 0 0 0.15rem #607d8b;
}

.p-orderlist.p-component.dark__mode .p-orderlist-list .p-orderlist-item {
	color: #ffffff;
}
.p-orderlist.p-component.dark__mode .p-orderlist-item.p-highlight {
	background: #607d8b;
}
.menu__tab.dark__mode .order__qr-button {
	background-color: #333536;
	color: #ffffff;
	border: 1px solid #333536;
}
.menu__tab.dark__mode .order__multiselect,
.menu__tab.dark__mode .p-multiselect-header {
	background-color: #333536;
	border: 1px solid #333536;
}
.p-multiselect:not(.p-disabled):hover {
	box-shadow: none;
	border-color: none;
}
.p-orderlist .p-orderlist-list .p-orderlist-item:not(.p-highlight):hover {
	background: none;
	box-shadow: none;
}
.menu__tab.dark__mode .p-multiselect-label.p-placeholder,
.menu__tab.dark__mode .p-multiselect-label {
	color: #ffffff;
}
.menu__tab.dark__mode button.p-button.p-component.order__qr-button.p-button-outlined.p-button-secondary {
	background: #333536;
	border: 1px solid #333536;
}
.p-dialog.p-component.OrderModal.dark__mode .p-dialog-content {
	background: #333536;
}
</style>
