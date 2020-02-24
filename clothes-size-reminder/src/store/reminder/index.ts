import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { ReminderState } from './types';
import { RootState } from '../types';

export const state: ReminderState = {
  reminder: [],
  isReminderReady: false,
};

const namespaced: boolean = true;

export const reminder: Module<ReminderState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
