export interface IBrand extends INewBrand {
    id: number;
}

export interface INewBrand {
    name: string;
    corporateName: string;
    isValidated: boolean;
}
