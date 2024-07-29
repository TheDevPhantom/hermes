import { pdfConfig } from '../pdfGenerator.types';
import { splitTextAtFirstSpace } from './strings';

export const addSectionHeader = (doc: PDFKit.PDFDocument, text: string) => {
  if (doc.y + 100 > doc.page.height - pdfConfig.margin) {
    pageBreak(doc);
  }

  let yPosition = pdfConfig.margin; // Adjust this to your desired y position
  const lineHeight = pdfConfig.fontSize.subtitle; // Adjust this to your desired line height
  const lineStartY = doc.y + yPosition; // Adjust this based on your layout

  const lines = splitTextAtFirstSpace(text); // Split the text into lines

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    doc
      .fontSize(lineHeight)
      .font(pdfConfig.fonts.bold)
      .fillColor(i === 0 ? pdfConfig.colours.black : pdfConfig.colours.blue)
      .text(line, pdfConfig.margin);
    yPosition += lineHeight; // Move to the next line
  }

  const lineEndX = doc.page.width - pdfConfig.margin; // Adjust this based on your layout
  const lineEndY = lineStartY;

  doc.lineWidth(1); // Adjust line width if needed
  doc
    .moveTo(pdfConfig.margin + 125, lineStartY)
    .lineTo(lineEndX, lineEndY)
    .stroke(pdfConfig.colours.blue)
    .moveDown(1)
    .fillColor(pdfConfig.colours.black);
};

export const pageBreak = (doc: PDFKit.PDFDocument, text: string = '') => {
  doc.addPage();
  addBackground(doc);

  doc
    .fontSize(pdfConfig.fontSize.small)
    .font(pdfConfig.fonts.bold)
    .opacity(0.3)
    .text(text)
    .opacity(1)
    .moveDown(2);
};

export const addBackground = (doc: PDFKit.PDFDocument) => {
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#F7FAFF');
  doc.fill('#000');
};

export const drawLine = (doc: PDFKit.PDFDocument) => {
  const lineEndX = doc.page.width - pdfConfig.margin; // Adjust this based on your layout
  doc.moveDown(1);
  const lineEndY = doc.y;

  doc.lineWidth(1); // Adjust line width if needed
  doc
    .opacity(0.2)
    .moveTo(pdfConfig.margin + 125, doc.y)
    .lineTo(lineEndX, lineEndY)
    .stroke(pdfConfig.colours.blue)
    .moveDown(1)
    .opacity(1);
};
