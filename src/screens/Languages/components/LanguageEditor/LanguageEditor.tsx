import { useEffect, useState } from 'react';
import Input from '../../../../components/Input/Input';
import { ILanguageEditorProps } from './LanguageEditor.types';
import './_styles.language-editor.scss';
import { ELanguageLevel, ILanguage } from '../../../../interfaces/Language';
import Select from '../../../../components/Select/Select';

const LanguageEditor = ({ language, onSave }: ILanguageEditorProps) => {
  const [languageDetails, setLanguageDetails] = useState<ILanguage>(language);

  useEffect(() => {
    setLanguageDetails(language);
  }, [language]);

  useEffect(() => {
    handleSave();
  }, [languageDetails.level]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLanguageDetails({ ...languageDetails, [name]: value });
  };

  const handleSave = () => {
    onSave(languageDetails);
  };

  return (
    <div className='language-editor'>
      <Input
        label='Language'
        placeholder='French'
        value={languageDetails.language}
        name='language'
        onChange={handleFieldChange}
        onBlur={handleSave}
      />
      <Select
        label='Proficiency'
        options={[
          { value: '', label: 'None' },
          ...Object.values(ELanguageLevel).map((languageLevel) => ({
            value: languageLevel,
            label: languageLevel
          }))
        ]}
        value={languageDetails.level}
        onChange={(value) => {
          setLanguageDetails({ ...languageDetails, level: value });
        }}
      />
    </div>
  );
};

export default LanguageEditor;
