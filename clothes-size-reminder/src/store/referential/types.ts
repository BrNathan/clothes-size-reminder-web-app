import ICLothesCategory from '@/utils/types/clothes-category';
import IGender from '@/utils/types/gender';

export interface ReferentialState {
    clothesCategory: ICLothesCategory[] | null;
    gender: IGender[] | null;
}
