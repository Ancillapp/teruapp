import React, { FunctionComponent, useState } from 'react';

import AutoSizer from 'react-virtualized-auto-sizer';

import { FixedSizeList } from 'react-window';

import {
  Button,
  ListItem,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
  alpha,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

import { useCommunities } from '../../providers/CommunitiesProvider';
import { Community } from '../../models/community';
import useFullTextSearch from '../../hooks/useFullTextSearch';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    height: '100vh',
    maxWidth: theme.breakpoints.width('sm'),
    margin: '0 auto',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',

    '& > *': {
      flex: '0 0 auto',
    },

    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
  list: {
    width: '100%',
    border: `1px solid ${alpha(theme.palette.text.primary, 0.23)}`,
    borderRadius: 4,
    flex: '1 1 auto',
  },
}));

const Wizard: FunctionComponent = () => {
  const classes = useStyles();

  const { communities = [], setSelectedCommunity } = useCommunities();

  const [currentCommunity, setCurrentCommunity] = useState<Community | null>(
    null,
  );

  const [search, setSearch] = useState('');

  const filteredCommunities = useFullTextSearch(communities, ['name'], search);

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h4">Ciao!</Typography>
        <Typography variant="h5">
          Prima di tutto, seleziona la tua comunità
        </Typography>
      </div>
      <TextField
        fullWidth
        size="small"
        InputProps={{ startAdornment: <SearchIcon /> }}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <div className={classes.list}>
        {filteredCommunities.length > 0 ? (
          <AutoSizer>
            {({ width, height }) => (
              <FixedSizeList
                width={width}
                height={height}
                itemSize={46}
                itemCount={filteredCommunities.length}
              >
                {({ index, style }) => (
                  <ListItem
                    button
                    style={style}
                    key={filteredCommunities[index].id}
                    selected={
                      currentCommunity?.id === filteredCommunities[index].id
                    }
                    onClick={() =>
                      setCurrentCommunity(filteredCommunities[index])
                    }
                  >
                    <ListItemText primary={filteredCommunities[index].name} />
                  </ListItem>
                )}
              </FixedSizeList>
            )}
          </AutoSizer>
        ) : (
          <Typography variant="subtitle2" padding={2}>
            Nessun risultato.
          </Typography>
        )}
      </div>
      <Button
        variant="contained"
        disabled={!currentCommunity}
        onClick={() =>
          currentCommunity && setSelectedCommunity(currentCommunity)
        }
      >
        Conferma
      </Button>
    </div>
  );
};

export default Wizard;
