import React, { FunctionComponent } from 'react';

import { Box, BoxProps } from '@material-ui/core';

const TopbarIcon: FunctionComponent<BoxProps> = ({ sx, ...props }) => (
  <Box
    sx={{
      color: 'primary.contrastText',
      ...sx,
    }}
    clone
    {...props}
  />
);

export default TopbarIcon;
