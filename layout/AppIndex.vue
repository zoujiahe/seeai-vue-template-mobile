<template>
  <div class="app-index">
    <div id="nav">
      <h1>This is an app-index page</h1>
      <router-link :to="{ name: 'home'}">home</router-link>
      |
      <router-link :to="{ name: 'demo-construct', query: { id: '0' },params: { id: '1' }}">demo-construct</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'seeai-vue-template-mobile-index',
  setup () {
    return {
    }
  }
})
</script>
