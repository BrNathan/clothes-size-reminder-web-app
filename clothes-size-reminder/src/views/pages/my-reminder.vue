<template>
  <div id="my-reminder">
    <h1>My Reminder</h1>
    <!-- <v-card>
      <v-card-Title class="text-center justify-center">
        <h1>Admin</h1>
      </v-card-Title>
      <v-tabs grow v-model="activeTabs" class="mb-4">
        <template v-for="(tab, index) in tabs">
          <v-tab :key="index" :to="{name: tab.pathName}" :disabled="tab.disabled">
            {{tab.title}}
          </v-tab>
        </template>
      </v-tabs>
      <router-view></router-view>
    </v-card> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class MyReminder extends Vue {

}
</script>
