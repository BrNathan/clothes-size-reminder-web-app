<template>
  <div id="home">
    <h1>Home Page</h1>
    <h2>{{appName}}&nbsp;|&nbsp;{{appVersion}}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import { StringStore } from "../../store/types";

@Component({
  components: {}
})
export default class Home extends Vue {
  @State("version") appVersion: StringStore;

  @State("name") appName: StringStore;
}
</script>
