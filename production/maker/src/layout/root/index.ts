import { INHERENT_COMMANDS } from '../../commands';
import { SIDEBARE_LAYOUT } from '../../constants/layout';
import Swap from '../../swap';

const layoutComponents = ['sidebar'];

interface OptionsModel {
  id: string;
  driver: string;
}

interface LayoutModel {
  sidebar?: SIDEBARE_LAYOUT;
}

class RootContainer extends Swap {
  private container?: HTMLElement;

  private layout: LayoutModel = {
    sidebar: SIDEBARE_LAYOUT.DEFAULT,
  };

  /** 监听相关 */
  private listen = () => {
    this.receiveCommand(
      INHERENT_COMMANDS.RELAYOUT,
      (args: Partial<LayoutModel>) =>
        new Promise(resolve => {
          const layout = { ...this.layout, ...args };
          this.handleLayout(layout, this.layout);
          this.layout = layout;
          resolve(args);
        })
    );
  };

  /** 编辑器布局修改 */
  private handleLayout = (newLayout: LayoutModel, oldLayout: LayoutModel) => {
    layoutComponents.forEach((key: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (newLayout[key] !== oldLayout[key]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.handleLayoutChange(key, newLayout[key]);
      }
    });
  };

  private handleLayoutChange = (key: string, value: string) => {
    switch (key) {
      case 'sidebar':
        this.container?.setAttribute('layout-sidebar', value);
        break;
      default:
    }
  };

  public bind = (id: string) => {
    if (this.container) {
      return;
    }
    this.container = document.getElementById(id) as HTMLElement;
  };

  /** 启用 */
  public startUp = () => {
    this.listen();
  };
}

const instance = new RootContainer();

export function prepare({ id, driver }: OptionsModel): void {
  instance.bind(id);
  instance.bindDriver(driver);
  instance.startUp();
}
