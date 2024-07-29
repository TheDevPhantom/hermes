import { ISkill } from '../../../../interfaces/Skill';

export interface ISkillEditorProps {
  skill: ISkill;
  onSave: (skill: ISkill) => void;
}
