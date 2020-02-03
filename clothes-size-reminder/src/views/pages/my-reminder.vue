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
            <!-- <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
            </v-img> -->
            <v-card-title>
              {{getClothesLabel(reminder.clothesSize.clothesId)}}
            </v-card-title>

            <v-card-subtitle class="pb-0">
              {{getBrandLabel(reminder.brandId)}}
            </v-card-subtitle>

            <v-card-text class="text--primary">
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
import { IBrand } from '../../utils/types/brand';

@Component({
  components: {},
})
export default class MyReminder extends Vue {
  @State('reminder', { namespace: STORE_REMINDER }) reminders?: IReminderExtended[];

  @Getter('sizeById', { namespace: STORE_REFERENTIAL }) sizeById?: (sizeId: number) => ISize;

  @Getter('clothesById', { namespace: STORE_REFERENTIAL }) clothesById?: (sizeId: number) => IClothes;

  @Getter('brandById', { namespace: STORE_REFERENTIAL }) brandById?: (brandId: number) => IBrand;

  public getSizeLabel(sizeId: number): string {
    return this.sizeById ? this.sizeById(sizeId).label : '';
  }

  public getClothesLabel(clothesId: number): string {
    return this.clothesById ? this.clothesById(clothesId).label : '';
  }

  public getBrandLabel(brandId: number): string {
    return this.brandById ? this.brandById(brandId).name : '';
  }
}
</script>
