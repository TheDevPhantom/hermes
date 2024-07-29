import { IGenerateData, pdfConfig } from '../pdfGenerator.types';
import { addSectionHeader } from '../utils/layout';

export const generateLanguagesSection = (
  doc: PDFKit.PDFDocument,
  data: IGenerateData
) => {
  addSectionHeader(doc, 'Spoken Languages');

  data.languages.forEach((language) => {
    doc
      .fillColor(pdfConfig.colours.black)
      .font(pdfConfig.fonts.bold)
      .fontSize(pdfConfig.fontSize.text)
      .text(language.language, pdfConfig.content.x)
      .moveUp(1)
      .font(pdfConfig.fonts.regular)
      .fontSize(pdfConfig.fontSize.text)
      .text(language.level ?? 'None', pdfConfig.content.x + 150)
      .moveDown(1);
  });
};
