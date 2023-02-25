import React, { useMemo } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Bank from '../Bank';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import TokenDetails from './TokenDetails';
import ButtonsNewsPanel from './ButtonsNewsPanel';
import BombFarms from './BombFarms';
import BondsPanel from './BondsPanel';
import { Box, Container, CardContent, Typography, Grid } from '@material-ui/core';
import ProgressCountdown from './components/ProgressCountdown';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useBank from '../../hooks/useBank';
import useStatsForPool from '../../hooks/useStatsForPool';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import { Helmet } from 'react-helmet';
import HomeImage from '../../assets/img/background.jpg';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

const TITLE = 'bomb.money | Dashboard';
const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));
const Dashboard = () => {

  const { path } = useRouteMatch();
  const { to } = useTreasuryAllocationTimes();
  const cashStat = useCashPriceInEstimatedTWAP();
  const currentEpoch = useCurrentEpoch();
  const classes = useStyles();

  const bankId_BTC = "BombBtcbLPBShareRewardPool";
  const bank_BTC = useBank(bankId_BTC);

  let statsOnPool = useStatsForPool(bank_BTC);

  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          <Helmet>
            <title>{TITLE}</title>
          </Helmet>
          <Container maxWidth="lg">
            <Box mt={5}>
              <Grid container spacing={3} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', borderStyle: 'none', backgroundColor: ' rgba(35, 40, 75, 0.75' }}>
                <Typography color="textPrimary" align="center" variant="h4" gutterBottom style={{ marginLeft: '10%', width: '80%', paddingTop: '10px', borderBottom: 'solid', borderBottomWidth: '0.5px', borderColor: '#C3C5CBBF', paddingBottom: '7px' }}>
                  Bomb Finance Summary
                </Typography>
                <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '10px', paddingRight: '10px' }}>
                  <Grid item xs={8}>
                    <TokenDetails />
                  </Grid>
                  <Grid item xs={4}>

                    <div className={classes.gridItem} style={{ color: 'white' }} >
                      <CardContent align="center" >
                        <Typography style={{}}>Current Epoch</Typography>
                        <Typography style={{ fontSize: '30px' }}>{Number(currentEpoch)}</Typography>
                      </CardContent>
                    </div>

                    <div className={classes.gridItem} style={{ color: 'white' }} >
                      <CardContent style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '30px' }}>
                          <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch in" />
                        </div>
                        <Typography style={{}}>Next Epoch in</Typography>
                      </CardContent>
                    </div>
                    <div className={classes.gridItem} style={{ color: 'white' }} >
                      <CardContent align="center">
                        <Typography style={{ color: 'rgba(0, 232, 162, 1)' }}>
                          Live TWAP:{scalingFactor}
                        </Typography>
                        <Typography style={{ color: 'rgba(0, 232, 162, 1)' }}>
                          TVL: ${statsOnPool?.TVL}
                        </Typography>
                      </CardContent>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <ButtonsNewsPanel/>
              <BombFarms/>
              <BondsPanel/>
            </Box>
          </Container>
        </Route>
        <Route path={`${path}/:bankId`}>
          <BackgroundImage />
          <Bank />
        </Route>
      </Page>
    </Switch >
  );
};

export default Dashboard;
