import React, { FunctionComponent } from 'react';

import TopbarLayout from '../../components/common/TopbarLayout';
import Loader from '../../components/common/Loader';

const SongsList: FunctionComponent = () => {
  return (
    <TopbarLayout title="Canti">
      <Loader />
    </TopbarLayout>
  );
};

export default SongsList;
