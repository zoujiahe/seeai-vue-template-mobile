<template>
  <div class="home">
    <h1>This is an seeai-vue-template home page</h1>
    <h1>Welcome To Use SEEAI Template</h1>
    <div>
      <img :src='imgUrl' alt=''>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRaw, reactive, ref } from 'vue'

export default defineComponent({
  name: 'home',
  setup () {
    return {
      imgUrl: require('@images/logo.png')
    }
  }
})
</script>
