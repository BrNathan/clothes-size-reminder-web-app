import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { ToastrState, ToastrPriority } from './types';
import { RootState } from '../types';

export const state: ToastrState = {
  isShown: false,
  messages: [
    // { message: 'TEST 1', priority: ToastrPriority.Error },
    // { message: 'TEST 2', priority: ToastrPriority.Error },
    // { message: 'TEST 3', priority: ToastrPriority.Error },
    // { message: 'TEST 4', priority: ToastrPriority.Error },
  ],
};

const namespaced: boolean = true;

export const toastr: Module<ToastrState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
