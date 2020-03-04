<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <slot name="button">
          <v-btn color="primary" dark>
            Create new Reminder
          </v-btn>
        </slot>
      </div>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">
            New reminder
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
                v-model="clothesId"
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
                v-model="brandId"
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
                v-model="sizeId"
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
                v-model="comment"
                counter
                :rules="commentRules"
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
        <v-btn color="blue darken-1" text @click="save" :loading="isLoading">
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  Component, Vue,
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
import { REMINDER_CREATE_EXTEND } from '@/utils/api-endpoints';
import { ERROR_CREATE_REMINDER } from '../../../utils/error-messages';
import BaseComponent from '../../../utils/base-component';

@Component({
  components: {
    'create-brand': CreateBrand,
    'create-clothes': CreateClothes,
    'create-size': CreateSize,
  },
})
export default class CreateReminder extends BaseComponent {
  @Mutation('addReminder', { namespace: STORE_REMINDER })
  public addReminderToStore!: (reminder: IReminderExtended) => void;

  @Getter('getBrands', { namespace: STORE_REFERENTIAL })
  public brandsList!: IBrand[];

  @Getter('getClothes', { namespace: STORE_REFERENTIAL })
  public clothesList!: IClothes[];

  @Getter('getSizes', { namespace: STORE_REFERENTIAL })
  public sizesList!: ISize[];

  @State('id', { namespace: STORE_USER })
  private userId!: number;

  public readonly persistHint: boolean = true;

  public dialog: boolean = false;

  public isLoading: boolean = false;

  private readonly maxCommentLength: number = 100;

  public commentRules: any[] = [
    (v: string) => v.length <= this.maxCommentLength || `Max ${this.maxCommentLength} characters`,
  ];

  public brandId: number | null = null;

  public clothesId: number | null = null;

  public sizeId: number | null = null;

  public comment: string = '';

  public newReminder!: INewReminderExtended;

  public getBrandName(brandId: number): string {
    if (this.brandsList) {
      const brand: IBrand | undefined = this.brandsList.find(b => b.id === brandId);
      if (brand) {
        return brand.name;
      }
    }
    return '';
  }

  public getClothesLabel(clothesId: number): string {
    if (this.clothesList) {
      const clothes: IClothes | undefined = this.clothesList.find(c => c.id === clothesId);
      if (clothes) {
        return clothes.label;
      }
    }
    return '';
  }

  public getSizeCode(sizeId: number): string {
    if (this.sizesList) {
      const size: ISize | undefined = this.sizesList.find(s => s.id === sizeId);
      if (size) {
        return size.code;
      }
    }
    return '';
  }

  public save() {
    this.isLoading = true;
    if (this.brandId
    && this.clothesId
    && this.sizeId) {
      this.newReminder = {
        userId: this.userId,
        brandId: this.brandId,
        clothesSize: {
          clothesId: this.clothesId,
          sizeId: this.sizeId,
        },
        comments: this.comment,
      };
      Axios.post<INewReminderExtended, AxiosResponse<IReminderExtended>>(
        REMINDER_CREATE_EXTEND, this.newReminder,
      )
        .then((result) => {
          this.displayInfoMessage(`Reminder :
            ${this.getBrandName(this.newReminder.brandId)} | 
            ${this.getClothesLabel(this.newReminder.clothesSize.clothesId)} | 
            ${this.getSizeCode(this.newReminder.clothesSize.sizeId)} created`); // TODO ERROR MESSAGE
          this.$emit('reminder-created');
          result.data.creationDate = new Date(result.data.creationDate);
          this.addReminderToStore(result.data);
          this.closeDialog();
        })
        .catch((error) => {
          this.displayErrorMessage(ERROR_CREATE_REMINDER);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }

  public closeDialog(): void {
    this.dialog = false;
    this.isLoading = false;
    this.brandId = null;
    this.sizeId = null;
    this.clothesId = null;
    this.comment = '';
    this.newReminder = {} as IReminderExtended;
  }
}
</script>

<style lang="scss" scoped>
</style>
