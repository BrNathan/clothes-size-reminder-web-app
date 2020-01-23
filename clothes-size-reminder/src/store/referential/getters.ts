import { GetterTree } from 'vuex';
import { ReferentialState } from './types';
import { RootState } from '../types';
import IGender from '@/utils/types/gender';

const getters: GetterTree<ReferentialState, RootState> = {
  genders(state): IGender[] {
    return state.gender == null ? [] : state.gender as IGender[];
  },
};

export default getters;
