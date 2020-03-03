<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <slot name="button">
          <v-btn color="primary" dark>
            Create new Size
          </v-btn>
        </slot>
      </div>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">
            New size
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Code*"
                required
                v-model="sizeCode"
                :disabled="!isAdminMode">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Label*"
                  hint="It can be same than the Name"
                  required
                  @focus="focusLabel"
                  v-model="sizeLabel">
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
import Axios, { AxiosResponse } from 'axios';
import { Mutation } from 'vuex-class';
import TableHeader from '@/utils/types/table-header';
import { INewSize, ISize } from '@/utils/types/size';
import { SIZE_CREATE } from '@/utils/api-endpoints';
import { STORE_REFERENTIAL, STORE_TOASTR } from '../../../store/namespace';
import { ERROR_CREATE_SIZE } from '../../../utils/error-messages';

@Component({
  components: {},
})
export default class CreateSize extends Vue {
    @Mutation('addSize', { namespace: STORE_REFERENTIAL })
    public addSizeToStore!: (size: ISize) => void;

    @Prop({ required: false, default: false })
    public isAdminMode!: boolean;

    @Mutation('displayErrorMessage', { namespace: STORE_TOASTR })
    displayErrorMessage!: (message: string) => void;

    @Mutation('displayInfoMessage', { namespace: STORE_TOASTR })
    displayInfoMessage!: (message: string) => void;

    public dialog: boolean = false;

    public isLoading: boolean = false;

    public sizeCode: string = '';

    public sizeLabel: string = '';

    private newSize!: INewSize;

    private isSizeLabelFocus: boolean = false;

    private maxSizeCodeLength: number = 45;

    @Watch('sizeCode')
    public onSizeCodeChange() {
      if (!this.isSizeLabelFocus) {
        this.sizeLabel = this.sizeCode;
      }
    }

    public focusLabel() {
      this.isSizeLabelFocus = true;
    }

    public save() {
      this.isLoading = true;
      this.newSize = {
        code: this.sizeCode,
        label: this.sizeLabel,
      };
      Axios.post<INewSize, AxiosResponse<ISize>>(SIZE_CREATE, this.newSize)
        .then((result) => {
          this.displayInfoMessage(`${this.newSize.label} created`); // TODO ERROR MESSAGE
          this.$emit('size-created');
          this.addSizeToStore(result.data);
          this.closeDialog();
        })
        .catch((error) => {
          this.displayErrorMessage(ERROR_CREATE_SIZE);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }

    public closeDialog(): void {
      this.dialog = false;
      this.isLoading = false;
      this.sizeCode = '';
      this.sizeLabel = '';
    }

    @Watch('sizeLabel')
    public onSizeLabelChange(): void {
      const futureCode: string = this.sizeLabel.replace(/[^a-z|A-Z|0-9]/g, '_');
      if (!this.isAdminMode && (futureCode.length < this.maxSizeCodeLength)) {
        this.sizeCode = futureCode.toUpperCase();
      }
    }
}
</script>

<style lang="scss" scoped>
</style>
