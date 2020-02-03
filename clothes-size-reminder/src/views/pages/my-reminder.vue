<template>
  <div id="my-reminder">
    <h1>My Reminder</h1>
    <v-row>
      <!-- <v-spacer></v-spacer> -->
      <template v-for="reminder in reminders">
        <v-col
          :key="reminder.id"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card
            class="mx-auto"
            max-width="400"
          >
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title>
                {{getClothesLabel(reminder.clothesSize.clothesId)}}
              </v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>Whitehaven Beach</div>

              <div>{{getSizeLabel(reminder.clothesSize.sizeId)}}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="primary"
                text
                disabled="disabled"
              >
                Update
              </v-btn>

              <v-btn
                color="warning"
                text
                disabled="disabled"
              >
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </template>
    </v-row>
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
import { State, Getter } from 'vuex-class';
import { STORE_REMINDER, STORE_REFERENTIAL } from '../../store/namespace';
import { IReminderExtended } from '../../utils/types/reminder';
import ISize from '@/utils/types/size';
import { IClothes } from '../../utils/types/clothes';

@Component({
  components: {},
})
export default class MyReminder extends Vue {
  @State('reminder', { namespace: STORE_REMINDER }) reminders?: IReminderExtended[];

  @Getter('sizeById', { namespace: STORE_REFERENTIAL }) sizeById?: (sizeId: number) => ISize;

  @Getter('clothesById', { namespace: STORE_REFERENTIAL }) clothesById?: (sizeId: number) => IClothes;

  public getSizeLabel(sizeId: number): string {
    return this.sizeById ? this.sizeById(sizeId).label : '';
  }

  public getClothesLabel(clothesId: number): string {
    return this.clothesById ? this.clothesById(clothesId).label : '';
  }
}
</script>
