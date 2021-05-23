<template>
	<div>
		<Header :title="'주문'" @confirmSetting="confirmSetting" />
		<div class="container bg-gray" :class="{ 'bg-dark': darkModeState }">
			<div>
				<div class="order-content">
					<HeaderSection :title="'주문서'" :subtitle="'음식을 주문해보세요.'" :darkModeState="darkModeState" />
					<div class="menu__tab">
						<div class="tab__list">
							<MultiSelect v-model="selectedRestaurant" :options="restaurant" optionLabel="brand" placeholder="교내식당을 선택하세요." />
						</div>
						<div class="tab__list">
							<Button label="주문서 확인" class="p-button-outlined p-button-secondary" @click="openModal" />
						</div>
					</div>
					<OrderList v-model="products" listStyle="height:auto" dataKey="id">
						<template #header>
							List of Products
						</template>
						<template #item="slotProps">
							<div class="product-item">
								<div class="image-container">
									<img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.item.name" />
								</div>
								<div class="product-list-detail">
									<h6 class="p-mb-2">{{ slotProps.item.name }}</h6>
									<i class="pi pi-tag product-category-icon"></i>
									<span class="product-category">{{ slotProps.item.category }}</span>
								</div>
								<div class="product-list-action">
									<h6 class="p-mb-2">${{ slotProps.item.price }}</h6>
									<span :class="'product-badge status-' + slotProps.item.inventoryStatus.toLowerCase()">{{ slotProps.item.inventoryStatus }}</span>
								</div>
							</div>
						</template>
					</OrderList>
					<div class="order__button">
						<Button label="주문하기" icon="pi pi-check" />
					</div>
				</div>
			</div>
		</div>

		<Dialog class="OrderModal" header="Header" :showHeader="false" v-model:visible="displayModal" :style="{ width: '80vw' }" :modal="true">
			<!-- <template #content> -->
			<QRVerification @goBack="closeModal" :did="DID" :SimplePassword="SimplePassword" />
			<!-- <Button label="No" icon="pi pi-times" @click="closeResponsive" class="p-button-text" />
								<Button label="Yes" icon="pi pi-check" @click="closeResponsive" autofocus /> -->
			<!-- </template> -->
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
			displayModal: false,
			selectedRestaurant: null,
			restaurant: [
				{ brand: "E-square", value: "E-square" },
				{ brand: "감성코어", value: "Emotional core" },
			],
			darkModeState: this.$shared.checkDarkMode(),
			DID: localStorage.getItem("did"),
			SimplePassword: localStorage.getItem("simplePassword"),
			products: [
				{ id: "1000", code: "f230fh0g3", name: "Bamboo Watch", description: "Product Description", image: "bamboo-watch.jpg", price: 65, category: "Accessories", quantity: 24, inventoryStatus: "INSTOCK", rating: 5 },
				{ id: "1001", code: "nvklal433", name: "Black Watch", description: "Product Description", image: "black-watch.jpg", price: 72, category: "Accessories", quantity: 61, inventoryStatus: "INSTOCK", rating: 4 },
				{ id: "1002", code: "zz21cz3c1", name: "Blue Band", description: "Product Description", image: "blue-band.jpg", price: 79, category: "Fitness", quantity: 2, inventoryStatus: "LOWSTOCK", rating: 3 },
				{ id: "1003", code: "244wgerg2", name: "Blue T-Shirt", description: "Product Description", image: "blue-t-shirt.jpg", price: 29, category: "Clothing", quantity: 25, inventoryStatus: "INSTOCK", rating: 5 },
				{ id: "1004", code: "h456wer53", name: "Bracelet", description: "Product Description", image: "bracelet.jpg", price: 15, category: "Accessories", quantity: 73, inventoryStatus: "INSTOCK", rating: 4 },
				{ id: "1005", code: "av2231fwg", name: "Brown Purse", description: "Product Description", image: "brown-purse.jpg", price: 120, category: "Accessories", quantity: 0, inventoryStatus: "OUTOFSTOCK", rating: 4 },
				{ id: "1006", code: "bib36pfvm", name: "Chakra Bracelet", description: "Product Description", image: "chakra-bracelet.jpg", price: 32, category: "Accessories", quantity: 5, inventoryStatus: "LOWSTOCK", rating: 3 },
				{ id: "1007", code: "mbvjkgip5", name: "Galaxy Earrings", description: "Product Description", image: "galaxy-earrings.jpg", price: 34, category: "Accessories", quantity: 23, inventoryStatus: "INSTOCK", rating: 5 },
				{ id: "1008", code: "vbb124btr", name: "Game Controller", description: "Product Description", image: "game-controller.jpg", price: 99, category: "Electronics", quantity: 2, inventoryStatus: "LOWSTOCK", rating: 4 },
				{ id: "1009", code: "cm230f032", name: "Gaming Set", description: "Product Description", image: "gaming-set.jpg", price: 299, category: "Electronics", quantity: 63, inventoryStatus: "INSTOCK", rating: 3 },
			],
		}
	},
	mounted() {
		this.$shared.checkGoogleLogin(this.$gAuth)
	},
	methods: {
		confirmSetting() {
			this.darkModeState = this.$shared.checkDarkMode()
		},
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

<style>
.p-dialog.p-component.OrderModal {
	overflow: hidden;
	border-radius: 20px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.05), 0 5px 20px rgba(0, 0, 0, 0.05);
}
.p-orderlist .p-orderlist-list {
	height: 60%;
}
</style>
