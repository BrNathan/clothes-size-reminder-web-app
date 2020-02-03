import { MutationTree } from 'vuex';
import { ReferentialState } from './types';
import { IGender } from '@/utils/types/gender';
import IClothesCategory from '@/utils/types/clothes-category';
import ISize from '@/utils/types/size';
import { IClothes } from '@/utils/types/clothes';

const mutations: MutationTree<ReferentialState> = {
  genderLoaded(state: ReferentialState, payload: IGender[]) {
    state.gender = payload;
    state.isGenderReady = true;
  },
  clothesCategoryLoaded(state: ReferentialState, payload: IClothesCategory[]) {
    state.clothesCategory = payload;
    state.isClothesCategoryReady = true;
  },
  sizeLoaded(state: ReferentialState, payload: ISize[]) {
    state.size = payload;
    state.isSizeReady = true;
  },
  clothesLoaded(state: ReferentialState, payload: IClothes[]) {
    state.clothes = payload;
    state.isClothesReady = true;
  },
};

export default mutations;
