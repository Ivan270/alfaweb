<template>
	<v-row justify="center">
		<v-dialog
			v-model="dialog"
			fullscreen
			hide-overlay
			transition="dialog-bottom-transition"
			dark
		>
			<template v-slot:activator="{ on, attrs }">
				<v-icon small v-bind="attrs" v-on="on" color="indigo"
					>mdi-pencil</v-icon
				>
			</template>
			<v-card>
				<v-card-title>
					Editar curso:
					<span class="ml-3 text-h5 amber--text text--darken-3">{{
						form.name
					}}</span>
				</v-card-title>

				<v-card-text>
					<v-form ref="form">
						<v-container>
							<v-row>
								<v-col cols="12">
									<v-text-field
										v-model="form.name"
										label="Nombre"
										dense
										required
										:error-messages="nameErrors"
										@input="$v.form.name.$touch()"
										@blur="$v.form.name.$touch()"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										v-model="form.img"
										label="URL de la imagen del curso"
										dense
										required
										:error-messages="imgErrors"
										@input="$v.form.img.$touch()"
										@blur="$v.form.img.$touch()"
									></v-text-field>
								</v-col>
								<v-col cols="6">
									<v-text-field
										v-model="form.cupos"
										label="Cupos"
										type="number"
										dense
										required
										:error-messages="cuposErrors"
										@input="$v.form.cupos.$touch()"
										@blur="$v.form.cupos.$touch()"
									></v-text-field>
								</v-col>
								<v-col cols="6">
									<v-text-field
										v-model="form.inscritos"
										label="Inscritos"
										type="number"
										dense
										required
										:error-messages="inscritosErrors"
										@input="$v.form.inscritos.$touch()"
										@blur="$v.form.inscritos.$touch()"
									></v-text-field>
								</v-col>
								<v-col cols="6">
									<v-text-field
										v-model="form.duracion"
										label="Duración del curso"
										dense
										required
										:error-messages="duracionErrors"
										@input="$v.form.duracion.$touch()"
										@blur="$v.form.duracion.$touch()"
									></v-text-field>
								</v-col>
								<v-col cols="6">
									<v-text-field
										v-model="form.costo"
										label="Precio del curso"
										type="number"
										dense
										required
										:error-messages="costoErrors"
										@input="$v.form.costo.$touch()"
										@blur="$v.form.costo.$touch()"
									></v-text-field>
								</v-col>
								<v-col cols="6">
									<v-text-field
										v-model="form.codigo"
										label="Codigo del curso"
										dense
										required
										:error-messages="codigoErrors"
										@input="$v.form.codigo.$touch()"
										@blur="$v.form.codigo.$touch()"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-textarea
										v-model="form.descripcion"
										label="Descripción del curso"
										outlined
									></v-textarea>
								</v-col>
								<v-col cols="12">
									<v-text-field
										v-model="form.fecha"
										label="Fecha de registro"
										dense
										required
										:error-messages="fechaErrors"
										@input="$v.form.fecha.$touch()"
										@blur="$v.form.fecha.$touch()"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-switch
										v-model="form.terminado"
										:label="`Terminado: ${form.terminado.toString()}`"
									></v-switch>
								</v-col>
							</v-row>
						</v-container>
					</v-form>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="error" text @click="close"> Cancelar </v-btn>
					<v-btn color="amber" text @click="editCurso()" :loading="loading">
						Guardar Curso
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
	import { mapActions } from 'vuex';
	import { db } from '@/firebase/firebase.js';
	import { doc, getDoc, updateDoc } from 'firebase/firestore';
	import { validationMixin } from 'vuelidate';
	import { required, url, maxValue } from 'vuelidate/lib/validators';

	export default {
		mixins: [validationMixin],
		name: 'fscreen-dialog',
		props: ['cursoId'],
		data: function () {
			return {
				dialog: false,
				sound: true,
				widgets: false,
				form: {
					name: '',
					img: '',
					cupos: '',
					inscritos: '',
					duracion: '',
					costo: '',
					codigo: '',
					descripcion: '',
					fecha: '',
					terminado: '',
				},
				loading: false,
			};
		},
		validations: function () {
			return {
				form: {
					name: { required },
					img: { required, url },
					cupos: { required },
					inscritos: {
						required,
						maxValue: maxValue(this.form.cupos),
					},
					duracion: { required },
					fecha: { required },
					costo: { required },
					codigo: { required },
				},
			};
		},
		computed: {
			nameErrors() {
				const errors = [];
				if (!this.$v.form.name.$dirty) return errors;
				!this.$v.form.name.required &&
					errors.push('El nombre del curso es obligatorio');
				return errors;
			},
			imgErrors() {
				const errors = [];
				if (!this.$v.form.img.$dirty) return errors;
				!this.$v.form.img.required && errors.push('Este campo es obligatorio');
				!this.$v.form.img.url &&
					errors.push(
						'Debes ingresar una URL válida ("http://www.unapagina.com")'
					);
				return errors;
			},
			cuposErrors() {
				const errors = [];
				if (!this.$v.form.cupos.$dirty) return errors;
				!this.$v.form.cupos.required &&
					errors.push('Este campo es obligatorio');
				return errors;
			},
			inscritosErrors() {
				const errors = [];
				if (!this.$v.form.inscritos.$dirty) return errors;
				!this.$v.form.inscritos.required &&
					errors.push('Este campo es obligatorio');
				!this.$v.form.inscritos.maxValue &&
					errors.push('No pueden haber mas alumnos inscritos que cupos');
				return errors;
			},
			duracionErrors() {
				const errors = [];
				if (!this.$v.form.duracion.dirty) return errors;
				!this.$v.form.duracion.required &&
					errors.push('Este campo es obligatorio');
				return errors;
			},
			costoErrors() {
				const errors = [];
				if (!this.$v.form.costo.$dirty) return errors;
				!this.$v.form.costo.required &&
					errors.push('Este campo es obligatorio');
				return errors;
			},
			codigoErrors() {
				const errors = [];
				if (!this.$v.form.codigo.$dirty) return errors;
				!this.$v.form.codigo.required &&
					errors.push('Este campo es obligatorio');
				return errors;
			},
			fechaErrors() {
				const errors = [];
				if (!this.$v.form.fecha.$dirty) return errors;
				!this.$v.form.fecha.required && errors.push('Debes incluir la fecha');
				return errors;
			},
		},
		methods: {
			...mapActions(['fetchCursos']),
			async fetchCursoById() {
				const docRef = doc(db, 'cursos', this.cursoId);
				let response = await getDoc(docRef);
				// console.log(response);

				this.form = response.data();
			},
			async editCurso() {
				this.loading = true;
				this.$v.$touch();
				if (this.$v.$invalid) {
					alert('Error en el formulario');
				} else {
					try {
						let curso = this.form;

						curso.id = this.cursoId;

						await updateDoc(doc(db, 'cursos', curso.id), curso);
						this.fetchCursos();
						this.loading = false;
						this.close();
					} catch (error) {
						console.log(error);
					}
				}
			},
			close() {
				this.dialog = false;
			},
		},
		// watch: {},
		// components: {},
		// mixins: [],
		// filters: {},
		// -- Lifecycle Methods
		created() {
			this.fetchCursoById();
		},
		// -- End Lifecycle Methods
	};
</script>

<style scoped>
	v-dialog {
		height: 100vh;
	}
</style>
