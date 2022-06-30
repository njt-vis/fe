import { colord } from 'colord';

import themeDefault from 'default-theme';
import viewConfig from './view-config';

interface ThemeModel {
  [key: string]: ThemeModel | string;
}

interface ThemeFlattenModel {
  [key: string]: string;
}

function updateThemeElement(style: string) {
  const id = viewConfig.element;
  let element = document.getElementById(id);

  if (!element) {
    element = document.createElement('style');
    element.id = id;
    document.head.appendChild(element);
  }

  element.textContent = style;
}

const PREFFIX = 'vis';

/**
 * flat json depth greater or equal to 2
 * @param {ThemeModel} json
 * @param {string} preffix
 */
function flatJson(json: ThemeModel, preffix = ''): ThemeFlattenModel {
  const flatten: ThemeFlattenModel = {};

  for (const key in json) {
    if (typeof json[key] === 'string') {
      const color = `--${PREFFIX}-${
        preffix ? `${preffix}.` : ''
      }${key}`.replace(/\./g, '-') as string;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      flatten[color] = json[key];
    } else {
      Object.assign(flatten, flatJson(json[key] as ThemeModel, key));
    }
  }
  return flatten;
}

function hex2Rgb(theme: ThemeFlattenModel): ThemeFlattenModel {
  const themeRgb: ThemeFlattenModel = {};

  Reflect.ownKeys(theme).forEach((key): void => {
    const { r, g, b } = colord(theme[key as string]).toRgb();
    themeRgb[`${key as string}-rgb`] = `${r}, ${g}, ${b}`;
  });

  return themeRgb;
}

/**
 * set using theme colors
 * @param {ThemeModel} theme - not must
 */
export function setTheme(theme?: ThemeModel): void {
  const themeJson = {
    // default
    ...flatJson(themeDefault.colors),
    // using
    ...(theme ? flatJson(theme) : {}),
  };
  const themeRgb = hex2Rgb(themeJson);
  let content = '';

  Reflect.ownKeys({ ...themeJson, ...themeRgb }).forEach(key => {
    content += `${key as string}: ${
      { ...themeJson, ...themeRgb }[key as string]
    };\n`;
  });

  const style = `
*, ::before, ::after {
  ${content}
}
  `;
  updateThemeElement(style);
}
