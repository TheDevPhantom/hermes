import { ILanguage } from '../../../../interfaces/Language';

export interface ILanguageEditorProps {
  language: ILanguage;
  onSave: (language: ILanguage) => void;
}
