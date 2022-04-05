<template>
  <div class="index container" style="marginTop: 50px">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <span class="delete" @click="deleteSmoothie(smoothie.id)">
        <i class="material-icons center">delete</i>
      </span>
      <div class="card-content" style="margin-top: 20px;">
        <h2 class="card-title">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab waves-effect waves-light pink">
        <router-link :to="{ name: 'EditSmoothie', params: { smoothie_slug: smoothie.slug } }">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export default {
  name: 'Index',
  components: {},
  data() {
    return {
      smoothies: [
      ]
    }
  },
  methods: {
    deleteSmoothie(id) {
      // delete doc from firestore
      deleteDoc(doc(db, "smoothies", id)).then(() => {
        this.smoothies = this.smoothies.filter(smoothie => {
          return smoothie.id != id
        })
      });
    }
  },
  async created() {
    // fetch data from the firestore
    const querySnapshot = await getDocs(collection(db, "smoothies"));
    querySnapshot.forEach((doc) => {
      let smoothie = doc.data()
      smoothie.id = doc.id
      this.smoothies.push(smoothie)
    });
  }
}
</script>

<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  margin-top: 60px;
}

.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0px;
}

.index .ingredients {
  margin: 30px auto;
}

.index .ingredients li {
  display: inline-block;
}

.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #444;
  font-size: 1.4em;
}
</style>