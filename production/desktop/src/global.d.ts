declare global {
  interface Window {
    vis: VisSdk;
  }
  /** electron 环境配置 */
  interface EnvConfig {
    projectPage: {
      type: 'url' | 'file';
      url: string;
    };
  }
  /** vis sdk */
  interface OpenProjectFileOptions {
    projectPath: string;
  }
}

export {};
