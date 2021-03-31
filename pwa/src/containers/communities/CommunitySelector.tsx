import React, { FunctionComponent } from 'react';

import clsx from 'clsx';

import { Autocomplete, makeStyles, TextField } from '@material-ui/core';

import { Community } from '../../models/community';
import { useCommunities } from '../../providers/CommunitiesProvider';

const useStyles = makeStyles(() => ({
  input: {
    // TODO: discover why we need to set this as important since our styles
    // should be injected after and be more specific than the default ones
    paddingRight: '32px !important',
  },
  option: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const CommunitySelector: FunctionComponent = () => {
  const classes = useStyles();

  const {
    communities = [],
    selectedCommunity = null,
    setSelectedCommunity,
  } = useCommunities();

  return (
    <Autocomplete
      size="small"
      fullWidth
      disableClearable
      options={communities}
      value={selectedCommunity as Community}
      onChange={(_, newCommunity) => setSelectedCommunity(newCommunity)}
      renderInput={(textFieldProps) => (
        <TextField
          label="Comunità"
          {...textFieldProps}
          inputProps={{
            ...textFieldProps.inputProps,
            className: clsx(textFieldProps.inputProps.className, classes.input),
          }}
        />
      )}
      renderOption={(optionProps, option) => (
        <li
          {...optionProps}
          title={option.name}
          className={clsx(optionProps.className, classes.option)}
        >
          {option.name}
        </li>
      )}
      getOptionLabel={({ name }) => name}
      getOptionSelected={(option, value) => option.id === value.id}
    />
  );
};

export default CommunitySelector;
