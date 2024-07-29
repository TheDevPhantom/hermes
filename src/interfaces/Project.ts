import { IItem } from './Item';

export interface IProject extends IItem {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  technologies: string;
  role: string;
  link: string;
  responsibilities: string[];
  company: string;
  includeInPdf: boolean;
}
