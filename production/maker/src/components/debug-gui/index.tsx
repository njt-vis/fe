import { render } from 'solid-js/web';

// import {} from '@njt-vis/debug-store';

import Swap from '../../swap';

import App from './App';
import { store } from './store';

interface OptionsModel {
  id: string;
  driver: string;
}

class NavRenderer extends Swap {
  /** renderer container element */
  private container?: HTMLElement;

  /** 监听相关 */
  private listen = () => {};

  public mount = (id: string) => {
    if (this.container) {
      return;
    }
    const AppWrapper = () => <App store={store} />;

    render(() => <AppWrapper />, document.getElementById(id) as HTMLElement);
  };

  /** 启用 */
  public startUp = () => {
    this.listen();
  };
}

const instance = new NavRenderer();

export function renderDebugGui({ id, driver }: OptionsModel): void {
  instance.mount(id);
  instance.bindDriver(driver);
  instance.startUp();
}
