import { FcFaq, FcPlus } from 'react-icons/fc';
import ItemList from '../../components/ItemList/ItemList';
import './_styles.languages.scss';
import useStore from '../../store/store';
import { useState } from 'react';
import LanguageItem from './components/LanguageItem/LanguageItem';
import { v4 as uuidv4 } from 'uuid';
import { ILanguage } from '../../interfaces/Language';
import LanguageEditor from './components/LanguageEditor/LanguageEditor';

const Languages = () => {
  const { languages, updateLanguages } = useStore();
  const [activeLanguageIndex, setActiveLanguageIndex] = useState(-1);

  const addLanguage = () => {
    const newLanguages = [
      ...languages,
      {
        id: uuidv4(),
        language: ''
      }
    ];
    updateLanguages(newLanguages);

    setActiveLanguageIndex(newLanguages.length - 1);
  };

  const handleSave = (language: ILanguage) => {
    const newLanguages = [...languages];
    newLanguages[activeLanguageIndex] = language;
    updateLanguages(newLanguages);
  };

  return (
    <div className='languages-screen'>
      <ItemList icon={<FcFaq />} title='Languages'>
        <div className='list-item' onClick={addLanguage}>
          <span className='list-item-icon'>
            <FcPlus />
          </span>
          <div className='list-item-content'>
            <p className='list-item-title'>New Language</p>
            <p className='list-item-subtitle'>Add a new language</p>
          </div>
        </div>
        {languages.map((language, index) => (
          <LanguageItem
            onClick={() => setActiveLanguageIndex(index)}
            isActive={index === activeLanguageIndex}
            language={language}
            key={language.id}
          />
        ))}
      </ItemList>
      {activeLanguageIndex > -1 && (
        <LanguageEditor
          language={languages[activeLanguageIndex]}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Languages;
