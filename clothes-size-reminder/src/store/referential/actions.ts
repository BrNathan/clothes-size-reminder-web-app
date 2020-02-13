import Axios from 'axios';
import { ActionTree } from 'vuex';
import { ReferentialState } from './types';
import { RootState } from '../types';
import {
  GENDER_GET_ALL, CLOTHES_CATEGORY_GET_ALL, SIZE_GET_ALL, CLOTHES_GET_ALL, BRAND_GET_ALL,
} from '@/utils/api-endpoints';
import { IGender } from '@/utils/types/gender';
import IClothesCategory from '@/utils/types/clothes-category';
import { ISize } from '@/utils/types/size';
import { IClothes } from '@/utils/types/clothes';
import { IBrand } from '@/utils/types/brand';

const actions: ActionTree<ReferentialState, RootState> = {
  fetchGenderData({ commit }): any {
    Axios.get(GENDER_GET_ALL)
      .then((response) => {
        const payload: IGender[] = response && response.data;
        commit('genderLoaded', payload);
      });
  },
  fetchClothesCategoryData({ commit }): any {
    Axios.get(CLOTHES_CATEGORY_GET_ALL)
      .then((response) => {
        const payload: IClothesCategory[] = response && response.data;
        commit('clothesCategoryLoaded', payload);
      });
  },
  fetchSizeData({ commit }): any {
    Axios.get(SIZE_GET_ALL)
      .then((response) => {
        const payload: ISize[] = response && response.data;
        commit('sizeLoaded', payload);
      });
  },
  fetchClothesData({ commit }): any {
    Axios.get(CLOTHES_GET_ALL)
      .then((response) => {
        const payload: IClothes[] = response && response.data;
        commit('clothesLoaded', payload);
      });
  },
  fetchBrandData({ commit }): any {
    Axios.get(BRAND_GET_ALL)
      .then((response) => {
        const payload: IBrand[] = response && response.data;
        commit('brandLoaded', payload);
      });
  },
};

export default actions;
