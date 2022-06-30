import { ipcRenderer } from 'electron';

import { ARGV_PROJECT_PATH } from '../constants/process-argv';
import { OPEN_PROJECT_FILE } from '../constants/ip-events';

const argv = [ARGV_PROJECT_PATH];

/** 参数 key 格式转换 */
function camelcase(str: string): string {
  return str
    .replace(/^--/, '')
    .split('-')
    .reduce((str, word) => str + word[0].toUpperCase() + word.slice(1));
}

/** 提取参数, 转为对象格式 */
function extractOptions(): Record<string, any> {
  const state: Record<string, any> = {};
  process.argv
    .filter(str => argv.includes(str.split('=')[0]))
    .forEach(str => {
      const option = str.split('=');
      state[camelcase(option[0])] = option[1] as string;
    });
  return state;
}

function openProjectFile(projectPath: string): void {
  ipcRenderer.send(OPEN_PROJECT_FILE, { projectPath });
}

const config = extractOptions();

const SDK: VisSdk = {
  // TODO: 后续使用 navigator 打开文件
  // onNavigatorPush: (cb: (e: any) => void) => {
  //   ipcRenderer.on(NAVIGATOR_PUSH, cb);
  // },
  // onNavigatorRemove: (cb: (e: any) => void) => {
  //   ipcRenderer.on(NAVIGATOR_REMOVE, cb);
  // },
  getProjectPath(): string {
    return config.projectPath;
  },
  openProjectFile,
};

export default SDK;
