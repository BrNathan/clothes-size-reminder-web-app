<template>
  <div id="admin">
    <v-card>
        <v-card-Title class="text-center justify-center">
            <h1>Admin</h1>
        </v-card-Title>
        <v-tabs grow v-model="activeTabs" class="mb-4">
            <v-tab v-for="(tab, index) in tabs" :key="index" :to="{name: tab.PathName}">
                {{tab.Title}}
            </v-tab>
        </v-tabs>
        <router-view></router-view>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface Tabs {
    Title: string;
    PathName: string;
}

@Component({
  components: {},
})
export default class Admin extends Vue {
    public activeTabs: number = -1;

    public tabs: Tabs[] = [{
      Title: 'Brands',
      PathName: 'AdminBrands',
    },
    {
      Title: 'Users',
      PathName: 'AdminUsers',
    },
    {
      Title: 'Clothes',
      PathName: 'AdminClothes',
    },
    ];
}
</script>
