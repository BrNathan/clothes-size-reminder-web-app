import IClothesSize from '../clothes-size';

export interface IReminderExtended extends IReminderBase {
  clothesSize: IClothesSize
}

export interface IReminder extends IReminderBase {
  clothesSizeId: number;
}

interface IReminderBase {
  id: number;
  userId: number;
  brandId: number;
  comments: string;
}
