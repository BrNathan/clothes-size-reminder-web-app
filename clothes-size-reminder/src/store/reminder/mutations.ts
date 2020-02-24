import { MutationTree } from 'vuex';
import { ReminderState } from './types';
import { IReminderExtended } from '@/utils/types/reminder';

const mutations: MutationTree<ReminderState> = {
  reminderLoaded(state: ReminderState, payload: IReminderExtended[]) {
    state.isReminderReady = true;
    state.reminder = payload;
  },
  addReminder(state: ReminderState, payload: IReminderExtended) {
    state.reminder.push(payload);
  },
  updateReminder(state: ReminderState, payload: IReminderExtended) {
    const reminderIndex: number = state.reminder.findIndex(r => r.id === payload.id);
    if (reminderIndex >= 0) {
      state.reminder[reminderIndex] = payload;
    }
  },
};

export default mutations;
