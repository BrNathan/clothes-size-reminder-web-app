<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <span v-on="on" title="update">
          <slot name="button">
            <v-btn color="error" dark>
              Update Brand
            </v-btn>
          </slot>
        </span>
      </template>
      <v-card>
        <v-card-title>Update brand</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Name*"
                  required
                  v-model="brandToUpdate.name">
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Corporate name*"
                    hint="It can be same than the Name"
                    required
                    v-model="brandToUpdate.corporateName">
                </v-text-field>
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
          <v-btn color="primary darken-1" text @click="updateBrand" :loading="isLoading">
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
import { Mutation } from 'vuex-class';
import { IBrand } from '@/utils/types/brand';
import { BRAND_UPDATE } from '@/utils/api-endpoints';
import { STORE_TOASTR } from '@/store/namespace';
import { ERROR_UPDATE_BRAND } from '@/utils/error-messages';

@Component({
  components: {},
})
export default class UpdateBrand extends Vue {
  @Prop({ required: true })
  public brandToUpdate!: IBrand;

  @Mutation('displayErrorMessage', { namespace: STORE_TOASTR })
  displayErrorMessage!: (message: string) => void;

  @Mutation('displayInfoMessage', { namespace: STORE_TOASTR })
  displayInfoMessage!: (message: string) => void;

  public dialog: boolean = false;

  public isLoading: boolean = false;

  public closeDialog(): void {
    this.dialog = false;
    this.isLoading = false;
  }

  public updateBrand() {
    this.isLoading = true;

    const url: string = `${BRAND_UPDATE}/${this.brandToUpdate.id}`;
    Axios.put(url, this.brandToUpdate)
      .then((result) => {
        this.displayInfoMessage(`${this.brandToUpdate.name} updated`); // TODO ERROR MESSAGE
        this.$emit('brand-update', this.brandToUpdate);
        this.closeDialog();
      })
      .catch((error) => {
        this.displayErrorMessage(ERROR_UPDATE_BRAND);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
</style>
