import { ISkill } from '../../../../interfaces/Skill';

export interface ISkillItemProps {
  skill: ISkill;
  isActive: boolean;
  onClick: () => void;
}
