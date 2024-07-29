import { FiShare2 } from 'react-icons/fi';
import './_styles.titlebar.scss';
import useStore from '../../store/store';

const Titlebar = () => {
  const {
    experiences,
    projects,
    profileDetails,
    educations,
    skills,
    languages
  } = useStore();

  const onGenerate = () => {
    ipcRenderer.send('generate-pdf', {
      profileDetails,
      experiences,
      projects,
      education: educations,
      skills,
      languages
    });
  };

  return (
    <div className='titlebar'>
      <p>Adriaan Botha CV</p>
      <button onClick={onGenerate}>
        <FiShare2 />
        Generate
      </button>
    </div>
  );
};

export default Titlebar;
