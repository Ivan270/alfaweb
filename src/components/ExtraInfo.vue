<template>
	<v-container>
		<v-hover v-slot="{ hover }">
			<v-alert
				dense
				border="left"
				color="blue-grey lighten-4"
				:elevation="hover ? 24 : 2"
			>
				<v-icon color="pink darken-1">mdi-school-outline</v-icon>
				Cantidad total de Cursos:
				<strong>{{ cursosAmount }}</strong>
			</v-alert>
		</v-hover>
		<v-hover v-slot="{ hover }">
			<v-alert
				dense
				border="left"
				:elevation="hover ? 24 : 2"
				color="blue-grey lighten-4"
			>
				<v-icon color="pink darken-1">mdi-pencil-plus-outline</v-icon>
				Cursos disponibles:
				<strong>{{ cuposDisponibles }}</strong>
			</v-alert>
		</v-hover>
		<v-hover v-slot="{ hover }">
			<v-alert
				dense
				border="left"
				:elevation="hover ? 24 : 2"
				color="blue-grey lighten-4"
			>
				<v-icon color="pink darken-1">mdi-pencil-lock-outline</v-icon>
				Cursos terminados:
				<strong>{{ cursosTerminados }}</strong>
			</v-alert>
		</v-hover>
		<v-hover v-slot="{ hover }">
			<v-alert
				dense
				border="left"
				:elevation="hover ? 24 : 2"
				color="blue-grey lighten-4"
			>
				<v-icon color="pink darken-1">mdi-account-school-outline</v-icon>
				Cantidad de alumnos permitidos:
				<strong>{{ alumnosPermitidos }}</strong>
			</v-alert>
		</v-hover>
		<v-hover v-slot="{ hover }">
			<v-alert
				dense
				border="left"
				:elevation="hover ? 24 : 2"
				color="blue-grey lighten-4"
			>
				<v-icon color="pink darken-1">mdi-cast-education</v-icon>
				Cantidad de alumnos inscritos:
				<strong>{{ alumnosInscritos }}</strong>
			</v-alert>
		</v-hover>
		<v-hover v-slot="{ hover }">
			<v-alert
				dense
				border="left"
				:elevation="hover ? 24 : 2"
				color="blue-grey lighten-4"
			>
				<v-icon color="pink darken-1">mdi-chair-school</v-icon>
				Cantidad total de Cursos:
				<strong>{{ cursosActivos }}</strong>
			</v-alert>
		</v-hover>
	</v-container>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		name: 'extra-info',
		// props: {},
		data: function () {
			return {};
		},
		computed: {
			...mapGetters([
				'cursosAmount',
				'alumnosPermitidos',
				'alumnosInscritos',
				'cuposDisponibles',
				'cursosTerminados',
				'cursosActivos',
			]),
		},
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
