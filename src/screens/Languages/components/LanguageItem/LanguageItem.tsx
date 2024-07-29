import { ILanguageItemProps } from './LanguageItem.types';
import { checkEmpty, combineClassNames } from '../../../../utils/stringUtils';
import { FcFaq } from 'react-icons/fc';

const LanguageItem = ({ onClick, language, isActive }: ILanguageItemProps) => {
  return (
    <div
      className={combineClassNames('list-item', isActive ? 'active' : '')}
      onClick={onClick}
    >
      <span className='list-item-icon'>
        <FcFaq />
      </span>
      <div className='list-item-content'>
        <p className='list-item-title'>
          {checkEmpty(language.language, <i>No Language</i>)}
        </p>
        <p className='list-item-subtitle'>
          {checkEmpty(language.level, <i>No Level</i>)}
        </p>
      </div>
    </div>
  );
};

export default LanguageItem;
