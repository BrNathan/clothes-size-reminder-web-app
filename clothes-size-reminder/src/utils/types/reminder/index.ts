import IClothesSize from '../clothes-size';

export interface INewReminderExtended extends IReminderBase {
  clothesSize: IClothesSize
}

export interface INewReminder extends IReminderBase {
  clothesSize: IClothesSize
}

export interface IReminderExtended extends INewReminderExtended {
  id: number;
  creationDate: Date;
}

export interface IReminder extends INewReminder {
  id: number;
  creationDate: Date;
}

interface IReminderBase {
  userId: number;
  brandId: number;
  comments: string;
}
