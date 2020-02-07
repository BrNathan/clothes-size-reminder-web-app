import { MutationTree } from 'vuex';
import { ReferentialState } from './types';
import { IGender } from '@/utils/types/gender';
import IClothesCategory from '@/utils/types/clothes-category';
import ISize from '@/utils/types/size';
import { IClothes } from '@/utils/types/clothes';
import { IBrand } from '@/utils/types/brand';

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
  brandLoaded(state: ReferentialState, payload: IBrand[]) {
    state.brand = payload;
    state.isBrandReady = true;
  },
  addBrand(state: ReferentialState, payload: IBrand) {
    state.brand.push(payload);
  },
};

export default mutations;
