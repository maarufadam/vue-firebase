<template>
	<div class="chat container">
		<h2 class="center teal-text">Ninja Chat</h2>
		<div class="card">
			<div class="card-content">
				<ul class="messages">
					<li v-for="message in messages" :key="message.id">
						<span class="teal-text">{{ message.name }}:</span>
						<span class="grey-text text-darken-3">{{ message.content }}</span>
						<span class="grey-text time">{{ message.timestamp }}</span>
					</li>
				</ul>
			</div>
			<div class="card-action">
				<NewMessage :name="name" />
			</div>
		</div>
	</div>
</template>


<script>
import NewMessage from '@/components/NewMessage'
import db from '@/firebase/init'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import moment from 'moment'

export default {
	name: 'Chat',
	props: ['name'],
	components: {
		NewMessage
	},
	data() {
		return {
			messages: []
		}
	},
	created() {
		const q = query(collection(db, "messages"), orderBy("timestamp"));

		const unsubscribe = onSnapshot(
			q,
			(snapshot) => {
				snapshot.docChanges().forEach(change => {
					if (change.type == 'added') {
						let doc = change.doc
						this.messages.push({
							id: doc.id,
							name: doc.data().name,
							content: doc.data().content,
							timestamp: moment(doc.data().timestamp).format('lll'),
						})
					}
				})
			},
			(error) => {
				console.log(error);
			});
	}
}
</script>


<style>
.chat h2 {
	font-size: 2.6em;
	margin-bottom: 40px;
}
.chat span {
	font-size: 1.4em;
}
.chat .time {
	display: block;
	font-size: 0.8em;
}
.messages {
	max-height: 300px;
	overflow: auto;
}
.messages::-webkit-scrollbar {
	width: 3px;
}
.messages::-webkit-scrollbar-track {
	background: #ddd;
}
.messages::-webkit-scrollbar-thumb {
	background: #aaa;
}
</style>