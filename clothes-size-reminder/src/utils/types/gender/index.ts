
export interface IGender {
    id: number;
    code: string;
    label: string;
}

export enum GenderEnum {
    Male = 'M',
    Female = 'F',
    All = 'A',
}

export enum GenderIcon {
    Male = 'mdi-human-male',
    Female = 'mdi-human-female',
    All = 'mdi-human-male-female',
}
