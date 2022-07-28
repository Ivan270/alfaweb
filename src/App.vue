<template>
	<v-app>
		<nav-bar v-if="privateRoute"></nav-bar>
		<v-main>
			<transition name="fade" mode="out-in">
				<router-view />
			</transition>
		</v-main>
	</v-app>
</template>

<script>
	import Navbar from '@/components/Navigation.vue';

	export default {
		name: 'App',

		data: () => ({
			//
		}),
		computed: {
			privateRoute() {
				if (this.$route.meta.privateRoute) return true;
				return false;
			},
		},
		components: {
			'nav-bar': Navbar,
		},
	};
</script>
<style>
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
		transform: translateX(-2em);
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.3s ease;
	}
</style>
