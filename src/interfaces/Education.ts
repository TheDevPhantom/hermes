import { IItem } from './Item';

export interface IEducation extends IItem {
  school: string;
  degree: string;
  startDate: Date;
  endDate?: Date;
  overview: string;
}
