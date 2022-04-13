import classNames from 'classnames';
import { Component, For } from 'solid-js';
import './App.less';

interface PropsModel {
  store: Sidebar.MakerStore;
  onItemClick: (name: string) => void;
}

const formatSymbolId = (name: string) => `sidebar-symbol-${name}`;

const App: Component<PropsModel> = ({ store, onItemClick }) => (
  <div class="layout-sidebar scollbar-thin">
    <svg
      aria-hidden="true"
      style="position: absolute; width: 0px; height: 0px; overflow: hidden;"
    >
      <For each={store.plugins}>
        {item => (
          <symbol
            id={formatSymbolId(item.name)}
            viewBox="0 0 1024 1024"
            innerHTML={item.itemIconCtx}
          ></symbol>
        )}
      </For>
    </svg>
    <For each={store.plugins}>
      {item => (
        <div
          className={classNames('sidebar-item', {
            's-active': store.active === item.name,
          })}
          onClick={() => onItemClick(item.name)}
        >
          <svg class="item-icon" aria-hidden="true">
            <use href={`#${formatSymbolId(item.name)}`}></use>
          </svg>
        </div>
      )}
    </For>
  </div>
);

export default App;
