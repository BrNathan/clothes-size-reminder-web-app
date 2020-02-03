import { MutationTree } from 'vuex';
import { ReferentialState } from './types';
import { IGender } from '@/utils/types/gender';
import IClothesCategory from '@/utils/types/clothes-category';
import ISize from '@/utils/types/size';
import { IClothes } from '@/utils/types/clothes';

const mutations: MutationTree<ReferentialState> = {
  genderLoaded(state: ReferentialState, payload: IGender[]) {
    state.gender = payload;
  },
  clothesCategoryLoaded(state: ReferentialState, payload: IClothesCategory[]) {
    state.clothesCategory = payload;
  },
  sizeLoaded(state: ReferentialState, payload: ISize[]) {
    state.size = payload;
  },
  clothesLoaded(state: ReferentialState, payload: IClothes[]) {
    state.clothes = payload;
  },
};

export default mutations;
