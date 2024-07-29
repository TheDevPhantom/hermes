import { FcIdea } from 'react-icons/fc';
import {
  checkEmpty,
  combineClassNames,
  pluralize
} from '../../../../utils/stringUtils';
import { ISkillItemProps } from './SkillItem.types';

const SkillItem = ({ isActive, onClick, skill }: ISkillItemProps) => {
  return (
    <div
      className={combineClassNames('list-item', isActive ? 'active' : '')}
      onClick={onClick}
    >
      <span className='list-item-icon'>
        <FcIdea />
      </span>
      <div className='list-item-content'>
        <p className='list-item-title'>
          {checkEmpty(skill.name, <i>No Name</i>)}
        </p>
        <p className='list-item-subtitle'>
          {checkEmpty(
            `${skill.yearsOfExperience?.toString() ?? 0} ${pluralize(
              skill.yearsOfExperience,
              'Year'
            )}`,
            <i>No Level</i>
          )}
        </p>
      </div>
    </div>
  );
};

export default SkillItem;
