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
    },
  },
  itIT,
);

export default darkTheme;
