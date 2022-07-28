<template>
	<v-container fluid class="blue-grey darken-4">
		<v-row justify="start">
			<v-col cols="10">
				<p class="text-h3 text-md-h2 py-4 white--text">Administración</p>
				<cursos-table></cursos-table>
			</v-col>
			<v-col cols="10" lg="4" class="ms-0 px-0">
				<extra-info></extra-info>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import CursosTable from '@/components/CursosTable.vue';
	import ExtraInfo from '@/components/ExtraInfo.vue';

	export default {
		name: 'admin-view',
		// props: {},
		data: function () {
			return {};
		},
		computed: {
			...mapState(['cursos']),
		},
		methods: {
			...mapActions(['fetchCursos']),
		},
		// watch: {},
		components: {
			'cursos-table': CursosTable,
			'extra-info': ExtraInfo,
		},
		// mixins: [],
		// filters: {},
		// -- Lifecycle Methods
		created() {
			this.fetchCursos();
		},
		// -- End Lifecycle Methods
	};
</script>
