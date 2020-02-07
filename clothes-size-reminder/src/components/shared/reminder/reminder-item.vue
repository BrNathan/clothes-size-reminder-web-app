<template>
  <v-card
    max-width="400"
  >
    <v-row>
      <v-col cols="12">
        <v-card-title>
          {{getClothesLabel(reminder.clothesSize.clothesId)}}
        </v-card-title>

        <!-- <v-card-subtitle class="pb-0">
        </v-card-subtitle> -->

        <v-card-text class="text--primary">
          <div>
            <span>{{getBrandLabel(reminder.brandId)}}</span>
            <span class="separator">|</span>
            <span>{{getSizeLabel(reminder.clothesSize.sizeId)}}</span>
          </div>
        </v-card-text>
      </v-col>
    </v-row>

    <v-card-actions>
      <v-spacer></v-spacer>
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
</template>

<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { IReminderExtended } from '../../../utils/types/reminder';
import { STORE_REFERENTIAL } from '@/store/namespace';
import ISize from '@/utils/types/size';
import { IClothes } from '@/utils/types/clothes';
import { IBrand } from '@/utils/types/brand';

@Component({
  components: {},
})
export default class ReminderItem extends Vue {
  @Prop({ required: true }) public reminder!: IReminderExtended;

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

<style lang="scss" scoped>
</style>
