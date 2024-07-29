import { useEffect, useState } from 'react';
import Input from '../../../../components/Input/Input';
import { ISkill } from '../../../../interfaces/Skill';
import { ISkillEditorProps } from './SkillEditor.types';
import './_styles.skill-editor.scss';

const SkillEditor = ({ skill, onSave }: ISkillEditorProps) => {
  const [skillDetails, setSkillDetails] = useState<ISkill>(skill);

  useEffect(() => {
    setSkillDetails(skill);
  }, [skill]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSkillDetails({ ...skillDetails, [name]: value });
  };

  const handleSave = () => {
    onSave(skillDetails);
  };

  return (
    <div className='skill-editor'>
      <section>
        <div className='section-header'>
          <h3>About The Skill</h3>
          <p>Describe the skill you want to add to your profile</p>
        </div>
      </section>
      <Input
        label='Skill Name'
        placeholder='React'
        name='name'
        value={skillDetails.name}
        onChange={handleFieldChange}
        onBlur={handleSave}
      />
      <Input
        label='Years of Experience'
        placeholder='3'
        value={skillDetails.yearsOfExperience ?? ''}
        type='number'
        name='yearsOfExperience'
        onChange={handleFieldChange}
        onBlur={handleSave}
      />
    </div>
  );
};

export default SkillEditor;
