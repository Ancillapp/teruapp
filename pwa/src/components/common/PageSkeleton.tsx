import React, { FunctionComponent } from 'react';

import { IconButton, Skeleton } from '@material-ui/core';

import TopbarLayout from './TopbarLayout';
import TopbarIcon from './TopbarIcon';
import Loader from './Loader';

const PageSkeleton: FunctionComponent = () => (
  <TopbarLayout
    startAdornment={
      <TopbarIcon sx={{ mr: 0.5 }}>
        <IconButton edge="start" disabled>
          <Skeleton variant="circular" width={24} height={24} />
        </IconButton>
      </TopbarIcon>
    }
    title={<Skeleton variant="text" width={192} />}
  >
    <Loader />
  </TopbarLayout>
);

export default PageSkeleton;
