<template>
  <div id="my-reminder">
    <h1>My Reminder</h1>
    <v-row>
      <v-col cols="12">
        <create-reminder></create-reminder>
      </v-col>
    </v-row>
    <v-row>
      <template v-for="reminder in reminders">
        <v-col
          :key="reminder.id"
          cols="12"
          sm="6"
          md="3"
        >
          <reminder-item
            :reminder="{...reminder}"
          >
          </reminder-item>
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
import ISize from '@/utils/types/size';
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
  @State('reminder', { namespace: STORE_REMINDER }) reminders?: IReminderExtended[];
}
</script>
