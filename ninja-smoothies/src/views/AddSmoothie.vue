<template>
	<div class="add-smoothie container">
		<h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
		<form @submit.prevent="AddSmoothie">
			<div class="field title">
				<label for="title">Smoothie Title:</label>
				<input type="text" name="title" v-model="title" />
			</div>
			<div v-for="(ing, index) in ingredients" :key="index" class="field">
				<label for="ingredients">Ingredient:</label>
				<input type="text" name="ingredients" v-model="ingredients[index]" />
				<i class="material-icons delete" @click="deleteIng(ing)">delete</i>
			</div>
			<div class="field add-ingredient">
				<label for="add-ingredient">Add an ingredient:</label>
				<input type="text" name="add-ingredient" @keydown.tab="addIng" v-model="another" />
			</div>
			<div class="field center-align">
				<p v-if="feedback" class="red-text">{{ feedback }}</p>
				<button class="btn pink">Add Smoothie</button>
			</div>
		</form>
	</div>
</template>

<script>
import db from '@/firebase/init'
import { collection, addDoc } from "firebase/firestore";
import slugify from 'slugify'

export default {
	name: 'AddSmoothie',
	data() {
		return {
			title: null,
			another: null,
			ingredients: [],
			feedback: null,
			slug: null,
		}
	},
	methods: {
		async AddSmoothie() {
			if (this.title) {
				this.feedback = ''
				// create a slug
				this.slug = slugify(this.title, {
					replacement: '-',
					remove: /[$*_+~.()'"!\-:@]/g,
					lower: true
				})

				// Add a new document in collection "smoothies"
				addDoc(collection(db, "smoothies"), {
					title: this.title,
					ingredients: this.ingredients,
					slug: this.slug
				}).then(() => {
					this.$router.push({ name: 'Index' })
				}).catch(err => {
					console.log(err);
				});
			} else {
				this.feedback = ' You must enter a smoothie title'
			}
		},
		addIng() {
			if (this.another) {
				this.ingredients.push(this.another)
				this.another = null
				this.feedback = null
			} else {
				this.feedback = 'You must enter a value to add an ingredient'
			}
		},
		deleteIng(ing) {
			this.ingredients = this.ingredients.filter(ingredient => {
				return ingredient != ing
			})
		},
	}
}
</script>

<style>
.add-smoothie {
	margin-top: 60px;
	padding: 20px;
	max-width: 500px;
}
.add-smoothie h2 {
	font-size: 2em;
	margin: 20px auto;
}
.add-smoothie .field {
	margin: 20px auto;
	position: relative;
}
.add-smoothie .delete {
	position: absolute;
	right: 0;
	bottom: 16px;
	color: #aaa;
	font-size: 1.4em;
	cursor: pointer;
}
</style>