import PDFDocument from 'pdfkit';
import fs from 'fs';
import { dialog } from 'electron';
import moment from 'moment';
import { IExperience } from '../../src/interfaces/Experience';
import { IProject } from '../../src/interfaces/Project';
import { IProfileDetails } from '../../src/interfaces/Profile';
import SVGtoPDF from 'svg-to-pdfkit';
import { dribbble, github, linkedin } from '../svgs';
import { IEducation } from '../../src/interfaces/Education';
import { IGenerateData, pdfConfig } from './pdfGenerator.types';
import { addSectionHeader, drawLine, pageBreak } from './utils/layout';
import { generateSkillsSection } from './sections/skills';
import { generateLanguagesSection } from './sections/languages';

const xPosition = pdfConfig.margin; // Adjust this to your desired x position
const lineStartX = xPosition + 125; // Adjust this based on your layout

export function generatePDF(data: IGenerateData, outputPath: string): void {
  const path = dialog.showSaveDialogSync({
    title: 'Save PDF',
    defaultPath: outputPath,
    filters: [
      {
        name: 'PDF',
        extensions: ['pdf']
      }
    ]
  });

  if (!path) {
    return;
  }

  const doc = new PDFDocument({
    font: pdfConfig.fonts.regular,
    margin: pdfConfig.margin
  });

  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#F7FAFF');
  doc.fill('#000');
  doc.image(`${__dirname}/images/background.png`, 0, 0, {
    width: 300,
    height: 300
  });
  doc.pipe(fs.createWriteStream(path));

  doc
    .fontSize(pdfConfig.fontSize.header)
    .font(pdfConfig.fonts.bold)
    .text(data.profileDetails.firstName + ' ' + data.profileDetails.lastName)
    .fontSize(pdfConfig.fontSize.subtitle)
    .font(pdfConfig.fonts.regular)
    .fillColor('#1488CC')
    .text(data.profileDetails.title)
    .fillColor('#000')
    .moveDown(2);

  drawFullLine(doc);

  doc
    .fontSize(pdfConfig.fontSize.text)
    .font(pdfConfig.fonts.medium)
    .text('Phone', lineStartX)
    .font(pdfConfig.fonts.light)
    .text(data.profileDetails.contactNumber, lineStartX, undefined, {
      align: 'justify'
    })
    .moveUp(2)
    .fontSize(pdfConfig.fontSize.text)
    .font(pdfConfig.fonts.medium)
    .text('Email', lineStartX + 200)
    .font(pdfConfig.fonts.light)
    .text(data.profileDetails.email, lineStartX + 200, undefined, {
      align: 'justify'
    })
    .moveDown(1);

  doc
    .fontSize(pdfConfig.fontSize.text)
    .font(pdfConfig.fonts.medium)
    .text('About', lineStartX)
    .font(pdfConfig.fonts.light)
    .text(data.profileDetails.bio, lineStartX, undefined, {
      align: 'justify'
    })
    .moveDown(2);

  addSocials(doc, data.profileDetails);

  addSectionHeader(doc, 'Work Experience');

  let experienceIndex = 0;

  data.experiences
    .sort((a, b) => {
      if (a.startDate > b.startDate) {
        return -1;
      }
      if (a.startDate < b.startDate) {
        return 1;
      }
      return 0;
    })
    .forEach((experience: any) => {
      addExperience(doc, experience);
      // const projects = data.projects.filter(
      //   (project: any) => project.company === experience.id
      // );

      // projects.forEach((project: any) => {
      //   doc
      //     .font(pdf.fonts.bold)
      //     .fontSize(pdf.fontSize.text)
      //     .text(project.name, lineStartX + 20)
      //     .font(pdf.fonts.regular)
      //     .fontSize(pdf.fontSize.text)
      //     .fillColor('#000')
      //     .text(project.description, lineStartX + 20, undefined, {
      //       align: 'justify'
      //     })
      //     .moveDown(1);
      // });

      if (experienceIndex !== data.experiences.length - 1) {
        drawLine(doc);
      }

      experienceIndex++;
    });

  doc.moveDown(2);

  addSectionHeader(doc, 'Noteworthy Projects');

  let projectIndex = 0;

  data.projects
    .sort((a, b) => {
      if (a.startDate > b.startDate) {
        return -1;
      }
      if (a.startDate < b.startDate) {
        return 1;
      }
      return 0;
    })
    .filter((project: any) => project.includeInPdf)
    .forEach((project: IProject) => {
      addProject(doc, project, data.experiences);

      if (
        projectIndex !==
        data.projects.filter((project: any) => project.includeInPdf).length - 1
      ) {
        drawLine(doc);
      }

      projectIndex++;
    });

  addSectionHeader(doc, 'Education & Qualifications');

  let educationIndex = 0;

  data.education
    .sort((a, b) => {
      if (a.startDate > b.startDate) {
        return -1;
      }
      if (a.startDate < b.startDate) {
        return 1;
      }
      return 0;
    })
    .forEach((education) => {
      addEducation(doc, education);

      if (educationIndex !== data.education.length - 1) {
        drawLine(doc);
      }

      educationIndex++;
    });

  generateSkillsSection(doc, data);

  generateLanguagesSection(doc, data);

  doc.end();
}

const drawFullLine = (doc: PDFKit.PDFDocument) => {
  const lineEndX = doc.page.width; // Adjust this based on your layout
  const lineEndY = doc.y;

  doc.lineWidth(1); // Adjust line width if needed
  doc.opacity(0.1);
  doc.moveTo(0, doc.y).lineTo(lineEndX, lineEndY).stroke().moveDown(2);
  doc.opacity(1);
};

const addSocials = (
  doc: PDFKit.PDFDocument,
  profileDetails: IProfileDetails
) => {
  const socialLine = doc.y;

  const socialGap = 175;

  SVGtoPDF(doc, linkedin, lineStartX, socialLine, {
    width: 20,
    height: 20
  });

  doc
    .fontSize(pdfConfig.fontSize.text)
    .font(pdfConfig.fonts.medium)
    .text('LinkedIn', lineStartX + 25, socialLine + 4)
    .link(lineStartX, socialLine, socialGap / 2, 20, profileDetails.linkedin);

  SVGtoPDF(doc, github, lineStartX + socialGap, socialLine, {
    width: 20,
    height: 20
  });

  doc
    .fontSize(pdfConfig.fontSize.text)
    .font(pdfConfig.fonts.medium)
    .text('GitHub', lineStartX + 25 + socialGap, socialLine + 4)
    .link(
      lineStartX + socialGap,
      socialLine,
      socialGap / 2,
      20,
      profileDetails.github
    );

  SVGtoPDF(doc, dribbble, lineStartX + socialGap + socialGap, socialLine, {
    width: 20,
    height: 20
  });

  doc
    .fontSize(pdfConfig.fontSize.text)
    .font(pdfConfig.fonts.medium)
    .text('Dribbble', lineStartX + 25 + socialGap + socialGap, socialLine + 4)
    .link(
      lineStartX + socialGap + socialGap,
      socialLine,
      socialGap / 2,
      20,
      profileDetails.dribbble
    );

  doc.moveDown(2);
};

const addExperience = (doc: PDFKit.PDFDocument, experience: IExperience) => {
  var height = doc.heightOfString(experience.overview, {
    width: 300,
    align: 'justify'
  });

  if (doc.y + height > doc.page.height - pdfConfig.margin) {
    pageBreak(doc, 'Work Experience (Continued)');
  }

  doc
    .font(pdfConfig.fonts.bold)
    .fontSize(pdfConfig.fontSize.text)
    .font(pdfConfig.fonts.medium)
    .text(
      `${moment(experience.startDate).format('MMM YYYY')} - ${
        experience.endDate
          ? moment(experience.endDate).format('MMM YYYY')
          : 'Present'
      }`,
      pdfConfig.content.x
    )
    .fontSize(pdfConfig.fontSize.small)
    .fillColor(pdfConfig.colours.blue)
    .moveDown(1)
    .text(experience.company, pdfConfig.content.x)
    .fillColor('#000')
    .text(experience.location, pdfConfig.content.x)
    .moveUp(4.25)
    .font(pdfConfig.fonts.bold)
    .fontSize(pdfConfig.fontSize.text)
    .text(experience.title, pdfConfig.content.x + 150)
    .moveDown(1)
    .font(pdfConfig.fonts.regular)
    .fontSize(pdfConfig.fontSize.text)
    .text(experience.overview, pdfConfig.content.x + 150, undefined, {
      align: 'justify'
    })
    .moveDown(1);
};

const addProject = (
  doc: PDFKit.PDFDocument,
  project: IProject,
  experiences: IExperience[]
) => {
  var height = doc.heightOfString(project.description, {
    width: 300,
    align: 'justify'
  });

  if (doc.y + height + 100 > doc.page.height - pdfConfig.margin) {
    pageBreak(doc, 'Noteworthy Projects (Continued)');
  }

  doc
    .font(pdfConfig.fonts.bold)
    .fontSize(pdfConfig.fontSize.text)
    .font(pdfConfig.fonts.medium)
    .text(
      `${moment(project.startDate).format('MMM YYYY')} - ${
        project.endDate ? moment(project.endDate).format('MMM YYYY') : 'Present'
      }`,
      pdfConfig.content.x
    )
    .fontSize(pdfConfig.fontSize.small)
    .fillColor(pdfConfig.colours.blue)
    .moveDown(1)
    .text(
      experiences.find((exp) => exp.id === project.company)?.company ??
        'Freelance',
      pdfConfig.content.x
    )
    .fillColor('#000')
    .text(project.role, pdfConfig.content.x)
    .moveUp(4.25)
    .font(pdfConfig.fonts.bold)
    .fontSize(pdfConfig.fontSize.text)
    .text(project.name, pdfConfig.content.x + 150);

  if (project.link) {
    doc
      .link(pdfConfig.content.x + 150, doc.y, 300, 16, project.link)
      .font(pdfConfig.fonts.medium)
      .fontSize(pdfConfig.fontSize.small)
      .fillColor(pdfConfig.colours.blue)
      .text('Link To Project', pdfConfig.content.x + 150)
      .fillColor('#000');
  } else {
    doc
      .font(pdfConfig.fonts.medium)
      .fontSize(pdfConfig.fontSize.small)
      .fillColor(pdfConfig.colours.blue)
      .text('Project viewable upon request', pdfConfig.content.x + 150)
      .fillColor('#000');
  }

  doc
    .moveDown(1)
    .font(pdfConfig.fonts.regular)
    .fontSize(pdfConfig.fontSize.text)
    .text(project.description, pdfConfig.content.x + 150, undefined, {
      align: 'justify'
    })
    .moveDown(1)
    .fontSize(pdfConfig.fontSize.small)
    .font(pdfConfig.fonts.bold)
    // .opacity(0.8)
    .text(project.technologies, pdfConfig.content.x + 150)
    .opacity(1)
    .moveDown(1);
};

const addEducation = (doc: PDFKit.PDFDocument, education: IEducation) => {
  // var height = doc.heightOfString(project.description, {
  //   width: 300,
  //   align: 'justify'
  // });

  if (doc.y + 25 > doc.page.height - pdfConfig.margin) {
    pageBreak(doc, 'Education & Qualifications (Continued)');
  }

  doc
    .fillColor(pdfConfig.colours.black)
    .font(pdfConfig.fonts.bold)
    .fontSize(pdfConfig.fontSize.text)
    .font(pdfConfig.fonts.medium)
    .text(`${moment(education.startDate).format('YYYY')}`, pdfConfig.content.x)
    .moveUp(1)
    .font(pdfConfig.fonts.bold)
    .fontSize(pdfConfig.fontSize.text)
    .text(education.degree, pdfConfig.content.x + 150)
    .font(pdfConfig.fonts.medium)
    .fontSize(pdfConfig.fontSize.small)
    .fillColor(pdfConfig.colours.blue)
    .text(education.school, pdfConfig.content.x + 150);
};
