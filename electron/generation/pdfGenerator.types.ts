import { IEducation } from '../../src/interfaces/Education';
import { IExperience } from '../../src/interfaces/Experience';
import { ILanguage } from '../../src/interfaces/Language';
import { IProfileDetails } from '../../src/interfaces/Profile';
import { IProject } from '../../src/interfaces/Project';
import { ISkill } from '../../src/interfaces/Skill';

const fontPath = __dirname + '/fonts/';

export const pdfConfig = {
  margin: 24,
  fontSize: {
    header: 20,
    title: 16,
    subtitle: 12,
    text: 10,
    small: 8
  },
  fonts: {
    light: fontPath + 'light.ttf',
    regular: fontPath + 'regular.ttf',
    medium: fontPath + 'medium.ttf',
    bold: fontPath + 'bold.ttf'
  },
  content: {
    x: 148
  },
  colours: {
    blue: '#1488CC',
    black: '#000'
  }
};

export interface IGenerateData {
  experiences: IExperience[];
  projects: IProject[];
  profileDetails: IProfileDetails;
  education: IEducation[];
  skills: ISkill[];
  languages: ILanguage[];
}
