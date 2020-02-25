<template>
  <v-navigation-drawer app clipped expand-on-hover permanent>
    <template v-slot:prepend>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link two-line>
          <v-list-item-content>
            <v-list-item-title class="title">Sandra Adams</v-list-item-title>
            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </template>

    <v-divider></v-divider>

    <v-list nav dense>
      <template v-for="(menu, index) in sidebarMenuItem">
        <template v-if="menu.child && menu.child.length > 0">
          <v-list-group :key="index"
            :prepend-icon="menu.icon"
            v-model="menu.isExpanded"
            value="true"
          >
            <template v-slot:activator>
              <v-list-item-title>{{menu.title}}</v-list-item-title>
            </template>
            <v-list-item
              v-for="(child, indexChild) in menu.child" :key="indexChild"
              :to="{name: child.pathName}"
              exact
              color="primary"
            >
              <v-list-item-icon>
                <v-icon>{{child.icon}}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{child.title}}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </template>
        <template v-else>
          <v-list-item
            :to="{name: menu.pathName}" :key="index"
            color="primary"
            exact
          >
            <v-list-item-icon>
              <v-icon>{{menu.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{menu.title}}</v-list-item-title>
          </v-list-item>
        </template>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ISidebarItem from '@/utils/types/sidebar-item';

@Component({
  components: {},
})
export default class SideBar extends Vue {
  public sidebarMenuItem: ISidebarItem[] = [
    {
      title: 'Home',
      icon: 'mdi-home',
      pathName: 'home',
    },
    {
      title: 'My Reminders',
      icon: 'mdi-brain',
      pathName: 'myReminders',
    },
    {
      title: 'Administration',
      icon: 'mdi-tune',
      pathName: 'admin',
    },
  ];
}
</script>

<style lang="scss" scoped>
</style>
