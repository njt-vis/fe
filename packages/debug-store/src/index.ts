import { io, Socket } from 'socket.io-client';

import { common, Listener } from '@njt-vis/utils';
import * as sidebar from './sidebar/index';

import {
  extractDiffTypePlugins,
  getDebugPlugins,
  PluginSettingMode,
} from './utils';
import { EVENTS } from './events';

export interface DebugStoreModel {
  isOpen: boolean;
  plugins: PluginSettingMode[];
}

const listener = new Listener();

const socketMap = new Map<string, Socket>();

const originStore: DebugStoreModel = Object.create({
  isOpen: false,
  plugins: [
    {
      name: 'vis-charts',
      hostname: '127.0.0.1',
      port: 3010,
      connected: false,
    },
    {
      name: 'vis-charts-2',
      hostname: '127.0.0.1',
      port: 3011,
      connected: false,
    },
  ],
});

const store = common.createDisabledProxy<DebugStoreModel>(originStore);

/** 获取 debug 开启/关闭 */
const isOpen = (): boolean => store.isOpen;

/** 获取插件配置信息 */
const getDebugSetting = (): DebugStoreModel => store;

const onDebugSettingChange = (fn: (data: DebugStoreModel) => void): void => {
  listener.on(EVENTS.DEBUG_SETTING_UPDATE, () => {
    fn(store);
  });
};

/** 监听 debug 开启/关闭 */
const onOpenChange = (fn: (isOpen: boolean) => void): void => {
  listener.on(EVENTS.SWITCH_OPEN, () => {
    fn(store.isOpen);
  });
};

/** socket 连接 */
const connectPlugin = (app: Sidebar.ItemModel): void => {
  const { hostname, port } = app;
  const socket = io(`http://${hostname}:${port}`);
  // client-side
  socket.on('connect', () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    socketMap.set(app.name, socket);
  });
  socket.on('broadcast', res => {
    switch (res?.name) {
      case EVENTS.HOT_BUNDLE_SUCCESS:
        listener.emit(
          `${EVENTS.RELOAD_DEBUG_PLUGIN}:${res?.application?.name}`
        );
        break;
      default:
    }
  });
};

const onPluginHotReplace = (name: string, fn): void => {
  listener.on(`${EVENTS.RELOAD_DEBUG_PLUGIN}:${name}`, fn);
};

const offPluginHotReplace = (name: string, fn): void => {
  listener.off(`${EVENTS.RELOAD_DEBUG_PLUGIN}:${name}`, fn);
};

/** 开启/关闭 debug */
const switchOpen = async (): Promise<null> => {
  try {
    const debugPlugins = await getDebugPlugins(store.plugins);
    const isOpen = !store.isOpen;
    originStore.isOpen = isOpen;
    listener.emit(EVENTS.SWITCH_OPEN);
    const typePlugins = extractDiffTypePlugins(debugPlugins);
    const pluginsSidebarItem = typePlugins.find(
      item => item.type === 'SIDEBAR_ITEM'
    );
    const plugins = pluginsSidebarItem?.plugins ?? [];
    sidebar.updatePlugins(plugins);

    plugins.forEach(app => {
      connectPlugin(app);
    });
    return null;
  } catch (error) {
    throw new Error(String(error));
  }
};

export {
  isOpen,
  switchOpen,
  onOpenChange,
  getDebugSetting,
  onDebugSettingChange,
  onPluginHotReplace,
  offPluginHotReplace,
  sidebar,
  EVENTS,
};
