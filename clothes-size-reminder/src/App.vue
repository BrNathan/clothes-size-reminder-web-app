<template>
  <v-app>
    <router-view name="topNavBar"></router-view>
    <router-view name="sideBar"></router-view>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <router-view name="footerBar"></router-view>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { STORE_REFERENTIAL } from '@/store/namespace';

@Component({
  name: 'App',
  components: {},
})
export default class App extends Vue {
  @Action('fetchGenderData', { namespace: STORE_REFERENTIAL })
  fetchGenderData: any;

  @Action('fetchClothesCategoryData', { namespace: STORE_REFERENTIAL })
  fetchClothesCategoryData: any;

  mounted() {
    this.fetchGenderData();
    this.fetchClothesCategoryData();
  }
}
</script>
