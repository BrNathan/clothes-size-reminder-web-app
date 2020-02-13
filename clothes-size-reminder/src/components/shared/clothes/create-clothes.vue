<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <slot name="button">
          <v-btn color="primary" dark>
            Create new Clothes
          </v-btn>
        </slot>
      </div>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">
            New clothes
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Code*"
                required
                v-model="clothesCode"
                :disabled="!isAdminMode"
                >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Name*"
                  required
                  v-model="clothesLabel">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                :items="genders"
                label="Genders*"
                item-value="id"
                item-text="label"
                v-model="clothesGenderId"
                required
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                :items="clothesCategories"
                item-text="label"
                item-value="id"
                label="Clothes category*"
                v-model="clothesCategoryId"
                required
              ></v-autocomplete>
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
          Save
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
import { Getter, Mutation } from 'vuex-class';
import TableHeader from '@/utils/types/table-header';
import { INewClothes, IClothes } from '@/utils/types/clothes';
import { CLOTHES_CREATE } from '@/utils/api-endpoints';
import { STORE_REFERENTIAL } from '@/store/namespace';
import { IGender } from '@/utils/types/gender';
import IClothesCategory from '../../../utils/types/clothes-category';

@Component({
  components: {},
})
export default class CreateClothes extends Vue {
    @Mutation('addClothes', { namespace: STORE_REFERENTIAL })
    public addClothesToStore!: (size: IClothes) => void;

    @Prop({ required: false, default: false })
    public isAdminMode!: boolean;

    @Getter('genders', { namespace: STORE_REFERENTIAL })
    public genderReferential?: IGender[];

    @Getter('clothescategories', { namespace: STORE_REFERENTIAL })
    public clothescategoriesReferential?: IClothesCategory[];

    private maxClothesCodeLength: number = 45;

    public dialog: boolean = false;

    public isLoading: boolean = false;

    public clothesCode: string = '';

    public clothesLabel: string = '';

    public clothesGenderId: number = 0;

    public clothesCategoryId: number = 0;

    private newClothes!: INewClothes;

    public get genders(): IGender[] {
      return this.genderReferential ? this.genderReferential : [];
    }

    public get clothesCategories(): IClothesCategory[] {
      return this.clothescategoriesReferential ? this.clothescategoriesReferential : [];
    }

    public save() {
      this.isLoading = true;
      this.newClothes = {
        code: this.clothesCode,
        label: this.clothesLabel,
        clothesCategoryId: this.clothesCategoryId,
        genderId: this.clothesGenderId,
      };
      Axios.post(CLOTHES_CREATE, this.newClothes)
        .then((result) => {
          // console.log(result);
          this.$emit('clothes-created');
          this.addClothesToStore(result.data);
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

    public closeDialog(): void {
      this.dialog = false;
      this.isLoading = false;
      this.clothesCode = '';
      this.clothesLabel = '';
      this.clothesGenderId = 0;
      this.clothesCategoryId = 0;
    }

    @Watch('clothesCode')
    public onClothesCodeChange(): void {
      this.clothesCode = this.clothesCode.toUpperCase();
    }

    @Watch('clothesLabel')
    public onClothesLabelChange(): void {
      const futureCode: string = this.clothesLabel.replace(/[^a-z|A-Z]/g, '_');
      if (!this.isAdminMode && (futureCode.length < this.maxClothesCodeLength)) {
        this.clothesCode = futureCode.toUpperCase();
      }
    }
}
</script>

<style lang="scss" scoped>
</style>
