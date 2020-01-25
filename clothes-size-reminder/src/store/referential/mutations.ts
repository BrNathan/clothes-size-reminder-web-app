import { MutationTree } from 'vuex';
import { ReferentialState } from './types';
import { IGender } from '@/utils/types/gender';
import IClothesCategory from '@/utils/types/clothes-category';

const mutations: MutationTree<ReferentialState> = {
  genderLoaded(state: ReferentialState, payload: IGender[]) {
    state.gender = payload;
  },
  clothesCategoryLoaded(state: ReferentialState, payload: IClothesCategory[]) {
    state.clothesCategory = payload;
  },
};

export default mutations;
