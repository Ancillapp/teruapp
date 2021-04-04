import { createMuiTheme } from '@material-ui/core';
import { itIT } from '@material-ui/core/locale';

import themeBase from './base';

const darkTheme = createMuiTheme(
  {
    ...themeBase,
    palette: {
      mode: 'dark',
      primary: { main: '#ff6f60' },
      secondary: { main: '#ffb300' },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
    },
  },
  itIT,
);

export default darkTheme;
