import { StateCreator } from 'zustand';
import { loadData, saveData } from '../storage';
import { ISkill } from '../../interfaces/Skill';

export interface ISkillSlice {
  skills: ISkill[];
  updateSkills: (skills: ISkill[]) => void;
}

const createSkillSlice: StateCreator<ISkillSlice, [], [], ISkillSlice> = (
  set
) => {
  const skills = loadData('skills') ?? [];

  return {
    skills,
    updateSkills: (skills) =>
      set(() => {
        saveData('skills', skills);
        return {
          skills
        };
      })
  };
};

export default createSkillSlice;
