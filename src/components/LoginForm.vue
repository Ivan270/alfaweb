<template>
	<v-card class="pa-10" elevation="24" dark shaped>
		<v-form>
			<v-row justify="center">
				<v-col cols="10">
					<v-card-title class="px-0 pb-7">Ingrese sus datos</v-card-title>
					<v-text-field
						v-model="email"
						:error-messages="emailErrors"
						label="E-mail"
						required
						@input="$v.email.$touch()"
						@blur="$v.email.$touch()"
					></v-text-field>
					<v-text-field
						type="password"
						v-model="password"
						:error-messages="passErrors"
						label="Contraseña"
						required
						@input="$v.password.$touch()"
						@blur="$v.password.$touch()"
					></v-text-field>
					<v-text-field
						type="password"
						v-model="confirmPass"
						:error-messages="confirmPassErrors"
						label="Confirme su contraseña"
						required
						@input="$v.confirmPass.$touch()"
						@blur="$v.confirmPass.$touch()"
					></v-text-field>
					<v-subheader class="px-0"
						>¿No tienes cuenta?
						<a href="/register" class="ps-2 amber--text"> Regístrate</a>
					</v-subheader>
					<v-card-actions class="pt-6 px-0">
						<v-row>
							<v-col cols="12">
								<v-btn
									color="indigo"
									@click="login"
									block
									:loading="loading"
									small
									>Ingresar</v-btn
								>
							</v-col>
							<v-col cols="12">
								<v-btn color="pink darken-1" block small>Limpiar</v-btn>
							</v-col>
						</v-row>
					</v-card-actions>
				</v-col>
			</v-row>
		</v-form>
		<div class="text-center ma-2">
			<v-snackbar v-model="snackbarError" color="error" outlined>
				{{ textError }}

				<template v-slot:action="{ attrs }">
					<v-btn
						color="white"
						text
						v-bind="attrs"
						@click="snackbarError = false"
					>
						Close
					</v-btn>
				</template>
			</v-snackbar>
		</div>
	</v-card>
</template>

<script>
	import { required, sameAs, minLength, email } from 'vuelidate/lib/validators';
	import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

	export default {
		name: 'login-form',
		// props: {},
		data: function () {
			return {
				email: '',
				password: '',
				confirmPass: '',
				loading: false,
				snackbarError: false,
				textError: '',
			};
		},
		validations: function () {
			return {
				email: { required, email },
				password: { required, minLength: minLength(6) },
				confirmPass: { required, sameAs: sameAs('password') },
			};
		},
		computed: {
			emailErrors() {
				const errors = [];
				if (!this.$v.email.$dirty) return errors;
				!this.$v.email.email && errors.push('Debe ser un e-mail válido');
				!this.$v.email.required && errors.push('E-mail es obligatorio');
				return errors;
			},
			passErrors() {
				const errors = [];
				if (!this.$v.password.$dirty) return errors;
				!this.$v.password.minLength &&
					errors.push('Debe contener al menos 6 caracteres');
				!this.$v.password.required && errors.push('Contraseña es obligatoria');
				return errors;
			},
			confirmPassErrors() {
				const errors = [];
				if (!this.$v.confirmPass.$dirty) return errors;
				!this.$v.confirmPass.sameAs &&
					errors.push('Debe ser idéntica a la contraseña');
				!this.$v.confirmPass.required && errors.push('Campo requerido');
				return errors;
			},
		},
		methods: {
			async login() {
				this.loading = true;
				this.$v.$touch();
				if (this.$v.$invalid) {
					this.textError = 'Error en el formulario';
					this.snackbarError = true;
					this.loading = false;
					return;
				} else {
					const { email, password } = this;
					const auth = getAuth();
					const { user } = await signInWithEmailAndPassword(
						auth,
						email,
						password
					);
					console.log(user);
					this.loading = false;
					this.$router.push('/');
				}
			},
		},
		// watch: {},
		// components: {},
		// mixins: [],
		// filters: {},
		// -- Lifecycle Methods
		// -- End Lifecycle Methods
	};
</script>

<style scoped></style>
