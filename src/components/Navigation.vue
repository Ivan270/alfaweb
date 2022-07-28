<template>
	<div>
		<v-app-bar
			dark
			color="amber"
			clipped-right
			src="https://wallpapercave.com/wp/wp2081265.jpg"
		>
			<template v-slot:img="{ props }">
				<v-img
					v-bind="props"
					gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
				></v-img>
			</template>
			<v-row justify="center">
				<v-icon large class="mr-2">mdi-webpack</v-icon>
				<v-toolbar-title class="text-uppercase">AlfaWeb</v-toolbar-title>
			</v-row>
		</v-app-bar>

		<v-navigation-drawer
			v-model="drawer"
			absolute
			permanent
			right
			clipped
			expand-on-hover
			dark
			color="blue-grey darken-2"
		>
			<template v-slot:prepend>
				<v-list-item two-line class="pl-2">
					<v-list-item-avatar>
						<v-icon large color="amber darken-3">mdi-account</v-icon>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>{{ usuario }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</template>
			<v-list nav dense>
				<v-list-item-group
					v-model="group"
					active-class="amber--text text--accent-4"
				>
					<v-list-item
						v-for="path in paths"
						:key="path.title"
						@click="redirectTo(path.path)"
						:disabled="currentRoute == path.path"
					>
						<v-list-item-icon>
							<v-icon>{{ path.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-title>{{ path.title }}</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
			<template v-slot:append>
				<v-list-item>
					<v-list-item-icon
						><v-icon @click="dialog = true">mdi-logout </v-icon>
					</v-list-item-icon>
					<v-list-item-title>Cerrar sesión</v-list-item-title>
				</v-list-item>
			</template>
		</v-navigation-drawer>
		<v-dialog
			v-model="dialog"
			transition="dialog-bottom-transition"
			max-width="600"
		>
			<v-card color="blue-grey darken-2" dark>
				<v-system-bar color="blue-grey darken-4" dark
					>Cerrar sesión...</v-system-bar
				>
				<v-card-text>
					<div class="text-h6 font-weight-light pa-12 text-center">
						¿Seguro que quieres salir?
					</div>
				</v-card-text>
				<v-card-actions class="justify-space-around">
					<v-btn outlined @click="dialog = false" color="error">Cancelar</v-btn>
					<v-btn outlined @click="logout" color="amber">Confirmar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

	export default {
		name: 'navbar-comp',
		// props: {},
		data: function () {
			return {
				drawer: false,
				group: null,
				usuario: '',
				paths: [
					{ title: 'Home', path: '/', icon: 'mdi-home' },
					{
						title: 'Administración',
						path: '/administracion',
						icon: 'mdi-chair-school',
					},
				],
				dialog: false,
			};
		},
		computed: {
			currentRoute() {
				return this.$route.fullPath;
			},
		},
		methods: {
			userId() {
				const auth = getAuth();
				return onAuthStateChanged(auth, (user) => {
					const uemail = user.email;
					// console.log(uemail);
					this.usuario = uemail;
				});
			},
			logout() {
				const auth = getAuth();
				signOut(auth)
					.then(() => {
						console.log('logout exitoso');
						this.$router.push('/login');
					})
					.catch((error) => {
						console.log('error de logout ' + error);
					});
			},
			redirectTo(path) {
				this.$router.push(path);
			},
		},
		// watch: {},
		// components: {},
		// mixins: [],
		// filters: {},
		// -- Lifecycle Methods
		created() {
			this.userId();
		},
		// -- End Lifecycle Methods
	};
</script>

<style scoped></style>
