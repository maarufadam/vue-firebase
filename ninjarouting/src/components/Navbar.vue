<template>
	<nav class="main-nav">
		<ul>
			<li>
				<router-link to="/">Home</router-link>
			</li>
			<li>
				<router-link :to="{ name: 'About' }">About</router-link>
			</li>
		</ul>
		<h2>User Profiles</h2>
		<ul>
			<li v-for="(id, index) in userIds" :key="index">
				<router-link :to="{ name: 'ViewProfile', params: { user_id: id } }">
					<span>Profile {{ id }}</span>
				</router-link>
			</li>
		</ul>
		<h2>Navigation controls</h2>
		<ul>
			<li>
				<button @click="goBack">Go Back</button>
			</li>
			<li>
				<button @click="goHome">Redirect to Home</button>
			</li>
			<li>
				<button @click="goForward">Go Forward</button>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'Navbar',
	data() {
		return {
			userIds: ['1', '2', '3', '4']
		}
	},
	methods: {
		goBack() {
			this.$router.go(-1)
		},
		goHome() {
			this.$router.push({name: 'Home'})
		},
		goForward() {
			this.$router.go(+1)
		},
	}
}
</script>

<style>
nav {
	padding: 30px;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
}

nav a.router-link-exact-active {
	color: #42b983;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
	margin: 10px;
}
</style>