import { GetterTree } from 'vuex';
import { ReferentialState } from './types';
import { RootState } from '../types';
import { IGender } from '@/utils/types/gender';
import IClothesCategory from '@/utils/types/clothes-category';
import ISize from '@/utils/types/size';
import { IClothes } from '@/utils/types/clothes';
import { IBrand } from '@/utils/types/brand';

const getters: GetterTree<ReferentialState, RootState> = {
  isReady(state): boolean {
    return state.isClothesCategoryReady
      && state.isClothesReady
      && state.isGenderReady
      && state.isSizeReady
      && state.isBrandReady;
  },
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
      const clothesCategory: IClothesCategory | undefined = state.clothesCategory
        .find(g => g.id === clothesCategoryId);
      return clothesCategory || null;
    };
  },
  sizeById(state): any {
    return (sizeId: number): ISize | null => {
      const size: ISize | undefined = state.size
        .find(s => s.id === sizeId);
      return size || null;
    };
  },
  clothesById(state): any {
    return (clothesId: number): IClothes | null => {
      const clothes: IClothes | undefined = state.clothes
        .find(c => c.id === clothesId);
      return clothes || null;
    };
  },
  brandById(state): any {
    return (brandId: number): IBrand | null => {
      const brand: IBrand | undefined = state.brand
        .find(b => b.id === brandId);
      return brand || null;
    };
  },
};

export default getters;
