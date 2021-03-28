import { createMuiTheme } from '@material-ui/core/styles';
import { itIT } from '@material-ui/core/locale';

import themeBase from './base';

const lightTheme = createMuiTheme(
  {
    ...themeBase,
    palette: {
      mode: 'light',
      primary: { main: '#d32f2f' },
      secondary: { main: '#ffb300' },
    },
  },
  itIT,
);

export default lightTheme;
