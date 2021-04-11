import React, { FunctionComponent, HTMLAttributes } from 'react';

import clsx from 'clsx';

import { makeStyles, Typography } from '@material-ui/core';

export interface BTCPayDonateButtonProps
  extends HTMLAttributes<HTMLAnchorElement> {
  storeUrl: string;
  appId: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#0f3b21',
    color: '#fff',
    borderRadius: theme.shape.borderRadius,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 220,
    padding: theme.spacing(1),
    willChange: 'transform',
    transition: theme.transitions.create('box-shadow', {
      duration: 300,
    }),

    '&:hover, &:active': {
      boxShadow: 'inset 0 0 100px 100px rgb(0 0 0 / 5%)',
    },

    '& > *': {
      display: 'inline-block',
    },

    '& > *:not(:last-child)': {
      marginRight: theme.spacing(0.75),
    },
  },
}));

const BTCPayDonateButton: FunctionComponent<BTCPayDonateButtonProps> = ({
  storeUrl,
  appId,
  className,
  ...props
}) => {
  const classes = useStyles();

  return (
    <a
      href={`${storeUrl}/apps/${appId}/pos`}
      className={clsx(classes.root, className)}
      target="btcpay"
      rel="noopener noreferrer"
      {...props}
    >
      <Typography variant="caption">Dona con</Typography>
      <svg viewBox="0 0 105.5 188.5" height={18}>
        <path
          fill="#cedc21"
          d="M117.2 247.3a11 11 0 01-11-11V69.9a11 11 0 1122.1 0v166.4a11 11 0 01-11 11z"
          transform="translate(-106.2 -58.9)"
        />
        <path
          fill="#51b13e"
          d="M117.3 247.3a11 11 0 01-4.8-21l66.7-31.6-68.5-50.5a11 11 0 1113.1-17.8l83.3 61.4a11 11 0 01-1.8 18.9L122 246.3a11 11 0 01-4.8 1z"
          transform="translate(-106.2 -58.9)"
        />
        <path
          fill="#cedc21"
          d="M117.3 182a11 11 0 01-6.6-20l68.5-50.5-66.7-31.6a11 11 0 019.5-20l83.3 39.6a11 11 0 011.8 18.8l-83.3 61.5a11 11 0 01-6.5 2.1z"
          transform="translate(-106.2 -58.9)"
        />
        <path fill="#1e7a44" d="M22.1 70.9v46.7l31.7-23.3-31.7-23.4z" />
        <path fill="#fff" d="M0 51.3h22.1v53.9H0z" />
        <path
          fill="#cedc21"
          d="M128.3 70a11 11 0 10-22.1 0v139h22.1z"
          transform="translate(-106.2 -58.9)"
        />
      </svg>
      <Typography variant="caption">criptovalute</Typography>
    </a>
  );
};

export default BTCPayDonateButton;
