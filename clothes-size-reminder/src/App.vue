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
import { Action, State } from 'vuex-class';
import { STORE_REFERENTIAL, STORE_REMINDER, STORE_USER } from '@/store/namespace';

@Component({
  name: 'App',
  components: {},
})
export default class App extends Vue {
  @Action('fetchGenderData', { namespace: STORE_REFERENTIAL })
  fetchGenderData?: () => void;

  @Action('fetchClothesCategoryData', { namespace: STORE_REFERENTIAL })
  fetchClothesCategoryData?: () => void;

  @Action('fetchReminderByUser', { namespace: STORE_REMINDER })
  fetchReminderByUser?: (userId: number) => void;

  @State('id', { namespace: STORE_USER })
  userId?: number;

  mounted() {
    if (this.fetchGenderData) {
      this.fetchGenderData();
    }
    if (this.fetchClothesCategoryData) {
      this.fetchClothesCategoryData();
    }
    if (this.userId && this.fetchReminderByUser) {
      this.fetchReminderByUser(this.userId);
    }
  }
}
</script>
