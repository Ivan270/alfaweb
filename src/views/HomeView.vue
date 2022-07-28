<template>
	<v-container fill-height fluid class="blue-grey darken-4">
		<h1 class="text-h3 text-md-h2 white--text vert-text">Cursos Disponibles</h1>
		<v-row justify="center">
			<v-col cols="8" md="8">
				<v-row
					justify="space-around"
					class="animate__animated animate__fadeInUp animate__faster"
				>
					<v-col cols="12" lg="4" v-for="curso in shownCards" :key="curso.name">
						<v-row justify="center">
							<v-hover v-slot="{ hover }">
								<v-card
									width="500"
									class="my-4"
									:elevation="hover ? 12 : 2"
									:class="{ 'on-hover': hover }"
								>
									<v-img height="200px" contain :src="curso.img" class="ma-2">
										<template v-slot:placeholder>
											<v-row class="ma-0" align="center" justify="center">
												<v-progress-circular
													indeterminate
													color="blue lighten-3"
												></v-progress-circular>
											</v-row>
										</template>
									</v-img>
									<v-container class="grey" style="min-height: 50vh">
										<v-card-title>{{ curso.name }}</v-card-title>
										<v-card-text>
											<div class="font-weight-bold ml-8 mb-2 text--secondary">
												Información
											</div>
											<v-timeline align-top dense>
												<v-timeline-item color="pink darken-1" small>
													<v-row class="pt-1">
														<v-col>
															<strong>Costo: {{ curso.costo }}</strong>
															<div class="text-caption">
																Duracion {{ curso.duracion }}
															</div>
														</v-col>
													</v-row>
												</v-timeline-item>
												<v-timeline-item color="indigo" small>
													<v-row class="pt-1">
														<v-col>
															<strong>Cupos: {{ curso.cupos }}</strong>
															<div class="text-caption">
																Completado: {{ curso.terminado }}
															</div>
														</v-col>
													</v-row>
												</v-timeline-item>
												<v-timeline-item color="pink darken-1" small>
													<v-row class="pt-1">
														<v-col>
															<strong>Fecha de registro</strong>
															<div class="text-caption">
																{{ curso.fecha }}
															</div>
														</v-col>
													</v-row>
												</v-timeline-item>
												<v-timeline-item color="indigo" small>
													<v-row class="pt-1">
														<v-col>
															<strong>Descripcion</strong>
															<div class="text-caption">
																{{ curso.descripcion }}
															</div>
														</v-col>
													</v-row>
												</v-timeline-item>
											</v-timeline>
										</v-card-text>
									</v-container>
								</v-card>
							</v-hover>
						</v-row>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<v-row justify="center" class="mt-0">
			<div class="text-center mt-0">
				<v-pagination
					v-model="page"
					:length="length"
					circle
					color="pink darken-1"
				></v-pagination>
			</div>
		</v-row>

		<v-overlay :value="overlay">
			<v-progress-circular indeterminate size="85"
				>Cargando</v-progress-circular
			>
		</v-overlay>
	</v-container>
</template>

<script>
	import { mapState } from 'vuex';
	import { mapActions } from 'vuex';
	export default {
		name: 'Home-view',
		data: function () {
			return {
				page: 1,
				length: 2,
				overlay: true,
			};
		},

		components: {},
		computed: {
			...mapState(['cursos']),
			shownCards() {
				const { page, length, cursos } = this;
				// console.log(cursos.length);
				const number = Math.ceil(cursos.length / length);
				return cursos.slice((page - 1) * number, page * number);
			},
		},
		methods: {
			...mapActions(['fetchCursos']),
		},
		created() {
			this.fetchCursos();
		},
		updated() {
			this.overlay = false;
		},
	};
</script>
<style scoped>
	.v-card {
		transition: transform 0.2s ease-in-out;
	}

	.v-card:not(.on-hover) {
		transform: scale(0.98);
	}
</style>
