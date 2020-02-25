<template>
  <div id="home">
    <h1>Home Page</h1>
    <h2>{{appName}}
      <span class="separator">|</span>
      {{appVersion}}
    </h2>
    <ul>
      <li>
        <router-link :to="{name: 'admin'}">Go to Admin</router-link>
      </li>
      <li>
        <router-link :to="{name: 'myReminders'}">Go to My reminder</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import { StringStore } from '../../store/types';

@Component({
  components: {},
})
export default class Home extends Vue {
  @State('version') appVersion: StringStore;

  @State('name') appName: StringStore;
}
</script>
