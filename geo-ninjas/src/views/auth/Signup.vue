<template>
	<div class="signup container">
		<form @submit.prevent="signup" class="card-panel">
			<h2 class="center deep-purple-text">Signup</h2>
			<div class="field">
				<label for="email">Email:</label>
				<input type="email" name="email" v-model="email" />
			</div>
			<div class="field">
				<label for="password">Password:</label>
				<input type="password" name="password" v-model="password" />
			</div>
			<div class="field">
				<label for="alias">Alias:</label>
				<input type="text" name="alias" v-model="alias" />
			</div>
			<p class="red-text center" v-if="feedback">{{ feedback }}</p>
			<div class="field center">
				<button class="btn deep-purple">Signup</button>
			</div>
		</form>
	</div>
</template>

<script>
import slugify from 'slugify';
import db from '@/firebase/init'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
	name: 'Signup',
	components: {},
	data() {
		return {
			email: null,
			password: null,
			alias: null,
			feedback: null,
			slug: null,
		}
	},
	methods: {
		async signup() {
			if (this.alias && this.email && this.password) {
				this.feedback = null;
				this.slug = slugify(this.alias, {
					replacement: '-',
					remove: /[$*_+~.()'"!\-:@]/g,
					lower: true,
				});

				const docRef = doc(db, "users", this.slug);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					this.feedback = "This alias has already been used."
				} else {
					const auth = getAuth();
					createUserWithEmailAndPassword(auth, this.email, this.password)
						.then((userCredential) => {
							console.log(userCredential.user);
							// Signed in
							setDoc(docRef, {
								alias: this.alias,
								geolocation: null,
								user_id: userCredential.user.uid,
							}).then(()=> {
								this.$router.push({ name: 'GMap' })
							})
						})
						.catch((error) => {
							const errorCode = error.code;
							const errorMessage = error.message;
							this.feedback = error.message;
							console.log(error);
							// ..
						});
				}
			} else {
				this.feedback = "You must enter an alias."
			}
		}
	},
}
</script>

<style>
.signup {
	max-width: 400px;
	margin-top: 60px;
}
.signup h2 {
	font-size: 2.4em;
}
.signup .field {
	margin-bottom: 16px;
}
</style>