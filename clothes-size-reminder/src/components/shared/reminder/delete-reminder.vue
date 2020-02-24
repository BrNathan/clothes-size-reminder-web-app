<template>
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <span v-on="on" title="delete">
          <slot name="button">
            <v-btn color="error" dark>
              Delete Reminder
            </v-btn>
          </slot>
        </span>
      </template>
      <v-card>
        <v-card-title>Warning</v-card-title>
        <v-card-text>
          <span>Do you confirm to delete the reminder ?</span>
          <div>
            <span class="font-weight-bold">
              {{getClothesLabel(reminderToDelete.clothesSize.clothesId)}}
            </span>
            <span class="separator">|</span>
            <span>
              {{getBrandLabel(reminderToDelete.brandId)}}
            </span>
            <span class="separator">|</span>
            <span class="font-weight-bold">
              {{getSizeLabel(reminderToDelete.clothesSize.sizeId)}}
            </span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDialog">
            Cancel
          </v-btn>
          <v-btn color="error darken-1" text @click="deleteReminder" :loading="isLoading">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import Axios from 'axios';
import { Getter } from 'vuex-class';
import { IReminderExtended } from '@/utils/types/reminder';
import { REMINDER_DELETE } from '@/utils/api-endpoints';
import { STORE_REFERENTIAL } from '@/store/namespace';
import { ISize } from '@/utils/types/size';
import { IClothes } from '@/utils/types/clothes';
import { IBrand } from '@/utils/types/brand';

@Component({
  components: {},
})
export default class DeleteReminder extends Vue {
  public dialog: boolean = false;

  public isLoading: boolean = false;

  @Prop({ required: true })
  public reminderToDelete!: IReminderExtended;

  @Getter('sizeById', { namespace: STORE_REFERENTIAL })
  sizeById?: (sizeId: number) => ISize;

  @Getter('clothesById', { namespace: STORE_REFERENTIAL })
  clothesById?: (sizeId: number) => IClothes;

  @Getter('brandById', { namespace: STORE_REFERENTIAL })
  brandById?: (brandId: number) => IBrand;

  public closeDialog(): void {
    this.dialog = false;
    this.isLoading = false;
  }

  public deleteReminder() {
    this.isLoading = true;

    const url: string = `${REMINDER_DELETE}/${this.reminderToDelete.id}`;
    Axios.delete(url)
      .then((result) => {
        this.$emit('reminder-delete', this.reminderToDelete);
        this.closeDialog();
      })
      .catch((error) => {
        // console.error(error);
        // debugger;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

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
