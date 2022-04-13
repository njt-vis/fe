import { createEffect, For, onCleanup } from 'solid-js';

// import { sidebar } from '@njt-vis/maker-inherent-sdk';
import { onPluginHotReplace, offPluginHotReplace } from '@njt-vis/store-debug';
import { SidebarItemBonder } from '@njt-vis/maker-adapter';

type UnfoldContainerProps = {
  app: Sidebar.ItemModel;
};

type AppUnfoldProps = {
  store: Sidebar.MakerStore;
};

function getUnfoldContainerId(name: string) {
  return `sidebar-tiem-unfold-${name}`;
}

const pluginMaps = new Map<string, SidebarItemBonder>();

function UnfoldContainer({ app }: UnfoldContainerProps) {
  const id = getUnfoldContainerId(app.name);

  const hotReplace = () => {
    pluginMaps.get(app.name)?.remount(app);
  };

  createEffect(() => {
    let bonder = pluginMaps.get(app.name);
    // MARK: 在依赖项变化时做旧粘接器利用
    if (bonder) {
      bonder.remount(app);
    } else {
      bonder = new SidebarItemBonder({
        el: document.getElementById(id) as HTMLElement,
        app,
      });
      bonder?.mount();
      pluginMaps.set(app.name, bonder);
      // 监听重载
      app.debug && onPluginHotReplace(app.name, hotReplace);
    }
  });
  onCleanup(() => {
    pluginMaps.get(app.name)?.destroy();
    // 移除重载监听
    app.debug && offPluginHotReplace(app.name, hotReplace);
    // MARK: 销毁时需要移除旧粘接器
    pluginMaps.delete(app.name);
  });

  return (
    <div>
      <div id={id}></div>
    </div>
  );
}

function AppUnfold({ store }: AppUnfoldProps) {
  return (
    <div className="layout-sidebar-fold">
      {
        <For each={store.plugins}>
          {item => <UnfoldContainer app={item}></UnfoldContainer>}
        </For>
      }
    </div>
  );
}

export default AppUnfold;
