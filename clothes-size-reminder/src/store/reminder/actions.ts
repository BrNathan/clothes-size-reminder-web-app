import { ActionTree } from 'vuex';
import Axios from 'axios';
import { ReminderState } from './types';
import { RootState } from '../types';
import { REMINDER_GET_ALL_EXTEND_BY_USER } from '@/utils/api-endpoints';
import { IReminderExtended } from '@/utils/types/reminder';

const actions: ActionTree<ReminderState, RootState> = {
  fetchReminderByUser({ commit }, userId: number): any {
    Axios.get(REMINDER_GET_ALL_EXTEND_BY_USER)
      .then((response) => {
        const payload: IReminderExtended[] = response && response.data;
        commit('reminderLoaded', payload);
      });
  },
};

export default actions;
