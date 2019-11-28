<template>
  <div>
    <router-link :to="{name: 'home'}">Return to Home</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Error404 extends Vue {}
</script>
