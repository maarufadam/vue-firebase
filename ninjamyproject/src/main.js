import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.config.globalProperties.$filters = {
	snippet(val) {
		if (!val || typeof (val) != 'string') return '';
		return val.slice(0, 50);
	}
};

app.mount('#app');