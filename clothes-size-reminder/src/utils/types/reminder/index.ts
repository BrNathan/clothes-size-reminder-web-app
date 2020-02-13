import IClothesSize from '../clothes-size';

export interface INewReminderExtended extends IReminderBase {
  clothesSize: IClothesSize
}

export interface INewReminder extends IReminderBase {
  clothesSize: IClothesSize
}

export interface IReminderExtended extends INewReminderExtended {
  id: number;
}

export interface IReminder extends INewReminder {
  id: number;
}

interface IReminderBase {
  userId: number;
  brandId: number;
  comments: string;
}
