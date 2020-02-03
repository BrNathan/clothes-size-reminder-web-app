<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <span v-on="on" title="update">
          <slot name="button">
            <v-btn color="error" dark>
              Update Clothes
            </v-btn>
          </slot>
        </span>
      </template>
      <v-card>
        <v-card-title>Update clothes</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Code*"
                  required
                  v-model="clothesToUpdate.code"
                  disabled="true">
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Clothes name*"
                    required
                    v-model="clothesToUpdate.label">
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="genders"
                  label="Gender*"
                  item-value="id"
                  item-text="label"
                  v-model="clothesToUpdate.genderId"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  :items="clothesCategories"
                  item-text="label"
                  item-value="id"
                  label="Clothes category*"
                  v-model="clothesToUpdate.clothesCategoryId"
                  required
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDialog">
            Cancel
          </v-btn>
          <v-btn color="primary darken-1" text @click="updateClothes" :loading="isLoading">
            Update
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
import { IClothes } from '@/utils/types/clothes';
import { CLOTHES_UPDATE } from '@/utils/api-endpoints';
import { STORE_REFERENTIAL } from '@/store/namespace';
import { IGender } from '@/utils/types/gender';
import IClothesCategory from '@/utils/types/clothes-category';

@Component({
  components: {},
})
export default class UpdateClothes extends Vue {
  @Getter('genders', { namespace: STORE_REFERENTIAL }) genderReferential?: IGender[];

  @Getter('clothescategories', { namespace: STORE_REFERENTIAL }) clothescategoriesReferential?: IClothesCategory[];

  public dialog: boolean = false;

  public isLoading: boolean = false;

  @Prop({ required: true }) public clothesToUpdate!: IClothes;

  public closeDialog(): void {
    this.dialog = false;
    this.isLoading = false;
  }

  public updateClothes() {
    this.isLoading = true;
    this.clothesToUpdate.code = this.clothesToUpdate.code.toUpperCase();

    const url: string = `${CLOTHES_UPDATE}/${this.clothesToUpdate.id}`;
    Axios.put(url, this.clothesToUpdate)
      .then((result) => {
        this.$emit('clothes-update', this.clothesToUpdate);
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

  public get genders(): IGender[] {
    return this.genderReferential ? this.genderReferential : [];
  }

  public get clothesCategories(): IClothesCategory[] {
    return this.clothescategoriesReferential ? this.clothescategoriesReferential : [];
  }
}
</script>

<style lang="scss" scoped>
</style>
