<template>
	<div v-if="smoothie" class="edit-smoothie container">
		<h2 class="center-align indigo-text">Edit: {{ smoothie.title }} Recipe</h2>
		<form @submit.prevent="EditSmoothie">
			<div class="field title">
				<label for="title">Smoothie Title:</label>
				<input type="text" name="title" v-model="smoothie.title"/>
			</div>
			<div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
				<label for="ingredients">Ingredient:</label>
				<input type="text" name="ingredients" v-model="smoothie.ingredients[index]" />
				<i class="material-icons delete" @click="deleteIng(ing)">delete</i>
			</div>
			<div class="field add-ingredient">
				<label for="add-ingredient">Add an ingredient:</label>
				<input type="text" name="add-ingredient" @keydown.tab="addIng" v-model="another" />
			</div>
			<div class="field center-align">
				<p v-if="feedback" class="red-text">{{ feedback }}</p>
				<button class="btn pink">Update Smoothie</button>
			</div>
		</form>
	</div>
</template>

<script>
import db from '@/firebase/init'
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import slugify from 'slugify'

export default {
	name: 'EditSmoothie',
	data() {
		return {
			smoothie: null,
			another: null,
			feedback: null,
		}
	},
	methods: {
		async EditSmoothie() {
			if (this.smoothie.title) {
				this.feedback = ''
				// create a slug
				this.smoothie.slug = slugify(this.smoothie.title, {
					replacement: '-',
					remove: /[$*_+~.()'"!\-:@]/g,
					lower: true
				})

				const smoothieRef = doc(db, "smoothies", this.smoothie.id);

				// Update the document in collection "smoothies"
				updateDoc(smoothieRef, {
					title: this.smoothie.title,
					ingredients: this.smoothie.ingredients,
					slug: this.smoothie.slug
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
				this.smoothie.ingredients.push(this.another)
				this.another = null
				this.feedback = null
			} else {
				this.feedback = 'You must enter a value to add an ingredient'
			}
		},
		deleteIng(ing) {
			this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
				return ingredient != ing
			})
		},
	},
	async created() {
		const q = query(collection(db, "smoothies"), where("slug", "==", this.$route.params.smoothie_slug));

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			this.smoothie = doc.data();
			this.smoothie.id = doc.id;
		});
	}
}
</script>

<style>
.edit-smoothie {
	margin-top: 60px;
	padding: 20px;
	max-width: 500px;
}
.edit-smoothie h2 {
	font-size: 2em;
	margin: 20px auto;
}
.edit-smoothie .field {
	margin: 20px auto;
	position: relative;
}
.edit-smoothie .delete {
	position: absolute;
	right: 0;
	bottom: 16px;
	color: #aaa;
	font-size: 1.4em;
	cursor: pointer;
}
</style>