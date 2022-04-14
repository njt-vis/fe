/* @refresh reload */
import { ControlCenter } from '@njt-vis/maker-comm-hub';
import { setTheme } from '@njt-vis/maker-theme';
import { prepare as prepareRoot } from './layout/root';
import { renderMenu } from './layout/menu';
import { renderSidebar } from './layout/sidebar';
import { renderNav } from './layout/nav';
import { renderAttrbar } from './layout/attrbar';
import { inherentCommands } from './commands';

const { DRIVERS, prepare, registerCommand } = ControlCenter;

/** 注册内置指令指令 */
function registerInherentCommands() {
  inherentCommands.forEach(command => {
    registerCommand(command);
  });
}

function bootstrap() {
  setTheme();

  prepareRoot({
    id: 'vis-editor',
    driver: DRIVERS.ROOT,
  });
  renderMenu({
    id: 'vis-menu',
    driver: DRIVERS.MENU,
  });
  renderSidebar({
    id: 'vis-sidebar',
    driver: DRIVERS.SIDEBAR,
  });
  renderNav({
    id: 'vis-nav',
    driver: DRIVERS.NAV,
  });
  renderAttrbar({
    id: 'vis-attrbar',
    driver: DRIVERS.ATTRBAR,
  });
}

function renderLayout() {
  registerInherentCommands();
  bootstrap();
  prepare();
}

/* TODO: 渲染前置执行 */
renderLayout();
