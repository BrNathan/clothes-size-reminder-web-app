<template>
  <div id="admin">
    <v-card>
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
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import BaseComponent from '../../utils/base-component';

interface Tabs {
    title: string;
    pathName: string;
    disabled: boolean;
}

@Component({
  components: {},
})
export default class Admin extends BaseComponent {
    public activeTabs: number = -1;

    public tabs: Tabs[] = [{
      title: 'Brands',
      pathName: 'AdminBrands',
      disabled: false,
    },
    {
      title: 'Users',
      pathName: 'AdminUsers',
      disabled: true,
    },
    {
      title: 'Clothes',
      pathName: 'AdminClothes',
      disabled: false,
    },
    ];
}
</script>
