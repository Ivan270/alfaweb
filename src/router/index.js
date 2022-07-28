import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Administracion from '@/views/Administracion.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import { getAuth } from 'firebase/auth';
import ErrorView from '@/views/Error.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
		meta: {
			privateRoute: true,
		},
	},

	{
		path: '/administracion',
		component: Administracion,
		meta: {
			privateRoute: true,
		},
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/register',
		component: Register,
	},
	{
		path: '*',
		component: ErrorView,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	const auth = getAuth();
	let user = auth.currentUser;

	let private_route = to.meta.privateRoute;
	if (private_route && !user) {
		next('/login');
	} else if (private_route == undefined && user) {
		next('/');
	} else {
		next();
	}
});

export default router;
