import React, { FunctionComponent } from 'react';

import TopbarLayout, {
  TopbarLayoutProps,
} from '../../components/common/TopbarLayout';
import Loader from '../../components/common/Loader';

const SongsList: FunctionComponent<TopbarLayoutProps> = (props) => {
  return (
    <TopbarLayout title="Canti" {...props}>
      <Loader />
    </TopbarLayout>
  );
};

export default SongsList;
