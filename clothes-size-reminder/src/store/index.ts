import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { user } from './user';
import { referential } from './referential';
import { reminder } from './reminder';
import { toastr } from './toastr';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: '0.0.1',
    name: 'ClothesReminder',
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    referential,
    reminder,
    toastr,
  },
};

export default new Vuex.Store<RootState>(store);
