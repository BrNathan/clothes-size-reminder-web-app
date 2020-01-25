import { GetterTree } from 'vuex';
import { ReferentialState } from './types';
import { RootState } from '../types';
import { IGender } from '@/utils/types/gender';
import IClothesCategory from '@/utils/types/clothes-category';

const getters: GetterTree<ReferentialState, RootState> = {
  genders(state): IGender[] {
    return state.gender;
  },
  genderById(state): any {
    return (genderId: number): IGender | null => {
      const gender: IGender | undefined = state.gender.find(g => g.id === genderId);
      return gender || null;
    };
  },
  clothescategories(state): IClothesCategory[] {
    return state.clothesCategory;
  },
  clothesCategoryById(state): any {
    return (clothesCategoryId: number): IClothesCategory | null => {
      const clothesCategory: IGender | undefined = state.clothesCategory
        .find(g => g.id === clothesCategoryId);
      return clothesCategory || null;
    };
  },
};

export default getters;
