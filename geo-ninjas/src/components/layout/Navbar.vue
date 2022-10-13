<template>
	<nav class="deep-purple darken-1">
		<div class="nav-content">
			<div class="container">
				<router-link :to="{ name: 'GMap' }" class="brand-logo left"><a>GeoNinjas!</a></router-link>
				<ul class="right">
					<li v-if="!user">
						<router-link :to="{ name: 'Signup' }">Signup</router-link>
					</li>
					<li v-if="!user">
						<router-link :to="{ name: 'Login' }">Login</router-link>
					</li>
					<li v-if="user">
						<a>{{ user.email }}</a>
					</li>
					<li v-if="user">
						<a @click="logout">Logout</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
import { getAuth } from "firebase/auth";

export default {
	name: 'Navbar',
	components: {},
	data() {
		return {
			user: null
		}
	},
	methods: {
		logout() {
			const auth = getAuth();
			auth.signOut().then(() => {
				this.$router.push({ name: 'Login' })
			})
		}
	},
	created() {
		const auth = getAuth();
		let user = auth.onAuthStateChanged((user) => {
			if (user) {
				this.user = user
			} else {
				this.user = null
			}
		});
	}
}
</script>

<style>
nav .nav-content {
	padding: 0 20px;
}
</style>