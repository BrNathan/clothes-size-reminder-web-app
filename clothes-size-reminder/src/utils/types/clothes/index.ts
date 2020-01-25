import { IGender } from '../gender';
import IClothesCategory from '../clothes-category';

export interface IClothes extends INewClothes {
    id: number;
}

export interface INewClothes {
    code: string;
    label: string;
    clothesCategoryId: number;
    clothesGenderId: number;
}

export interface IClothesExpand {
    id: number;
    code: string;
    label: string;
    clothesCategory: IClothesCategory;
    clothesGender: IGender;
}
