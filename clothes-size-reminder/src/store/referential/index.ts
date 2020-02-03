import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { ReferentialState } from './types';
import { RootState } from '../types';

export const state: ReferentialState = {
  isClothesCategoryReady: false,
  isClothesReady: false,
  isGenderReady: false,
  isSizeReady: false,
  isBrandReady: false,
  clothesCategory: [],
  gender: [],
  size: [],
  clothes: [],
  brand: [],
};

const namespaced: boolean = true;

export const referential: Module<ReferentialState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
