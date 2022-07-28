import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import 'animate.css';

Vue.use(Vuelidate);

Vue.config.productionTip = false;

const auth = getAuth();

onAuthStateChanged(auth, () => {
	new Vue({
		router,
		store,
		vuetify,
		render: (h) => h(App),
	}).$mount('#app');
});
