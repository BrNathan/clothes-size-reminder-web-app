<template>
    <v-snackbar
      :top="true"
      :right="true"
      v-model="shown"
      :multi-line="true"
      :timeout="timeout"
      color="white"
    >
      <div>
        <template v-for="(item, index) in messages">
          <div class="toastr-message" :key="index">
            <v-icon
              :color="getPriorityColorGet(item.priority)"
            >{{getPriorityIconGet(item.priority)}}</v-icon>
            <span class="separator"></span>
            <span>{{item.message}}</span>
          </div>
        </template>
      </div>
        <v-progress-circular
          :value="percent"
          color="primary"
        >
        </v-progress-circular>
    </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { State, Mutation, Getter } from 'vuex-class';
import { STORE_TOASTR } from '../store/namespace';
import { ToastrMessage, ToastrPriority } from '../store/toastr/types';
import BaseComponent from '../utils/base-component';

@Component({})
export default class ToastMessage extends BaseComponent {
  @State('isShown', { namespace: STORE_TOASTR })
  private isToastrShown!: boolean;

  @State('messages', { namespace: STORE_TOASTR })
  private toastrMessages!: ToastrMessage[];

  @Mutation('hideToastr', { namespace: STORE_TOASTR })
  public hideToastr!: () => void;

  @Mutation('displayToastr', { namespace: STORE_TOASTR })
  public displayToastr!: () => void;

  @Getter('getPriorityIcon', { namespace: STORE_TOASTR })
  public getPriorityIcon!: (priority: ToastrPriority) => string;

  @Getter('getPriorityColor', { namespace: STORE_TOASTR })
  public getPriorityColor!: (priority: ToastrPriority) => string;

  private initialPercent: number = 0;

  public percent: number = 0;

  public timeout: number = 4000;

  private timeIntervalPercent: number = 300;

  public shown: boolean = false;

  public intervalProgress!: number;

  public getPriorityIconGet(priority: ToastrPriority): string {
    if (this.getPriorityIcon) {
      return this.getPriorityIcon(priority);
    }
    return '';
  }

  public getPriorityColorGet(priority: ToastrPriority): string {
    if (this.getPriorityColor) {
      return this.getPriorityColor(priority);
    }
    return '';
  }

  private get incrementPercentInterval() {
    return (100 * this.timeIntervalPercent / this.timeout) + 1;
  }

  @Watch('isShown')
  public onIsShownChange(): void {
    if (this.isShown) {
      this.shown = true;
    } else {
      this.shown = false;
    }
  }

  @Watch('shown')
  public onShownChange(): void {
    if (this.hideToastr && this.displayToastr) {
      if (this.shown) {
        this.intervalProgress = setInterval(() => {
          this.percent += this.incrementPercentInterval;
        }, this.timeIntervalPercent);
        this.displayToastr();
      } else {
        clearInterval(this.intervalProgress);
        this.percent = this.initialPercent;
        this.hideToastr();
      }
    }
  }

  public get isShown(): boolean {
    if (this.isToastrShown) {
      return this.isToastrShown;
    }
    return false;
  }

  public get messages(): ToastrMessage[] {
    if (this.toastrMessages) {
      return this.toastrMessages;
    }
    return [];
  }
}
</script>

<style lang="scss" scoped>
.toastr-message {
  color: black;
}
</style>
