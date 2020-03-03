<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <slot name="button">
          <v-btn color="primary" dark>
            Update Reminder
          </v-btn>
        </slot>
      </div>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">
          Update reminder
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                :items="clothesList"
                label="Clothes*"
                item-value="id"
                item-text="label"
                v-model="reminder.clothesSize.clothesId"
                required
                autocomplete="off"
                :persistent-hint="persistHint"
                hint="Click on icon to add new clothes"
                no-data-text="No data - Click on icon to add new clothes"
              >
                <template v-slot:append-outer>
                  <create-clothes>
                    <template v-slot:button>
                      <v-icon
                      class="cursor-pointer"
                      title="new clothes">mdi-plus-circle-outline</v-icon>
                    </template>
                  </create-clothes>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                :items="brandsList"
                label="Brand*"
                item-value="id"
                item-text="name"
                v-model="reminder.brandId"
                required
                autocomplete="off"
                :persistent-hint="persistHint"
                hint="Click on icon to add new brand"
                no-data-text="No data - Click on icon to add new brand"
              >
                <template v-slot:append-outer>
                  <create-brand>
                    <template v-slot:button>
                      <v-icon
                      class="cursor-pointer"
                      title="new brand">mdi-plus-circle-outline</v-icon>
                    </template>
                  </create-brand>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                :items="sizesList"
                label="Size*"
                item-value="id"
                item-text="label"
                v-model="reminder.clothesSize.sizeId"
                required
                autocomplete="off"
                :persistent-hint="persistHint"
                hint="Click on icon to add new size"
                no-data-text="No data - Click on icon to add new size"
              >
                <template v-slot:append-outer>
                  <create-size>
                    <template v-slot:button>
                      <v-icon
                      class="cursor-pointer"
                      title="new size">mdi-plus-circle-outline</v-icon>
                    </template>
                  </create-size>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Comment"
                v-model="reminder.comments"
                counter
                :rules="commentsRules"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="update" :loading="isLoading">
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-property-decorator';
import Axios, { AxiosResponse } from 'axios';
import { State, Getter, Mutation } from 'vuex-class';
import { IReminder, IReminderExtended, INewReminderExtended } from '@/utils/types/reminder';
import { IBrand } from '../../../utils/types/brand';
import { IClothes } from '../../../utils/types/clothes';
import { ISize } from '../../../utils/types/size';
import {
  STORE_USER, STORE_REFERENTIAL, STORE_REMINDER, STORE_TOASTR,
} from '@/store/namespace';
import CreateBrand from '../brands/create-brand.vue';
import CreateClothes from '../clothes/create-clothes.vue';
import CreateSize from '../sizes/create-size.vue';
import { REMINDER_CREATE_EXTEND, REMINDER_UPDATE_EXTEND } from '@/utils/api-endpoints';
import { ERROR_UPDATE_REMINDER } from '../../../utils/error-messages';

@Component({
  components: {
    'create-brand': CreateBrand,
    'create-clothes': CreateClothes,
    'create-size': CreateSize,
  },
})
export default class CreateReminder extends Vue {
  @Mutation('addReminder', { namespace: STORE_REMINDER })
  public addReminderToStore!: (reminder: IReminderExtended) => void;

  @Mutation('updateReminder', { namespace: STORE_REMINDER })
  public updateReminderInStore!: (reminder: IReminderExtended) => void;

  @Mutation('displayErrorMessage', { namespace: STORE_TOASTR })
  displayErrorMessage!: (message: string) => void;

  @Mutation('displayInfoMessage', { namespace: STORE_TOASTR })
  displayInfoMessage!: (message: string) => void;

  @Prop({ required: true })
  public reminder!: IReminderExtended;

  @State('id', { namespace: STORE_USER })
  private userId!: number;

  @Getter('getBrands', { namespace: STORE_REFERENTIAL })
  public brandsList!: IBrand[];

  @Getter('getClothes', { namespace: STORE_REFERENTIAL })
  public clothesList!: IClothes[];

  @Getter('getSizes', { namespace: STORE_REFERENTIAL })
  public sizesList!: ISize[];

  public readonly persistHint: boolean = true;

  public dialog: boolean = false;

  public isLoading: boolean = false;

  private readonly maxCommentsLength: number = 100;

  public commentsRules: any[] = [
    (v: string) => v.length <= this.maxCommentsLength || `Max ${this.maxCommentsLength} characters`,
  ];

  public brandId: number | null = null;

  public clothesId: number | null = null;

  public sizeId: number | null = null;

  public comments: string = '';

  public updatedReminder!: IReminderExtended;

  public update() {
    this.isLoading = true;
    this.updatedReminder = {
      id: this.reminder.id,
      userId: this.userId,
      brandId: this.reminder.brandId,
      clothesSize: {
        clothesId: this.reminder.clothesSize.clothesId,
        sizeId: this.reminder.clothesSize.sizeId,
      },
      comments: this.reminder.comments,
      creationDate: this.reminder.creationDate,
    };
    Axios.put<IReminderExtended, AxiosResponse<IReminderExtended>>(
      `${REMINDER_UPDATE_EXTEND}/${this.updatedReminder.id}`, this.updatedReminder,
    )
      .then((result) => {
        this.displayInfoMessage('Reminder updated'); // TODO ERROR MESSAGE
        result.data.creationDate = new Date(result.data.creationDate);
        this.$emit('reminder-update', result.data);
        this.closeDialog();
      })
      .catch((error) => {
        this.displayErrorMessage(ERROR_UPDATE_REMINDER);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  public closeDialog(): void {
    this.dialog = false;
    this.isLoading = false;
    this.brandId = null;
    this.sizeId = null;
    this.clothesId = null;
    this.comments = '';
    this.updatedReminder = {} as IReminderExtended;
  }
}
</script>

<style lang="scss" scoped>
</style>
