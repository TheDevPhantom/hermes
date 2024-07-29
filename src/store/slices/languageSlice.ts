import { StateCreator } from 'zustand';
import { loadData, saveData } from '../storage';
import { ILanguage } from '../../interfaces/Language';

export interface ILanguageSlice {
  languages: ILanguage[];
  updateLanguages: (languages: ILanguage[]) => void;
}

const createLanguageSlice: StateCreator<
  ILanguageSlice,
  [],
  [],
  ILanguageSlice
> = (set) => {
  const languages = loadData('languages') ?? [];

  return {
    languages,
    updateLanguages: (languages) =>
      set(() => {
        saveData('languages', languages);
        return {
          languages
        };
      })
  };
};

export default createLanguageSlice;
