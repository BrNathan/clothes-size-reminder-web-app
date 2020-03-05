import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { ToastrState } from './types';
import { RootState } from '../types';

export const state: ToastrState = {
  isShown: false,
  messages: [],
};

const namespaced: boolean = true;

export const toastr: Module<ToastrState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
