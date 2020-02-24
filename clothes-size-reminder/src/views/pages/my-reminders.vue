<template>
  <div id="my-reminder">
    <h1>My Reminder</h1>
    <v-row>
      <v-col cols="auto">
        <create-reminder>
          <template v-slot:button>
            <v-btn color="primary">New Reminder</v-btn>
          </template>
        </create-reminder>
      </v-col>
    </v-row>
    <v-row v-if="!isReminderLoading">
      <v-col cols="12" sm="6" md="3" v-for="i in numberLoading" :key="i">
        <v-skeleton-loader type="card">
        </v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else>
      <template
      v-for="reminder in reminders.slice().sort((a, b) => b.creationDate - a.creationDate)">
        <v-col :key="reminder.id" cols="12" sm="6" md="3">
          <reminder-item :reminder="{...reminder}"></reminder-item>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter } from 'vuex-class';
import { STORE_REMINDER, STORE_REFERENTIAL } from '../../store/namespace';
import { IReminderExtended } from '../../utils/types/reminder';
import { ISize } from '@/utils/types/size';
import { IClothes } from '../../utils/types/clothes';
import { IBrand } from '../../utils/types/brand';
import ReminderItem from '@/components/shared/reminder/reminder-item.vue';
import CreateReminder from '@/components/shared/reminder/create-reminder.vue';

@Component({
  components: {
    'reminder-item': ReminderItem,
    'create-reminder': CreateReminder,
  },
})
export default class MyReminders extends Vue {
  @State('reminder', { namespace: STORE_REMINDER })
  reminders?: IReminderExtended[];

  @Getter('isReminderReady', { namespace: STORE_REMINDER })
  isReminderReady?: boolean;

  public get isReminderLoading(): boolean {
    return !!this.isReminderReady;
  }

  public numberLoading: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}
</script>
