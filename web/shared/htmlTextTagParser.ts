export const extractPlainTextFromHTML = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const tagsToReplaceWithNewline = ['br', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'hr'];
  tagsToReplaceWithNewline.forEach((tag) => {
    doc.body.querySelectorAll(tag).forEach((element) => {
      element.replaceWith('\n' + element.textContent);
    });
  });
  return doc.body.textContent?.trim() || '';
};
