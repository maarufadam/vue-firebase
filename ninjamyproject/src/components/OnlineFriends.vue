<template>
	<div id="online-friends">
		<h2>Online Friends</h2>
		<div v-for="(friend, index) in friends" :key="index">
			<span v-if="friend.online">{{ friend.name }}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'OnlineFriends',
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
	}
}
</script>

<style>
</style>