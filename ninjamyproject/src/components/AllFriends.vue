<template>
	<div id="all-friends">
		<h2>All Friends</h2>
		<div v-for="(friend, index) in friends" :key="index">
			<span @click="unfriend(friend.name)">{{ friend.name }}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AllFriends',
	props: ['friends'],
	data() {
		return {
			friends: [
				{ name: 'Maria', online: true },
				{ name: 'Luigi', online: false },
				{ name: 'Toad', online: true },
				{ name: 'Bowser', online: false },
			]
		}
	},
	methods: {
		unfriend(name) {
			this.$emit('delete', { name })
		},
		deleteFriend(payload) {
			console.log(payload)
			this.friends = this.friends.filter(friend => {
				return friend.name !== payload.name
			})
		}
	}
}
</script>

<style>
</style>