<template>
  <v-app>
    <TopNavBar />
    <SideBar />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
	<FooterBar />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopNavBar from "@/components/TopNavBar.vue";
import SideBar from "@/components/SideBar.vue";
import FooterBar from "@/components/FooterBar.vue";

@Component({
  name: "App",
  components: {
    TopNavBar,
	SideBar,
	FooterBar
  }
})
export default class App extends Vue {}
</script>
