<template>
	<div>
		<Header :title="'설정'" />
		<div class="container bg-gray">
			<div>
				<div class="setting__content">
					<div class="home-my">
						<h1 class="home__title">보안</h1>
						<ul class="recommend__list">
							<!-- 선택한 추천 학습 별 리스트 페이지로 이동 -->
							<li class="list__item">
								<div class="recommend__item">
									<span class="recommend__image" :class="'recommend__image--'"></span>
									<div class="recommend__content">
										<h2 class="recommend__title">
											간편비밀번호 재설정
										</h2>
										<p class="recommend__description"></p>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<BottomNav />
	</div>
</template>
<script>
export default {
	name: "Setting",
	components: {},
	data() {
		return {}
	},
	mounted() {
		this.$shared.checkGoogleLogin(this.$gAuth)
	},
	methods: {},
}
</script>
<style scoped>
@import "./setting.css";
</style>
