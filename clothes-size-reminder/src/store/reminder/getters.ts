import { GetterTree } from 'vuex';
import { ReminderState } from './types';
import { RootState } from '../types';
import { IReminderExtended } from '@/utils/types/reminder';

const getters: GetterTree<ReminderState, RootState> = {
  getReminders(state): IReminderExtended[] {
    return state.reminder ? state.reminder : [];
  },
  isReminderReady(state): boolean {
    return state.isReminderReady;
  },
};

export default getters;
