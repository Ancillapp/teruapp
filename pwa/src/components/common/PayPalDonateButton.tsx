import React, { FunctionComponent, HTMLAttributes } from 'react';

import clsx from 'clsx';

import { makeStyles, Typography } from '@material-ui/core';

export interface PayPalDonateButtonProps
  extends HTMLAttributes<HTMLAnchorElement> {
  hostedButtonId: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#ffc439',
    color: '#111',
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
      marginRight: theme.spacing(0.5),
    },
  },
}));

const PayPalDonateButton: FunctionComponent<PayPalDonateButtonProps> = ({
  hostedButtonId,
  className,
  ...props
}) => {
  const classes = useStyles();

  return (
    <a
      href={`https://www.paypal.com/donate?hosted_button_id=${hostedButtonId}`}
      className={clsx(classes.root, className)}
      target="paypal"
      rel="noopener noreferrer"
      {...props}
    >
      <Typography variant="caption">Dona con</Typography>
      <svg height={18} viewBox="0 0 24 32">
        <path
          fill="#009cde"
          d="M21 9.5c.2-2.1 0-3.5-1.2-4.8-1.2-1.4-3.4-2.1-6.1-2.1h-8c-.4 0-1 .5-1 1L1.2 25.8c0 .4.3.9.8.9H7l-.3 2.2c-.1.4.2.7.5.7h4.2c.4 0 .9-.3 1-.8v-.3l.8-5.2v-.2c.1-.5.6-.9 1-.9h.6c4 0 7.1-1.7 8-6.7.5-2.1.4-3.8-.8-5l-1-1"
        />
        <path
          fill="#012169"
          d="M21 9.5c.2-2.1 0-3.5-1.2-4.8-1.2-1.4-3.4-2.1-6.1-2.1h-8c-.4 0-1 .5-1 1L1.2 25.8c0 .4.3.9.8.9H7l1.3-8.3-.1.3c0-.6.5-1 1.1-1h2.3c4.6 0 8.2-2 9.3-7.6v-.6"
        />
        <path
          fill="#003087"
          d="M9.5 9.5c0-.3.3-.6.5-.8l.5-.1h6.2a12.1 12.1 0 012.6.3l.5.2h.3l.8.4c.3-2.1 0-3.5-1.1-4.9-1.1-1.4-3.3-2-6-2h-8c-.5 0-1 .4-1.2 1L1.3 25.8c0 .4.3.9.8.9H7l1.3-8.3 1.2-8.9z"
        />
      </svg>
      <svg height={18} viewBox="0 0 100 32">
        <path
          fill="#003087"
          d="M12 5H4.2c-.5 0-1 .3-1.1.8L0 25.8c-.1.4.2.7.6.7h3.7c.5 0 1-.4 1.1-.9l.8-5.4a1 1 0 011.1-.9h2.5c5.1 0 8.1-2.5 8.9-7.4.3-2 0-3.8-1-5-1.1-1.3-3.1-2-5.7-2zm.9 7.2C12.5 15 10.3 15 8.3 15H7.1l.8-5.2c0-.3.3-.5.6-.5H9c1.4 0 2.7 0 3.4.8.5.4.7 1.1.5 2.1zM35.2 12.1h-3.7c-.3 0-.6.2-.6.5l-.2 1-.3-.4c-.8-1.2-2.6-1.6-4.4-1.6a8.6 8.6 0 00-8.3 7.5c-.4 2.2.1 4.3 1.4 5.7a6 6 0 004.7 2c3.3 0 5.2-2.2 5.2-2.2l-.2 1c-.1.4.2.8.6.8h3.4c.5 0 1-.4 1.1-.9l2-12.8c.1-.2-.3-.6-.7-.6zm-5.1 7.2c-.4 2.1-2 3.6-4.2 3.6-1.1 0-1.9-.3-2.5-1-.6-.7-.8-1.6-.6-2.6a4.2 4.2 0 014.2-3.6c1.1 0 1.9.4 2.5 1 .5.7.7 1.6.6 2.6zM55.1 12.1h-3.7a1 1 0 00-.9.5l-5.2 7.6-2.2-7.3c-.1-.5-.6-.8-1-.8h-3.7c-.4 0-.8.4-.6 1l4.1 12-3.9 5.4c-.3.4 0 1 .5 1h3.7c.4 0 .7-.2.9-.5l12.5-18c.3-.3 0-.9-.5-.9z"
        />
        <path
          fill="#009cde"
          d="M67.5 5h-7.8c-.5 0-1 .3-1.1.8l-3.1 20c-.1.3.2.6.6.6h4c.4 0 .7-.3.7-.6l.9-5.7a1 1 0 011.1-.9h2.5c5.1 0 8.1-2.5 8.9-7.4.3-2 0-3.8-1-5C72 5.6 70.1 5 67.5 5zm.9 7.2C68 15 65.8 15 63.8 15h-1.2l.8-5.2c0-.3.3-.5.6-.5h.5c1.4 0 2.7 0 3.4.8.5.4.6 1.1.5 2.1zM90.7 12.1H87c-.3 0-.6.2-.6.5l-.2 1-.3-.4c-.8-1.2-2.6-1.6-4.4-1.6a8.6 8.6 0 00-8.3 7.5c-.4 2.2.1 4.3 1.4 5.7a6 6 0 004.7 2c3.3 0 5.2-2.2 5.2-2.2l-.2 1c-.1.4.2.8.6.8h3.4c.5 0 1-.4 1.1-.9l2-12.8c0-.2-.3-.6-.7-.6zm-5.2 7.2c-.4 2.1-2 3.6-4.2 3.6-1.1 0-1.9-.3-2.5-1-.6-.7-.8-1.6-.6-2.6a4.2 4.2 0 014.2-3.6c1.1 0 1.9.4 2.5 1 .6.7.8 1.6.6 2.6zM95.1 5.4l-3.2 20.3c-.1.4.2.7.6.7h3.2c.5 0 1-.4 1.1-.9L100 5.6c.1-.4-.2-.7-.6-.7h-3.6c-.4 0-.6.2-.7.5z"
        />
      </svg>
    </a>
  );
};

export default PayPalDonateButton;
