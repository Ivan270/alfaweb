<template>
	<v-container
		fill-height
		class="d-flex flex-column justify-center amber"
		fluid
	>
		<div class="mb-10 text-center">
			<h1 class="text-h1 animate__animated animate__zoomInDown">
				Ruta no Encontrada
			</h1>
			<v-icon
				size="100px"
				color="white"
				class="animate__animated animate__zoomInDown animate__slow"
				>mdi-emoticon-sad-outline</v-icon
			>
		</div>

		<div>
			Volver al
			<a class="red--text" href="/">Inicio</a>
		</div>
	</v-container>
</template>

<script>
	export default {
		name: 'error-view',
		// props: {},
		data: function () {
			return {};
		},
		// computed: {},
		//methods: {}
		// watch: {},
		// components: {},
		// mixins: [],
		// filters: {},
		// -- Lifecycle Methods
		// -- End Lifecycle Methods
	};
</script>

<style scoped></style>
