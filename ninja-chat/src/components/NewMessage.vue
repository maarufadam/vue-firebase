<template>
	<div class="new-message">
		<form @submit.prevent="addMessage">
			<label for="new-message">New Message (enter to add):</label>
			<p v-if="feedback" class="red-text">{{ feedback }}</p>
			<input type="text" name="new-message" v-model="newMessage"/>
	</form>
</div>
</template>


<script>
import db from '@/firebase/init'
import { collection, addDoc } from "firebase/firestore";

export default {
	name: 'NewMessage',
	props: ['name'],
	data() {
		return {
			newMessage: null,
			feedback: null,
		}
	},
	methods: {
		async addMessage() {
			if (this.newMessage) {
				// Add a new document in collection "messages"
				addDoc(collection(db, "messages"), {
					content: this.newMessage,
					name: this.name,
					timestamp: Date.now()
				}).catch(err => {
					console.log(err);
				});
				this.newMessage = null
				this.feedback = null
			} else {
				this.feedback = "You must enter a message in order to send one"
			}
		}
	}
}
</script>


<style>
</style>