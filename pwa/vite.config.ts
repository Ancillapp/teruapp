import path from 'path';
import { promises as fs } from 'fs';
import { defineConfig, PluginOption, ResolvedConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { VitePWA } from 'vite-plugin-pwa';
import { minifyHtml } from 'vite-plugin-html';

export default defineConfig(({ mode }) => ({
  plugins: [
    reactRefresh(),
    VitePWA(),
    ((): PluginOption => {
      const manifestName = 'manifest.webmanifest';
      let config: ResolvedConfig;

      return {
        name: 'vite-pwa-manifest-ejection',
        enforce: 'post',
        apply: 'build',
        configResolved: (viteConfig) => {
          config = viteConfig;
        },
        transformIndexHtml: (html) =>
          html.replace(
            `<link rel="manifest" href="${path.join(
              config.base,
              manifestName,
            )}">`,
            '',
          ),
        closeBundle: () => fs.rm(path.join(config.build.outDir, manifestName)),
      };
    })(),
    minifyHtml(),
  ],
  resolve: {
    alias: {
      // TODO: add this alias once Material UI v5 is out
      // '@material-ui/styled-engine': '@material-ui/styled-engine-sc',
      '@material-ui/icons': '@material-ui/icons/esm',
      ...(mode === 'production' && {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
      }),
    },
  },
}));
