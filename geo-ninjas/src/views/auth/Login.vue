<template>
	<div class="login container">
		<form @submit.prevent="login" class="card-panel">
			<h2 class="center deep-purple-text">Login</h2>
			<div class="field">
				<label for="email">Email:</label>
				<input type="email" name="email" v-model="email" />
			</div>
			<div class="field">
				<label for="password">Password:</label>
				<input type="password" name="password" v-model="password" />
			</div>
			<p class="red-text center" v-if="feedback">{{ feedback }}</p>
			<div class="field center">
				<button class="btn deep-purple">Sign-In</button>
			</div>
		</form>
	</div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
	name: 'Login',
	components: {},
	data() {
		return {
			email: null,
			password: null,
			feedback: null,
		}
	},
	methods: {
		async login() {
			if (this.email && this.password) {
				this.feedback = null;

				const auth = getAuth();
				signInWithEmailAndPassword(auth, this.email, this.password)
					.then((userCredential) => {
						// Signed in
						this.$router.push({ name: 'GMap' });
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						this.feedback = error.message;
						console.log(error);
						// ..
					});
			} else {
				this.feedback = "You must enter an email/password."
			}
		}
	},
}
</script>

<style>
.login {
	max-width: 400px;
	margin-top: 60px;
}

.login h2 {
	font-size: 2.4em;
}

.login .field {
	margin-bottom: 16px;
}
</style>