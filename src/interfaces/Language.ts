import { IItem } from './Item';

export interface ILanguage extends IItem {
  language: string;
  level?: ELanguageLevel;
}

export enum ELanguageLevel {
  Elementary = 'Elementary Proficiency',
  LimitedWorking = 'Limited Working Proficiency',
  ProfessionalWorking = 'Professional Working Proficiency',
  FullProfessional = 'Full Professional Proficiency',
  NativeProficiency = 'Native Proficiency'
}
