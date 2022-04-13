declare type Constructor<T> = new (...args: any[]) => T;

declare namespace PluginModel {
  type TypeSidebarItem = 'SIDEBAR_ITEM';
  type TypeElement = 'ELEMENT';
  /** 插件类型 */
  type Type = TypeSidebarItem | TypeElement;
  /** 插件资源 */
  type Resources = Sidebar.Resources;
}

declare namespace Nav {
  type Name = 'string' | 'array';
}

declare namespace Sidebar {
  /** 左侧边栏布局模式  */
  type LayoutMode = 'shrink' | 'stretch';
  /** 做侧边栏插件 schema  */
  interface SchemaItem {
    name: string;
    displayName: string;
    description: string;
    type: string;
    version: string;
    icon: string;
    itemIcon: string;
    engines: {
      vis: string;
    };
  }
  /** 做侧边栏渲染数据格式 */
  type ItemModel = SchemaItem & {
    /** 图标 svg 纯文本 */
    itemIconCtx?: string;
    /** debug: 是否为 debug 组件 */
    debug?: boolean;
    /** debug: 调试服务连接地址 */
    hostname?: string;
    /** debug: 端口号 */
    port?: number;
    /** debug: 是否连接成功 */
    connected?: boolean;
  };
  /** 侧边栏展开视图数据格式 */
  type UnfoldModel = {
    name: string;
    resources: Sidebar.Resources;
  };
  /** 做侧边栏显示状态 */
  interface MakerStore {
    /** 侧边栏当前展开插件 */
    active: string;
    /** 侧边栏渲染列表 */
    plugins: ItemModel[];
  }
  /** 左侧边栏插件资源格式 */
  interface Resources {
    main: {
      js: string;
      css: string;
    };
  }
}

declare namespace SystemModel {
  interface Props<T> {
    default: Constructor<T>;
  }
}

declare namespace Debug {
  interface PluginSetting {
    name: string;
    hostname: string;
    port: number;
    connected: string;
  }
}

declare namespace PluginMode {
  // 插件资源
  type Resources<T extends string> = {
    [k in T]: {
      js: string;
      css: string;
    };
  };
}
