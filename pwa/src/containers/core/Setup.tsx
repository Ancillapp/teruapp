import React, { FunctionComponent, useMemo, useState } from 'react';

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
  Skeleton,
} from '@material-ui/core';
import { SearchRounded as SearchIcon } from '@material-ui/icons';

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

const Setup: FunctionComponent = () => {
  const classes = useStyles();

  const { communities, setSelectedCommunity } = useCommunities();

  const [currentCommunity, setCurrentCommunity] = useState<Community | null>(
    null,
  );

  const [search, setSearch] = useState('');

  const communitiesToFilter = useMemo(() => communities || [], [communities]);

  const filteredCommunities = useFullTextSearch(
    communitiesToFilter,
    ['name'],
    search,
  );

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h4">Ciao!</Typography>
        <Typography variant="h5">
          Innanzitutto, seleziona la tua comunità
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
        {!communities || filteredCommunities.length > 0 ? (
          <AutoSizer>
            {({ width, height }) => (
              <FixedSizeList
                width={width}
                height={height}
                itemSize={46}
                itemCount={communities ? filteredCommunities.length : 50}
              >
                {({ index, style }) =>
                  communities ? (
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
                  ) : (
                    <ListItem button style={style} key={index}>
                      <ListItemText
                        primary={<Skeleton variant="text" width={240} />}
                      />
                    </ListItem>
                  )
                }
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

export default Setup;
