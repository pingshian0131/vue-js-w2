<script setup>
import { ref, computed } from 'vue'
import Login from './views/Login.vue'
import Product from './views/Product.vue'
import Admin from './views/Admin.vue'

const routes = {
  '/': Login,
  '/product': Product,
  '/admin': Admin,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  let NotFound = { template: '<p>Page not found</p>' };
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <component :is="currentView" />
</template>