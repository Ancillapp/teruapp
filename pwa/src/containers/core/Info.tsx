import React, { FunctionComponent } from 'react';

import { Link, makeStyles, Typography } from '@material-ui/core';

import Page from '../../components/common/Page';
import TopbarLayout from '../../components/common/TopbarLayout';
import PayPalDonateButton from '../../components/common/PayPalDonateButton';
import BTCPayDonateButton from '../../components/common/BTCPayDonateButton';

const useStyles = makeStyles((theme) => ({
  root: {
    '& pre': {
      margin: 0,
      padding: theme.spacing(1, 2),
      background: theme.palette.background.default,
      borderRadius: theme.shape.borderRadius,
      display: 'inline-block',
    },
  },
  donationButtons: {
    margin: theme.spacing(2, 0, 0),
    display: 'flex',
    flexWrap: 'wrap',

    '& > *': {
      flex: '1 1 auto',
      margin: theme.spacing(0, 1, 2, 1),
    },
  },
}));

const Info: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <TopbarLayout title="Informazioni">
      <Page className={classes.root}>
        <Typography variant="h4">A proposito di Teruapp</Typography>
        <Typography>
          Teruapp è una web app che permette agli utenti di consultare i canti
          delle comunità che hanno aderito al servizio. È nata come spinoff di{' '}
          <Link
            href="https://ancill.app"
            target="ancillapp"
            rel="noopener noreferrer"
          >
            Ancillapp
          </Link>
          , la web app utilizzata dalla{' '}
          <Link
            href="https://www.ffbetania.net"
            target="ffb"
            rel="noopener noreferrer"
          >
            Fraternità Francescana di Betania
          </Link>{' '}
          per consultare i giornali (Ancilla Domini), i canti, le preghiere
          giornaliere, e il breviario della fraternità stessa.
        </Typography>
        <Typography variant="h4">Non trovo la mia comunità!</Typography>
        <Typography>
          Se non trovi la tua comunità, può essere che non sia ancora stata
          aggiunta a Teruapp. Per richiedere di aggiungerla, chiedi ad una
          persona di riferimento della tua comunità di scrivere un'email a{' '}
          <Link
            href="mailto:mail@teru.app"
            target="mail"
            rel="noopener noreferrer"
          >
            mail@teru.app
          </Link>
          . L'utilizzo di Teruapp è gratuito e non è richiesto alcun tipo di
          pagamento per l'inserimento di nuove comunità nella piattaforma.
        </Typography>
        <Typography variant="h4">Supporta Teruapp</Typography>
        <Typography>
          Teruapp è completamente gratuita e senza pubblicità, e i suoi
          sviluppatori investono il proprio tempo libero per lavorarci. Per
          questo motivo, ogni donazione è ben accetta.
        </Typography>
        <div className={classes.donationButtons}>
          <PayPalDonateButton
            hostedButtonId={import.meta.env.VITE_PAYPAL_HOSTED_BUTTON_ID}
          />
          <BTCPayDonateButton
            storeUrl={import.meta.env.VITE_BTCPAY_STORE_URL}
            appId={import.meta.env.VITE_BTCPAY_APP_ID}
          />
        </div>
      </Page>
    </TopbarLayout>
  );
};

export default Info;
