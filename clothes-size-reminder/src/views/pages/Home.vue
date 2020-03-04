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
    <v-btn color="primary" @click="addMessagePrimary">Test Add toastr</v-btn>
    <v-btn color="warning" @click="addMessageWarning">Test Add toastr</v-btn>
    <v-btn color="error" @click="addMessageError">Test Add toastr</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation } from 'vuex-class';
import { StringStore } from '../../store/types';
import { STORE_TOASTR } from '../../store/namespace';
import BaseComponent from '@/utils/base-component';

@Component({
  components: {},
})
export default class Home extends BaseComponent {
  @State('version') appVersion: StringStore;

  @State('name') appName: StringStore;

  public count: number = 0;

  public addMessageError(): void {
    this.displayErrorMessage(`Test msg #${this.count} error`);
    this.count += 1;
  }

  public addMessagePrimary(): void {
    this.displayInfoMessage(`Test msg #${this.count} info`);
    this.count += 1;
  }

  public addMessageWarning(): void {
    this.displayWarningMessage(`Test msg #${this.count} warning`);
    this.count += 1;
  }
}
</script>
