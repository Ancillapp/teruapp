import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig(({ mode }) => ({
  plugins: [reactRefresh()],
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
