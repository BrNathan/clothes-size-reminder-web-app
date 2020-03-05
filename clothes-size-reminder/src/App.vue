<template>
  <v-app>
    <router-view name="topNavBar"></router-view>
    <router-view name="sideBar"></router-view>
    <v-content>
      <v-container fluid>
        <template v-if="isReferentialLoading">
          <router-view></router-view>
        </template>
        <template v-else>
          <v-skeleton-loader type="article"></v-skeleton-loader>
        </template>
      </v-container>
    </v-content>
    <router-view name="footerBar"></router-view>
    <toast-message></toast-message>
  </v-app>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Action, State, Getter } from 'vuex-class';
import {
  STORE_REFERENTIAL,
  STORE_REMINDER,
  STORE_USER,
} from '@/store/namespace';
import ToastMessage from './components/toast-message.vue';
import BaseComponent from './utils/base-component';


@Component({
  name: 'App',
  components: {
    'toast-message': ToastMessage,
  },
})
export default class App extends BaseComponent {
  @Action('fetchGenderData', { namespace: STORE_REFERENTIAL })
  fetchGenderData?: () => void;

  @Action('fetchClothesCategoryData', { namespace: STORE_REFERENTIAL })
  fetchClothesCategoryData?: () => void;

  @Action('fetchSizeData', { namespace: STORE_REFERENTIAL })
  fetchSizeData?: () => void;

  @Action('fetchReminderByUser', { namespace: STORE_REMINDER })
  fetchReminderByUser?: (userId: number) => void;

  @Action('fetchClothesData', { namespace: STORE_REFERENTIAL })
  fetchClothesData?: () => void;

  @Action('fetchBrandData', { namespace: STORE_REFERENTIAL })
  fetchBrandData?: () => void;

  @Getter('isReady', { namespace: STORE_REFERENTIAL })
  isReady?: boolean;

  @State('id', { namespace: STORE_USER })
  userId?: number;

  public get isReferentialLoading(): boolean {
    return !!this.isReady;
  }

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
    if (this.fetchSizeData) {
      this.fetchSizeData();
    }
    if (this.fetchClothesData) {
      this.fetchClothesData();
    }
    if (this.fetchBrandData) {
      this.fetchBrandData();
    }
  }
}
</script>

<style lang="scss">
.separator {
  margin: 0 10px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
