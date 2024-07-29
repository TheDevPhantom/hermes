import { IGenerateData, pdfConfig } from '../pdfGenerator.types';
import { addSectionHeader, drawLine, pageBreak } from '../utils/layout';
import { ISkill } from '../../../src/interfaces/Skill';
import { pluralize } from '../../../src/utils/stringUtils';

export const generateSkillsSection = (
  doc: PDFKit.PDFDocument,
  data: IGenerateData
) => {
  addSectionHeader(doc, 'Skills Summary');

  // group skills by years of experience
  const skillsByExperience = data.skills.reduce((acc, skill) => {
    if (!acc[skill.yearsOfExperience]) {
      acc[skill.yearsOfExperience] = [];
    }
    acc[skill.yearsOfExperience].push(skill);
    return acc;
  }, {} as Record<number, ISkill[]>);

  const yearsOfExperience = Object.keys(skillsByExperience).sort(
    (a, b) => +b - +a
  );

  let skillIndex = 0;

  yearsOfExperience.forEach((years) => {
    const skills = skillsByExperience[+years];
    addSkillGroup(
      doc,
      `${years} ${pluralize(parseInt(years), 'Year')}`,
      skills
    );

    if (skillIndex !== yearsOfExperience.length - 1) {
      drawLine(doc);
    }

    skillIndex++;
  });
};

const addSkillGroup = (
  doc: PDFKit.PDFDocument,
  years: string,
  skills: ISkill[]
) => {
  if (doc.y + 50 > doc.page.height - pdfConfig.margin) {
    pageBreak(doc, 'Education & Qualifications (Continued)');
  }

  doc
    .fillColor(pdfConfig.colours.black)
    .font(pdfConfig.fonts.bold)
    .fontSize(pdfConfig.fontSize.text)
    .font(pdfConfig.fonts.medium)
    .text(years, pdfConfig.content.x)
    .moveUp(1)
    .font(pdfConfig.fonts.bold)
    .fontSize(pdfConfig.fontSize.text)
    .text(
      skills.map((skill) => skill.name).join(', '),
      pdfConfig.content.x + 150
    );
};
