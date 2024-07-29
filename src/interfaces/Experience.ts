import { IItem } from './Item';

export interface IExperience extends IItem {
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  overview: string;
}
