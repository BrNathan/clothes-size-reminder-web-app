import { MutationTree } from 'vuex';
import { ReminderState } from './types';
import { IReminderExtended } from '@/utils/types/reminder';

const mutations: MutationTree<ReminderState> = {
  reminderLoaded(state: ReminderState, payload: IReminderExtended[]) {
    state.reminder = payload;
  },
};

export default mutations;
