import { ActionTree } from 'vuex';
import Axios, { AxiosResponse } from 'axios';
import { ReminderState } from './types';
import { RootState } from '../types';
import { REMINDER_GET_ALL_EXTEND_BY_USER } from '@/utils/api-endpoints';
import { IReminderExtended } from '@/utils/types/reminder';

const actions: ActionTree<ReminderState, RootState> = {
  fetchReminderByUser({ commit, state }, userId: number): any {
    state.isReminderReady = false;
    Axios.get<any, AxiosResponse<IReminderExtended[]>>(REMINDER_GET_ALL_EXTEND_BY_USER)
      .then((response) => {
        const payload: IReminderExtended[] = response && response.data.map((r) => {
          r.creationDate = new Date(r.creationDate);
          return r;
        });
        commit('reminderLoaded', payload);
      });
  },
};

export default actions;
