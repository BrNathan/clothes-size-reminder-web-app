<template>
  <v-card
    max-width="400"
  >
    <v-row>
      <v-col cols="12">
        <v-card-title>
          <div>
            {{getClothesLabel(reminder.clothesSize.clothesId)}}
          </div>
        </v-card-title>

        <v-card-text class="text--primary">
          <div>
            <span>{{getBrandLabel(reminder.brandId)}}</span>
            <span class="separator">|</span>
            <span class="font-weight-bold">{{getSizeLabel(reminder.clothesSize.sizeId)}}</span>
          </div>
        </v-card-text>
      </v-col>
    </v-row>

    <v-card-actions>
      <update-reminder :reminder="{...reminder}" v-on:reminder-update="reminderUpdated">
        <template v-slot:button>
          <v-btn color="primary" text>
            Update
          </v-btn>
        </template>
      </update-reminder>

      <delete-reminder :reminderToDelete="{...reminder}" v-on:reminder-delete="reminderDeleted">
        <template v-slot:button>
          <v-btn color="warning" text>
            Delete
          </v-btn>
        </template>
      </delete-reminder>
      <!-- <v-btn
        color="warning"
        text
        disabled="disabled"
      >
        Delete
      </v-btn> -->
      <v-spacer></v-spacer>
      <v-btn
        v-if="hasComments"
        icon
        @click="showComments = !showComments"
      >
        <v-icon>{{ showComments ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="showComments">
        <v-divider></v-divider>
        <v-card-text>
          {{reminder.comments}}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-property-decorator';
import { Getter, Action, State } from 'vuex-class';
import { IReminderExtended } from '../../../utils/types/reminder';
import { STORE_REFERENTIAL, STORE_REMINDER, STORE_USER } from '@/store/namespace';
import { ISize } from '@/utils/types/size';
import { IClothes } from '@/utils/types/clothes';
import { IBrand } from '@/utils/types/brand';
import UpdateReminder from './update-reminder.vue';
import DeleteReminder from './delete-reminder.vue';

@Component({
  components: {
    'update-reminder': UpdateReminder,
    'delete-reminder': DeleteReminder,
  },
})
export default class ReminderItem extends Vue {
  @Prop({ required: true }) public reminder!: IReminderExtended;

  @Getter('sizeById', { namespace: STORE_REFERENTIAL }) sizeById?: (sizeId: number) => ISize;

  @Getter('clothesById', { namespace: STORE_REFERENTIAL }) clothesById?: (sizeId: number) => IClothes;

  @Getter('brandById', { namespace: STORE_REFERENTIAL }) brandById?: (brandId: number) => IBrand;

  @Action('fetchReminderByUser', { namespace: STORE_REMINDER })
  fetchReminderByUser?: (userId: number) => void;

  @State('id', { namespace: STORE_USER })
  userId?: number;

  public showComments: boolean = false;

  public get hasComments(): boolean {
    return this.reminder
    && this.reminder.comments !== null
    && this.reminder.comments !== undefined
    && this.reminder.comments.length > 0;
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

  public displayCreationDate(): string {
    return this.reminder.creationDate.getMonth().toString();
  }

  public reminderUpdated(reminderUpdated: IReminderExtended): void {
    if (this.userId && this.fetchReminderByUser) {
      this.fetchReminderByUser(this.userId);
    }
  }

  public reminderDeleted(reminderDeleted: IReminderExtended): void {
    if (this.userId && this.fetchReminderByUser) {
      this.fetchReminderByUser(this.userId);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
