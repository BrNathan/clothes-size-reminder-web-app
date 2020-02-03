import ICLothesCategory from '@/utils/types/clothes-category';
import { IGender } from '@/utils/types/gender';
import ISize from '@/utils/types/size';
import { IClothes } from '@/utils/types/clothes';

export interface ReferentialState {
    clothesCategory: ICLothesCategory[];
    gender: IGender[];
    size: ISize[];
    clothes: IClothes[];
}
