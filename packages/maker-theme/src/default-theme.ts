export default {
  name: 'Default Dark',
  type: 'dark',

  colors: {
    // 产品主色调
    primary: '#db6629',
    'primary.disable': '#7e4426',
    'primary.hover': '#ff7a45',
    'primary.active': '#d4380d',

    // 中性色(通用: 文本颜色/无设计颜色功能)
    'gray.01': '#ffffff',
    'gray.02': '#f5f5f5',
    'gray.03': '#d9d9d9',
    'gray.04': '#bfbfbf',
    'gray.05': '#8c8c8c',
    'gray.06': '#595959',
    'gray.07': '#434343',
    'gray.08': '#262626',
    'gray.09': '#1f1f1f',
    'gray.10': '#141414',

    // 功能色
    error: '#f5222d',
    'error.background': '#f5222d',
    'error.background.active': '#cf1322',
    warn: '#fa8c16',
    'warn.background': '#fa8c16',
    'warn.background.active': '#d46b08',
    success: '#52c41a',
    'success.background': '#52c41a',
    'success.background.active': '#389e0d',
    info: '#595959',
    'info.background': '#595959',
    'info.background.active': '#434343',

    // 图标颜色
    icon: '#a1a1a1',
    'icon.active': 'db6629',
    'icon.disabled': '#b1b1b1',

    // 透明底对比色
    'alpha.dark': '#151617',
    'alpha.light': '#202021',

    // 菜单栏(MARK: 菜单栏不进入配置, 根据模式控制)

    // 导航栏
    'nav.background': '#323232',
    'nav.foreground': '#525252',

    // 侧边栏
    'sidebar.background': '#242424',
    'sidebar.foreground': '#3a3a3a',

    // 标尺
    'staff.background': '#1d1e1f',
    'staff.scale': '#4a4b4c',

    // 工具栏(所有编辑类型面板)
    'toolbar.background': '#212121',
    'toolbar.foreground': '#454545',

    // 画布
    'canvas.background': '#131415',

    // 区域分割线
    'layout.split.line': '#000000',

    // 插件属性组件库
    components: {
      'input.background': '#2e2e2e',
      'input.background.focus': '#2e2e2e',
      'input.background.disabled': '#282828',
      'input.border': '#666666',
      'input.border.focus': '#db6629',
      'input.border.disabled': '#5d5d5d',

      'select.background': '#2e2e2e',
      'select.background.disabled': '#282828',
      'select.border': '#666666',
      'select.border.disabled': '#5d5d5d',

      'slider.rail': '#454545',
      'slider.rail.disabled': '#3c3c3c',
      'slider.track': '#db6629',
      'slider.track.disabled': '#7e4426',
      'slider.mark': '#8a8e93',
      'slider.mark.active': '#b8bcc1',
      'slider.mark.disabled': '#868686',
    },

    // 对话框组件库(TODO: 暂时与组件库一致, 后续需要微调)
    modal: {
      background: '#333333',
      foreground: '#1b1b1b',

      'input.background': '#2e2e2e',
      'input.background.focus': '#2e2e2e',
      'input.background.disabled': '#282828',
      'input.border': '#666666',
      'input.border.focus': '#db6629',
      'input.border.disabled': '#5d5d5d',

      'select.background': '#2e2e2e',
      'select.background.disabled': '#282828',
      'select.border': '#666666',
      'select.border.disabled': '#5d5d5d',
    },
  },
};
