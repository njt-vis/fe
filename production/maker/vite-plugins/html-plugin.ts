import * as path from 'path';
import * as fs from 'fs';

const folder = path.resolve('page-composition');

const readFile = (file: string) =>
  fs.readFileSync(path.join(folder, file), {
    encoding: 'utf8',
  });

const compositions = [
  {
    match: /<style id="vis-style-theme"><\/style>/,
    content: `<style id="vis-style-theme">${readFile(
      'style-theme.css'
    )}</style>`,
  },
  {
    match: /<style id="vis-style-base"><\/style>/,
    content: `<style id="vis-style-base">${readFile('style-base.css')}</style>`,
  },
  {
    match: /<style data-id="vis-style-editor-structure"><\/style>/,
    content: `<style id="vis-style-editor-structure">${readFile(
      'style-structure.css'
    )}</style>`,
  },
];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const htmlPlugin = () => ({
  name: 'html-transform',
  transformIndexHtml(html: string) {
    let _html = html;

    compositions.forEach(({ match, content }) => {
      _html = _html.replace(match, content);
    });

    return _html;
  },
});
