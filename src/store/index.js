import Vue from 'vue';
import Vuex from 'vuex';
import { db } from '@/firebase/firebase.js';
import { collection, getDocs } from 'firebase/firestore';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		cursos: [],
	},
	getters: {
		cursosAmount(state) {
			return state.cursos.length;
		},
		alumnosPermitidos(state) {
			return state.cursos.reduce((total, curso) => {
				return total + parseInt(curso.cupos);
			}, 0);
		},
		alumnosInscritos(state) {
			return state.cursos.reduce((total, curso) => {
				return total + parseInt(curso.inscritos);
			}, 0);
		},
		cuposDisponibles(state, getters) {
			return getters.alumnosPermitidos - getters.alumnosInscritos;
		},
		cursosTerminados(state) {
			let terminados = state.cursos.filter((curso) => {
				return curso.terminado === true;
			});
			return terminados.length;
		},
		cursosActivos(state) {
			let activos = state.cursos.filter((curso) => {
				return curso.terminado === false;
			});
			return activos.length;
		},
	},
	mutations: {
		ADD_CURSO(state, curso) {
			state.cursos.push({
				id: curso.id,
				name: curso.data().name,
				codigo: curso.data().codigo,
				costo: Number(curso.data().costo).toLocaleString('es-CL'),
				cupos: curso.data().cupos,
				descripcion: curso.data().descripcion,
				duracion: curso.data().duracion,
				fecha: curso.data().fecha,
				inscritos: curso.data().inscritos,
				terminado: curso.data().terminado,
				img: curso.data().img,
			});
		},
		RESET_CURSO(state) {
			state.cursos = [];
		},
	},
	actions: {
		async fetchCursos({ commit }) {
			let querySnapshot = await getDocs(collection(db, 'cursos'));
			commit('RESET_CURSO');
			querySnapshot.forEach((doc) => {
				commit('ADD_CURSO', doc);
			});
		},
	},
	modules: {},
});
