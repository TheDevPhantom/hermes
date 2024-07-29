export const splitTextAtFirstSpace = (text: string) => {
  const firstSpaceIndex = text.indexOf(' ');

  if (firstSpaceIndex !== -1) {
    const firstPart = text.substring(0, firstSpaceIndex);
    const remainingPart = text.substring(firstSpaceIndex + 1);
    return [firstPart, remainingPart];
  } else {
    return [text];
  }
};
