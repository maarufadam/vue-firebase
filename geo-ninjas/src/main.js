import { createApp } from 'vue';
import App from './App';
import router from './router';
import { getAuth } from "firebase/auth";

const auth = getAuth();

let app = null;

// wait for firebase auth to init before creating the app
auth.onAuthStateChanged((user) => {

	// init app if not already created
	if (!app) {
		app = createApp(App).use(router).mount('#app');
	}
});
