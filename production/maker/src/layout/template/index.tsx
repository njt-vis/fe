import { render } from 'solid-js/web';

import Swap from '../../swap';

import App from './App';
import { store } from './store';

interface OptionsModel {
  id: string;
  driver: string;
}

class CanvasRenderer extends Swap {
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

const instance = new CanvasRenderer();

export function renderTemplate({ id, driver }: OptionsModel): void {
  instance.mount(id);
  instance.bindDriver(driver);
  instance.startUp();
}
