import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { ReferentialState } from './types';
import { RootState } from '../types';

export const state: ReferentialState = {
  clothesCategory: null,
  gender: null,
};

const namespaced: boolean = true;

export const referential: Module<ReferentialState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
