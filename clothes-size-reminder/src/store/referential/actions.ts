import Axios from 'axios';
import { ActionTree } from 'vuex';
import { ReferentialState } from './types';
import { RootState } from '../types';
import { GENDER_GET_ALL, CLOTHES_CATEGORY_GET_ALL } from '@/utils/api-endpoints';
import IGender from '@/utils/types/gender';
import IClothesCategory from '@/utils/types/clothes-category';

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
};

export default actions;
