enum EVENTS {
  /** 切换 debug 事件 */
  SWITCH_OPEN = 'SWITCH_OPEN',
  /** 重新加载插件 */
  RELOAD_DEBUG_PLUGIN = 'RELOAD_DEBUG_PLUGIN',

  /* MARK: socket 相关 */
  /** 热更成功 */
  HOT_BUILDING = 'HOT_BUILDING',
  /** 热更成功 */
  HOT_BUNDLE_SUCCESS = 'HOT_BUNDLE_SUCCESS',
  /** 热更失败 */
  HOT_BUNDLE_FAILED = 'HOT_BUNDLE_FAILED',
  /** 插件列表更新 */
  PLUGINS_UPDATE = 'PLUGINS_UPDATE',
}

export { EVENTS };
