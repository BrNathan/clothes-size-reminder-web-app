<template>
  <v-app-bar app color="primary" dark clipped-left>
    <router-link :to="{name: 'home'}">
      <div class="d-flex align-center top-navbar-tilte">
        <v-icon x-large>mdi-brain</v-icon>
        <span class="separator"></span>
        <h1 class="display-1 font-italic font-weight-bold">Ryclos</h1>
        <span class="title font-italic font-weight-bold separator">-</span>
        <h1 class="title font-italic">Reminder your Clothes Size</h1>
      </div>
    </router-link>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class TopNavBar extends Vue {}
</script>

<style lang="scss" scoped>
.top-navbar-tilte {
  color: white;
}
</style>
