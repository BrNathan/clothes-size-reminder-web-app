
<template>
  <v-footer app inset>
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
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import { StringStore } from '../../store/types';

@Component({
  components: {},
})
export default class FooterBar extends Vue {
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
