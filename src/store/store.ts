import { create } from 'zustand';
import createProfileSlice, { IProfileSlice } from './slices/profileSlice';
import createExperienceSlice, {
  IExperienceSlice
} from './slices/experienceSlice';
import createEducationSlice, { IEducationSlice } from './slices/educationSlice';
import createProjectSlice, { IProjectSlice } from './slices/projectSlice';
import createLanguageSlice, { ILanguageSlice } from './slices/languageSlice';
import createSkillSlice, { ISkillSlice } from './slices/skillSlice';

const useStore = create<
  IProfileSlice &
    IExperienceSlice &
    IEducationSlice &
    IProjectSlice &
    ILanguageSlice &
    ISkillSlice
>()((...a) => ({
  ...createProfileSlice(...a),
  ...createExperienceSlice(...a),
  ...createEducationSlice(...a),
  ...createProjectSlice(...a),
  ...createLanguageSlice(...a),
  ...createSkillSlice(...a)
}));

export default useStore;
