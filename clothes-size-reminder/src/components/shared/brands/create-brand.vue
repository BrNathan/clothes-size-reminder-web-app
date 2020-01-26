<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <slot name="button">
          <v-btn color="primary" dark>
            Create new Brand
          </v-btn>
        </slot>
      </div>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">
            New brand
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Name*"
                required
                v-model="brandName">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Corporate name*"
                  hint="It can be same than the Name"
                  required
                  @focus="focusCorporate"
                  v-model="brandCorporateName">
              </v-text-field>
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
import TableHeader from '@/utils/types/table-header';
import { INewBrand } from '@/utils/types/brand';
import { BRAND_CREATE } from '@/utils/api-endpoints';

@Component({
  components: {},
})
export default class CreateBrand extends Vue {
    public dialog: boolean = false;

    public isLoading: boolean = false;

    public brandName: string = '';

    public brandCorporateName: string = '';

    private newBrand!: INewBrand;

    private isBrandCorporateNameFocus: boolean = false;

    @Watch('brandName')
    public onBrandNameChange() {
      if (!this.isBrandCorporateNameFocus) {
        this.brandCorporateName = this.brandName;
      }
    }

    public focusCorporate() {
      this.isBrandCorporateNameFocus = true;
    }

    public save() {
      this.isLoading = true;
      this.newBrand = {
        name: this.brandName,
        corporateName: this.brandCorporateName,
        isValidated: true,
      };
      Axios.post(BRAND_CREATE, this.newBrand)
        .then((result) => {
          // console.log(result);
          this.$emit('brand-created');
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
      this.brandName = '';
      this.brandCorporateName = '';
    }
}
</script>

<style lang="scss" scoped>
</style>
