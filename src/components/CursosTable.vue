<template>
	<v-data-table
		:headers="headers"
		:items="cursos"
		sort-by="calories"
		class="elevation-1"
		:loading="loading"
		loading-text="Cargando... Por favor espere"
	>
		<template v-slot:[`item.terminado`]="{ item }">
			<v-chip
				v-if="item.terminado === true"
				:color="getColor(item.terminado)"
				dark
				class="px-6"
			>
				Si
			</v-chip>
			<v-chip v-else :color="getColor(item.terminado)" class="px-5" dark>
				No
			</v-chip>
		</template>
		<template v-slot:[`item.costo`]="{ item }">${{ item.costo }} </template>

		<template v-slot:top>
			<v-toolbar flat>
				<v-toolbar-title>Cursos</v-toolbar-title>
				<v-divider class="mx-4" inset vertical></v-divider>
				<v-spacer></v-spacer>
				<v-dialog v-model="dialog" max-width="500px" dark>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							color="pink darken-1"
							dark
							class="mb-2"
							v-bind="attrs"
							v-on="on"
							icon
							large
						>
							<v-icon>mdi-plus-circle</v-icon>
						</v-btn>
					</template>

					<v-card>
						<v-card-title>
							<span class="text-h5">Crear Curso</span>
						</v-card-title>

						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12">
										<v-text-field
											v-model="newItem.name"
											label="Nombre"
											required
											:error-messages="nameErrors"
											@input="$v.newItem.name.$touch()"
											@blur="$v.newItem.name.$touch()"
										></v-text-field>
									</v-col>
									<v-col cols="12">
										<v-text-field
											v-model="newItem.img"
											label="URL de la imagen del curso"
											required
											:error-messages="imgErrors"
											@input="$v.newItem.img.$touch()"
											@blur="$v.newItem.img.$touch()"
										></v-text-field>
									</v-col>
									<v-col cols="6">
										<v-text-field
											v-model="newItem.cupos"
											label="Cupos"
											type="number"
											required
											:error-messages="cuposErrors"
											@input="$v.newItem.cupos.$touch()"
											@blur="$v.newItem.cupos.$touch()"
										></v-text-field>
									</v-col>
									<v-col cols="6">
										<v-text-field
											v-model="newItem.inscritos"
											label="Inscritos"
											type="number"
											required
											:error-messages="inscritosErrors"
											@input="$v.newItem.inscritos.$touch()"
											@blur="$v.newItem.inscritos.$touch()"
										></v-text-field>
									</v-col>
									<v-col cols="6">
										<v-text-field
											v-model="newItem.duracion"
											label="Duración del curso"
											required
											:error-messages="duracionErrors"
											@input="$v.newItem.duracion.$touch()"
											@blur="$v.newItem.duracion.$touch()"
										></v-text-field>
									</v-col>
									<v-col cols="6">
										<v-text-field
											v-model="newItem.costo"
											label="Precio del curso"
											type="number"
											required
											:error-messages="costoErrors"
											@input="$v.newItem.costo.$touch()"
											@blur="$v.newItem.costo.$touch()"
										></v-text-field>
									</v-col>
									<v-col cols="6">
										<v-text-field
											v-model="newItem.codigo"
											label="Codigo del curso"
											required
											:error-messages="codigoErrors"
											@input="$v.newItem.codigo.$touch()"
											@blur="$v.newItem.codigo.$touch()"
										></v-text-field>
									</v-col>
									<v-col cols="12">
										<v-textarea
											v-model="newItem.descripcion"
											label="Descripción del curso"
											outlined
										></v-textarea>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="error" text @click="close"> Cancelar </v-btn>
							<v-btn
								color="amber "
								text
								:loading="loadingCreate"
								@click="createCurso()"
							>
								Crear Curso
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<v-dialog v-model="dialogDelete" max-width="600px">
					<v-card color="blue-grey darken-2" dark>
						<v-system-bar color="blue-grey darken-4" dark
							>Borrar curso...</v-system-bar
						>
						<v-card-text>
							<div class="text-h6 font-weight-light pa-12 text-center">
								¿Seguro que quieres borrar el curso?
							</div>
						</v-card-text>
						<v-card-actions class="justify-space-around">
							<v-btn outlined color="error" @click="closeDelete"
								>Cancelar</v-btn
							>
							<v-btn outlined color="amber" @click="deleteCursoConfirmed"
								>Borrar</v-btn
							>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-toolbar>
		</template>
		<template v-slot:[`item.actions`]="{ item }">
			<v-container>
				<v-row justify="end">
					<!-- Fullscreen Dialog -->
					<screen-dialog
						class="text-end px-5"
						:cursoId="item.id"
					></screen-dialog>
					<!-- Fullscreen Dialog end -->
					<v-icon small @click="deleteCurso(item.id)" color="error">
						mdi-delete
					</v-icon>
				</v-row>
			</v-container>
		</template>
	</v-data-table>
</template>

<script>
	import { db } from '@/firebase/firebase.js';
	import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore';
	import { mapState, mapActions } from 'vuex';
	import FullscreenDialog from '@/components/FullscreenDialog.vue';
	import { validationMixin } from 'vuelidate';
	import { required, url, minValue, maxValue } from 'vuelidate/lib/validators';

	export default {
		mixins: [validationMixin],
		name: 'cursos-table',
		// props: {},
		data: function () {
			return {
				headers: [
					{ text: 'Curso', align: 'start', value: 'name' },
					{ text: 'Cupos', value: 'cupos' },
					{ text: 'Inscritos', value: 'inscritos' },
					{ text: 'Duracion', value: 'duracion' },
					{ text: 'Costo', value: 'costo' },
					{ text: 'Terminado', value: 'terminado' },
					{ text: 'Fecha', value: 'fecha' },
					{ text: 'Acciones', align: 'end', value: 'actions', sortable: false },
				],
				deleteThisId: '',
				dialog: false,
				dialogDelete: false,
				fechaHoy: '',
				newItem: {
					name: '',
					img: '',
					cupos: null,
					inscritos: null,
					duracion: '',
					costo: null,
					codigo: '',
					descripcion: '',
					fecha: this.fechaActual(),
					terminado: false,
				},
				loading: true,
				loadingCreate: false,
			};
		},
		validations: function () {
			return {
				newItem: {
					name: { required },
					img: { required, url },
					cupos: { required, minValue: minValue(0) },
					inscritos: {
						required,
						minValue: minValue(0),
						maxValue: maxValue(this.newItem.cupos),
					},
					duracion: { required },
					costo: { required },
					codigo: { required },
				},
			};
		},
		computed: {
			...mapState(['cursos']),
			// Validation errors
			nameErrors() {
				const errors = [];
				if (!this.$v.newItem.name.$dirty) return errors;
				!this.$v.newItem.name.required &&
					errors.push('El nombre del curso es obligatorio');
				return errors;
			},
			imgErrors() {
				const errors = [];
				if (!this.$v.newItem.img.$dirty) return errors;
				!this.$v.newItem.img.required &&
					errors.push('Este campo es obligatorio');
				!this.$v.newItem.img.url &&
					errors.push(
						'Debes ingresar una URL válida ("http://www.unapagina.com")'
					);
				return errors;
			},
			cuposErrors() {
				const errors = [];
				if (!this.$v.newItem.cupos.$dirty) return errors;
				!this.$v.newItem.cupos.required &&
					errors.push('Este campo es obligatorio');
				!this.$v.newItem.cupos.minValue &&
					errors.push('Los cupos no pueden ser menor a 0');
				return errors;
			},
			inscritosErrors() {
				const errors = [];
				if (!this.$v.newItem.inscritos.$dirty) return errors;
				!this.$v.newItem.inscritos.required &&
					errors.push('Este campo es obligatorio');
				!this.$v.newItem.inscritos.maxValue &&
					errors.push('No pueden haber mas alumnos inscritos que cupos');
				!this.$v.newItem.inscritos.minValue &&
					errors.push('Los inscritos no pueden ser menor a 0');
				return errors;
			},
			duracionErrors() {
				const errors = [];
				if (!this.$v.newItem.duracion.dirty) return errors;
				!this.$v.newItem.duracion.required &&
					errors.push('Este campo es obligatorio');
				return errors;
			},
			costoErrors() {
				const errors = [];
				if (!this.$v.newItem.costo.$dirty) return errors;
				!this.$v.newItem.costo.required &&
					errors.push('Este campo es obligatorio');
				return errors;
			},
			codigoErrors() {
				const errors = [];
				if (!this.$v.newItem.codigo.$dirty) return errors;
				!this.$v.newItem.codigo.required &&
					errors.push('Este campo es obligatorio');
				return errors;
			},
		},
		methods: {
			...mapActions(['fetchCursos']),
			getColor(estado) {
				if (estado == false) return 'red';
				else return 'green';
			},
			async createCurso() {
				this.loadingCreate = true;
				this.$v.$touch();
				if (this.$v.$invalid) {
					alert('Error en formulario');
				} else {
					try {
						let response = await addDoc(collection(db, 'cursos'), this.newItem);
						console.log(response);
						this.fetchCursos();
						this.dialog = false;
						this.loadingCreate = false;
					} catch (error) {
						console.log(error);
					}
				}
			},
			fechaActual() {
				const current = new Date();
				const date =
					current.getDate() +
					'-' +
					(current.getMonth() + 1) +
					'-' +
					current.getFullYear();

				return date;
			},
			deleteCurso(id) {
				this.deleteThisId = id;
				this.dialogDelete = true;
			},
			async deleteCursoConfirmed() {
				try {
					await deleteDoc(doc(db, 'cursos', this.deleteThisId));

					this.dialogDelete = false;
					this.fetchCursos();
				} catch (error) {
					console.log(error);
				}
			},
			close() {
				this.dialog = false;
			},
			closeDelete() {
				this.dialogDelete = false;
			},
		},
		// watch: {},
		components: {
			'screen-dialog': FullscreenDialog,
		},
		// mixins: [],
		// filters: {},
		// -- Lifecycle Methods
		created() {
			this.fetchCursos();
		},
		updated() {
			this.loading = false;
		},
		// -- End Lifecycle Methods
	};
</script>

<style scoped></style>
