<template>
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <span v-on="on" title="delete">
          <slot name="button">
            <v-btn color="error" dark>
              Delete Clothes
            </v-btn>
          </slot>
        </span>
      </template>
      <v-card>
        <v-card-title>Warning</v-card-title>
        <v-card-text>Do you confirm to delete the clothes
           <span class="font-weight-black">"{{clothesToDelete.label}}"</span> ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDialog">
            Cancel
          </v-btn>
          <v-btn color="error darken-1" text @click="deleteClothes" :loading="isLoading">
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
import { IClothes } from '@/utils/types/clothes';
import { CLOTHES_DELETE } from '@/utils/api-endpoints';
import { ERROR_DELETE_CLOTHES } from '../../../utils/error-messages';
import BaseComponent from '../../../utils/base-component';

@Component({
  components: {},
})
export default class DeleteClothes extends BaseComponent {
  @Prop({ required: true })
  public clothesToDelete!: IClothes;

  public dialog: boolean = false;

  public isLoading: boolean = false;

  public closeDialog(): void {
    this.dialog = false;
    this.isLoading = false;
  }

  public deleteClothes() {
    this.isLoading = true;

    const url: string = `${CLOTHES_DELETE}/${this.clothesToDelete.id}`;
    Axios.delete(url)
      .then((result) => {
        this.displayInfoMessage(`${this.clothesToDelete.label} deleted`); // TODO ERROR MESSAGE
        this.$emit('clothes-delete', this.clothesToDelete);
        this.closeDialog();
      })
      .catch((error) => {
        this.displayErrorMessage(ERROR_DELETE_CLOTHES);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
</style>
