<template>
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <span v-on="on" title="delete">
          <slot name="button">
            <v-btn color="error" dark>
              Delete Brand
            </v-btn>
          </slot>
        </span>
      </template>
      <v-card>
        <v-card-title>Warning</v-card-title>
        <v-card-text>Do you confirm to delete the brand
           <span class="font-weight-black">"{{brandToDelete.name}}"</span> ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDialog">
            Cancel
          </v-btn>
          <v-btn color="error darken-1" text @click="deleteBrand" :loading="isLoading">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
import {
  Component, Prop,
} from 'vue-property-decorator';
import Axios from 'axios';
import { IBrand } from '@/utils/types/brand';
import { BRAND_DELETE } from '@/utils/api-endpoints';
import { ERROR_DELETE_BRAND } from '../../../utils/error-messages';
import BaseComponent from '../../../utils/base-component';

@Component({
  components: {},
})
export default class DeleteBrand extends BaseComponent {
  @Prop({ required: true })
  public brandToDelete!: IBrand;

  public dialog: boolean = false;

  public isLoading: boolean = false;

  public closeDialog(): void {
    this.dialog = false;
    this.isLoading = false;
  }

  public deleteBrand() {
    this.isLoading = true;

    const url: string = `${BRAND_DELETE}/${this.brandToDelete.id}`;
    Axios.delete(url)
      .then((result) => {
        this.displayInfoMessage(`${this.brandToDelete.name} deleted`); // TODO ERROR MESSAGE
        this.$emit('brand-delete', this.brandToDelete);
        this.closeDialog();
      })
      .catch((error) => {
        this.displayErrorMessage(ERROR_DELETE_BRAND);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
</style>
