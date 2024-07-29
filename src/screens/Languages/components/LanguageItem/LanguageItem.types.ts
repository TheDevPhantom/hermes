import { ILanguage } from '../../../../interfaces/Language';

export interface ILanguageItemProps {
  language: ILanguage;
  isActive: boolean;
  onClick: () => void;
}
