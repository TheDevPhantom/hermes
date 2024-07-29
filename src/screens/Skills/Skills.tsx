import { FcIdea, FcPlus } from 'react-icons/fc';
import ItemList from '../../components/ItemList/ItemList';
import './_styles.skills.scss';
import SkillItem from './components/SkillItem/SkillItem';
import SkillEditor from './components/SkillEditor/SkillEditor';
import { v4 as uuidv4 } from 'uuid';
import useStore from '../../store/store';
import { useState } from 'react';
import { ISkill } from '../../interfaces/Skill';

const Skills = () => {
  const { skills, updateSkills } = useStore();
  const [activeSkillIndex, setActiveSkillIndex] = useState(-1);

  const handleSave = (skill: ISkill) => {
    const newSkills = [...skills];
    newSkills[activeSkillIndex] = skill;
    updateSkills(newSkills);
  };

  const addSkill = () => {
    const newSkills = [
      ...skills,
      {
        id: uuidv4(),
        name: '',
        yearsOfExperience: 0
      }
    ];
    updateSkills(newSkills);

    setActiveSkillIndex(newSkills.length - 1);
  };

  return (
    <div className='skills-screen'>
      <ItemList icon={<FcIdea />} title='Skills'>
        <div className='list-item' onClick={addSkill}>
          <span className='list-item-icon'>
            <FcPlus />
          </span>
          <div className='list-item-content'>
            <p className='list-item-title'>New Skill</p>
            <p className='list-item-subtitle'>Add a new skill</p>
          </div>
        </div>
        {skills.map((skill, index) => (
          <SkillItem
            onClick={() => setActiveSkillIndex(index)}
            isActive={index === activeSkillIndex}
            skill={skill}
            key={skill.id}
          />
        ))}
      </ItemList>
      {activeSkillIndex > -1 && (
        <SkillEditor skill={skills[activeSkillIndex]} onSave={handleSave} />
      )}
    </div>
  );
};

export default Skills;
