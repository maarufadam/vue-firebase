<template>
  <h1>{{ title }}</h1>
  <Navbar />
  <Blogs />
</template>

<script>
import Navbar from './components/Navbar.vue'
import Blogs from './components/Blogs.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    Blogs
  },
  data() {
    return {
      title: 'My first Vue app, wooo :)',
    }
  },
  methods: {

  }
}
</script>

<style>
h1 {
  color: #444;
  font-weight: normal;
  text-align: center;
}
</style>