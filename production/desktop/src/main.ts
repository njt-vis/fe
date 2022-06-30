import { app, BrowserWindow, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { OPEN_PROJECT_FILE } from './constants/ip-events';
import { ARGV_PROJECT_PATH } from './constants/process-argv';

const { NODE_ENV } = process.env;

const ENV_CONFIG: EnvConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, `../var/${NODE_ENV}.config.json`), {
    encoding: 'utf-8',
  })
);

const isDev = NODE_ENV === 'development';

let mainWindow: BrowserWindow | null = null;

const webPreferences = {
  nodeIntegration: true,
  preload: path.join(__dirname, 'preload/main.js'),
  webviewTag: true,
};

function createMainWindow() {
  mainWindow = new BrowserWindow({
    // width: 1200,
    // height: 800,
    // 同全屏
    // kiosk: true,
    skipTaskbar: true,
    resizable: true,
    // alwaysOnTop: true,
    vibrancy: 'content',
    center: true,
    title: '',
    webPreferences,
  });

  mainWindow.loadFile(path.join(__dirname, '../index.html'));
  // mainWindow.webContents.openDevTools({ mode: 'undocked' });
}

type OpenBrowserWindowOptions = {
  type: 'file' | 'url';
  url: string;
  argv?: string[];
};

/** 打开新窗口 */
function openBrowserWindow({ type, url, argv }: OpenBrowserWindowOptions) {
  const view = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      ...webPreferences,
      additionalArguments: argv,
    },
  });
  // mainWindow.addTabbedWindow(view);

  switch (type) {
    case 'file':
      view.webContents.loadFile(url);
      break;
    case 'url':
      view.webContents.loadURL(url);
      break;
    default:
  }
  return view;
}

/** app 钩子 */
function appHooks() {
  app.once('ready', () => {
    createMainWindow();

    mainWindow.once('closed', () => {
      mainWindow = null;
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
  });

  app.on('window-all-closed', () => app.quit());
}

/** 打开项目文件 */
function openProjectFile(
  _event: Electron.IpcMainEvent,
  options: OpenProjectFileOptions
) {
  const { projectPath } = options;
  const type = isDev ? 'url' : 'file';
  const win = openBrowserWindow({
    type,
    url: ENV_CONFIG.projectPage.url,
    argv: [`${ARGV_PROJECT_PATH}=${projectPath}`],
  });
  win.webContents.openDevTools({ mode: 'detach' });
  mainWindow.minimize();
}

/** 监听主进程 ipc 通信 */
function listenIpcMain() {
  ipcMain.on(OPEN_PROJECT_FILE, openProjectFile);
}

function main() {
  appHooks();
  listenIpcMain();
}

main();
