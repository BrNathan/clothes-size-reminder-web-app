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
                :items="brandsList"
                label="Brand*"
                item-value="id"
                item-text="name"
                v-model="brand"
                required
                autocomplete="off"
                persistent-hint="true"
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
                :items="clothesList"
                label="Clothes*"
                item-value="id"
                item-text="label"
                v-model="clothes"
                required
                autocomplete="off"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                :items="sizesList"
                label="Size*"
                item-value="id"
                item-text="label"
                v-model="size"
                required
                autocomplete="off"
              ></v-autocomplete>
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
import Axios from 'axios';
import { State, Getter } from 'vuex-class';
import { IReminder, IReminderExtended } from '@/utils/types/reminder';
import { IBrand } from '../../../utils/types/brand';
import { IClothes } from '../../../utils/types/clothes';
import ISize from '../../../utils/types/size';
import { STORE_USER, STORE_REFERENTIAL } from '@/store/namespace';
import CreateBrand from '../brands/create-brand.vue';

@Component({
  components: {
    'create-brand': CreateBrand,
  },
})
export default class CreateReminder extends Vue {
  public dialog: boolean = false;

  public isLoading: boolean = false;

  private readonly maxCommentLength: number = 100;

  @State('id', { namespace: STORE_USER })
  private userId!: number;

  public commentRules: any[] = [
    (v: string) => v.length <= this.maxCommentLength || `Max ${this.maxCommentLength} characters`,
  ];

  @Getter('getBrands', { namespace: STORE_REFERENTIAL })
  public brandsList!: IBrand[];

  @Getter('getClothes', { namespace: STORE_REFERENTIAL })
  public clothesList!: IClothes[];

  @Getter('getSizes', { namespace: STORE_REFERENTIAL })
  public sizesList!: ISize[];

  public errorTextarea: any = 0;

  public brand: IBrand | null = null;

  public clothes: IClothes | null = null;

  public size: ISize | null = null;

  public comment: string = '';

  public save() {
    this.isLoading = true;
    // this.newClothes = {
    //   code: this.clothesCode,
    //   label: this.clothesLabel,
    //   clothesCategoryId: this.clothesCategoryId,
    //   genderId: this.clothesGenderId,
    // };
    // Axios.post(CLOTHES_CREATE, this.newClothes)
    //   .then((result) => {
    //     // console.log(result);
    //     this.$emit('clothes-created');
    //     this.closeDialog();
    //   })
    //   .catch((error) => {
    //     // console.error(error);
    //     // debugger;
    //   })
    //   .finally(() => {
    //     this.isLoading = false;
    //   });
  }

  public closeDialog(): void {
    this.dialog = false;
    this.isLoading = false;
  }
}
</script>

<style lang="scss" scoped>
</style>
