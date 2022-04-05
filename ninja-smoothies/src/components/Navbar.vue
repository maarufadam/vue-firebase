<template>
	<nav class="nav-extended indigo darken-2">
		<div class="nav-content">
			<router-link :to="{ name: 'Index' }">
				<span class="nav-title">Ninja Smoothies</span>
			</router-link>
			<a href="" class="btn-floating btn-large halfway-fab waves-effect waves-light pink pulse">
				<router-link :to="{ name: 'AddSmoothie' }">
					<i class="material-icons">add</i>
				</router-link>
			</a>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'Navbar',
	data() {
		return {}
	}
}
</script>

<style>
nav .nav-content {
	padding: 0 20px;
}
</style>