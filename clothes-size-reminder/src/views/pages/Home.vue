<template>
  <div id="home">
    <h1>Home Page</h1>
    <h1>{{toto}}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {
  public toto = 're';
}
</script>
