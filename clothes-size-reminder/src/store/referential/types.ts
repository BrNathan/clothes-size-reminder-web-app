import ICLothesCategory from '@/utils/types/clothes-category';
import { IGender } from '@/utils/types/gender';
import ISize from '@/utils/types/size';
import { IClothes } from '@/utils/types/clothes';
import { IBrand } from '@/utils/types/brand';

export interface ReferentialState {
    isGenderReady: boolean;
    isClothesCategoryReady: boolean;
    isSizeReady: boolean;
    isClothesReady: boolean;
    isBrandReady: boolean;
    clothesCategory: ICLothesCategory[];
    gender: IGender[];
    size: ISize[];
    clothes: IClothes[];
    brand: IBrand[];
}
