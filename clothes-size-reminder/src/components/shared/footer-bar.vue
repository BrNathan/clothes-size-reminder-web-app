
<template>
  <v-footer app inset absolute>
    <div>Footer</div>
    <v-spacer></v-spacer>
    <div>
      <span>{{ new Date().getFullYear() }} — <strong>{{appName}}</strong></span>
      <span class="separator">|</span>
      <span>{{appVersion}}</span>
    </div>
  </v-footer>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { StringStore } from '../../store/types';
import BaseComponent from '../../utils/base-component';

@Component({
  components: {},
})
export default class FooterBar extends BaseComponent {
  @State('version') appVersion : StringStore;

  @State('name') appName : StringStore;
}
</script>

<style lang="scss" scoped>
.separator {
  padding-left: 4px;
  padding-right: 4px;
}
</style>
