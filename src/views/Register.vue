<template>
	<v-container fill-height fluid class="blue-grey darken-4">
		<v-row justify="center">
			<v-col cols="12" offset-md="2"
				><h1 class="text-h1 white--text">Regístrese</h1></v-col
			>
			<v-col cols="12" md="5">
				<register-form></register-form>
			</v-col>
			<v-col
				cols="12"
				md="5"
				class="my-auto"
				offet="0"
				offset-sm="4"
				offset-md="0"
				offset-lg="0"
				align-self="end"
			>
				<v-img
					class="animate__animated animate__fadeInRightBig"
					src="@/assets/training.png"
					width="500"
				></v-img>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import RegisterForm from '@/components/RegisterForm.vue';

	export default {
		name: 'register-view',
		// props: {},
		data: function () {
			return {};
		},
		// computed: {},
		//methods: {}
		// watch: {},
		components: {
			'register-form': RegisterForm,
		},
		// mixins: [],
		// filters: {},
		// -- Lifecycle Methods
		// -- End Lifecycle Methods
	};
</script>

<style scoped></style>
