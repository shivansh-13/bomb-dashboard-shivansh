import React, { useMemo } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Bank from '../Bank';
import moment from 'moment';
import TokenSymbol from '../../components/TokenSymbol';
import Value from '../../components/Value';
import Label from '../../components/Label';
import { makeStyles } from '@material-ui/core/styles';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';

import { Box, Card, Container, CardContent, Typography, Grid } from '@material-ui/core';
import ProgressCountdown from './components/ProgressCountdown';
import { Alert } from '@material-ui/lab';
import { getDisplayBalance } from '../../utils/formatBalance';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useBank from '../../hooks/useBank';
import useStatsForPool from '../../hooks/useStatsForPool';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
import Page from '../../components/Page';
import useBombStats from '../../hooks/useBombStats';
//import FarmImage from '../../assets/img/farm.png';
import { createGlobalStyle } from 'styled-components';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useBanks from '../../hooks/useBanks';
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
  const bombStats = useBombStats();
  const tokenPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );

  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { to } = useTreasuryAllocationTimes();
  const cashStat = useCashPriceInEstimatedTWAP();
  const currentEpoch = useCurrentEpoch();
  const earnings = useEarningsOnBoardroom();
  const activeBanks = banks.filter((bank) => !bank.finished);
  const classes = useStyles();
  const stakedBalance = useStakedBalanceOnBoardroom();
  const bankId = "BombBtcbLPBShareRewardPool";
  const bank = useBank(bankId);
  let statsOnPool = useStatsForPool(bank);
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          <Helmet>
            <title>{TITLE}</title>
          </Helmet>
          <Container maxWidth="lg">
            <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
              Bomb Finance Summary
            </Typography>


            <Box mt={5}>
              <Grid container spacing={3} style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                <Grid item xs={8}>
                  <p>Latest News</p>
                </Grid>
                <Grid item xs={4}>

                  <Card className={classes.gridItem}>
                    <CardContent align="center">
                      <Typography style={{ textTransform: 'uppercase' }}>Current Epoch</Typography>
                      <Typography style={{ fontSize: '30px' }}>{Number(currentEpoch)}</Typography>
                    </CardContent>
                  </Card>


                  <Card className={classes.gridItem}>
                    <CardContent style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '30px' }}>
                        <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch in" />
                      </div>
                      <Typography style={{ textTransform: 'uppercase' }}>Next Epoch in</Typography>
                    </CardContent>
                  </Card>


                  <Card className={classes.gridItem}>
                    <CardContent align="center">
                      <Typography style={{ textTransform: 'uppercase' }}>
                        Live TWAP: {scalingFactor}
                      </Typography>
                      <Typography>TVL: ${statsOnPool?.TVL}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Grid container spacing={3} style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <Grid item xs={8}>
                  <a href="https://www.bombmoney.com/" style={{ display: 'flex', flexDirection: 'row', color: 'white', padding: '10px' }}>Read Investment Strategy </a>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <button style={{ alignSelf: 'stretch', fontSize: '25px' }}>Invest Now</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <button style={{ alignSelf: 'stretch', fontSize: '25px', width: '100%', margin: '10px' }}>Chat on Discord</button>
                    <button style={{ alignSelf: 'stretch', fontSize: '25px', width: '100%', margin: '10px' }}>Read Docs</button>
                  </div>
                </Grid>
                <Grid item xs={4}>

                  <Card style={{ borderRadius: '10px', borderStyle: 'solid', borderColor: '#728CDF', backgroundColor: ' rgba(35, 40, 75, 0.75)' }}>
                    <CardContent style={{ textAlign: 'left' }}>
                      <Typography >Latest News</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <div style={{ padding: '20px', borderRadius: '10px', borderStyle: 'solid', borderColor: '#728CDF', backgroundColor: ' rgba(35, 40, 75, 0.75)' }}>
                  <div style={{ fontSize: '22px', color: '#FFFFFF', display: 'flex' }}>
                    <TokenSymbol size={22} symbol={bank.depositTokenName} />
                    BOMB-BTCB
                    <button style={{ fontSize: '12px', borderRadius: '3px', color: '#FFFFFF', paddingLeft: '10px', paddingRight: '10px', gap: '10px', background: 'rgba(0, 232, 162, 0.5)', borderStyle: 'none' }}>
                      Recommended
                    </button>
                    <Typography>TVL: ${statsOnPool?.TVL}</Typography>
                  </div>
                  <div>
                    <Grid container spacing={4} style={{ fontSize: '12px', color: '#FFFFFF', paddingTop: '7px' }}>
                      <Grid item xs={2}>
                        Daily returns: 2%
                      </Grid>
                      <Grid item xs={2}>
                        Your Stake
                      </Grid>
                      <Grid item xs={2}>
                        Earned
                      </Grid>
                      <Grid item xs={2}>
                        <button style={{ fontSize: '12px', color: '#FFFFFF', padding: '5px', borderRadius: '20px', width: '100px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }} >
                          Deposit</button>
                      </Grid>
                      <Grid item xs={2}>
                        <button style={{ fontSize: '12px', color: '#FFFFFF', padding: '5px', borderRadius: '20px', width: '100px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>
                          Withdraw</button>
                      </Grid>
                      <Grid item xs={2}>
                        <button style={{ fontSize: '12px', color: '#FFFFFF', padding: '5px', borderRadius: '20px', width: '120px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>
                          Claim Rewards
                        </button>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Grid>




              <Grid container spacing={3} style={{ marginTop: '20px', display: 'flex', alignItems: 'center', borderRadius: '10px', borderStyle: 'solid', borderColor: '#728CDF', backgroundColor: ' rgba(35, 40, 75, 0.75)' }}>

                <Grid item xs={10} style={{ padding: '20px' }}>
                  <div style={{ fontSize: '22px', color: '#FFFFFF' }}>
                    Bomb Farms
                  </div>
                  <div style={{ fontSize: '14px', color: '#FFFFFF' }}>
                    Stake your LP tokens in our farms to start earning $BSHARE
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <button style={{ fontSize: '15px', color: '#FFFFFF', padding: '7px', borderRadius: '20px', width: '150px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>
                    Claim All
                  </button>
                </Grid>



                <div style={{ margin: '20px', paddingBottom: '7px', width: '100%' }}>
                  <div style={{ fontSize: '22px', color: '#FFFFFF', display: 'flex', paddingBottom: '7px', width: '100%', borderBottom: 'solid', borderBottomWidth: '0.5px', borderColor: '#C3C5CBBF' }}>
                    <TokenSymbol size={22} symbol={bank.depositTokenName} />
                    BOMB-BTCB
                    <button style={{ fontSize: '12px', borderRadius: '3px', color: '#FFFFFF', paddingLeft: '10px', paddingRight: '10px', gap: '10px', background: 'rgba(0, 232, 162, 0.5)', borderStyle: 'none' }}>
                      Recommended
                    </button>
                    <Typography>TVL: ${statsOnPool?.TVL}</Typography>
                  </div>
                  <div>
                    <Grid container spacing={3} style={{ paddingTop: '7px', fontSize: '12px', color: '#FFFFFF' }}>
                      <Grid item xs={2}>
                        Daily returns: 2%
                      </Grid>
                      <Grid item xs={2} style={{ fontSize: '16px' }}>
                        Your Stake
                        <div style={{ display: 'flex' }}>
                          <TokenSymbol size={22} symbol={bank.depositTokenName} />
                          <Label text={`${getDisplayBalance(stakedBalance)}`} variant="white" />
                        </div>
                        {/* <Value value={getDisplayBalance(stakedBalance)} /> */}
                        <Label text={`≈ $${tokenPriceInDollars}`} variant="white" />
                      </Grid>
                      <Grid item xs={2} style={{ fontSize: '16px' }}>
                        Earned:
                        <div style={{ display: 'flex' }}>
                          <TokenSymbol size={22} symbol={bank.depositTokenName} />
                          <Label text={`${getDisplayBalance(earnings)}`} variant="white" />
                        </div>
                        {/* <Value value={getDisplayBalance(earnings)} /> */}
                        <Label text={`≈ $${earnedInDollars}`} variant="white" />
                      </Grid>
                      <Grid item xs={2}>
                        <button style={{ fontSize: '15px', color: '#FFFFFF', padding: '7px', borderRadius: '20px', width: '100px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>
                          Deposit
                        </button>
                      </Grid>
                      <Grid item xs={2}>
                        <button style={{ fontSize: '15px', color: '#FFFFFF', padding: '7px', borderRadius: '20px', width: '100px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>
                          Withdraw
                        </button>
                      </Grid>
                      <Grid item xs={2}>
                        <button style={{ fontSize: '15px', color: '#FFFFFF', padding: '7px', borderRadius: '20px', width: '150px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>
                          Claim Rewards
                        </button>
                      </Grid>
                    </Grid>
                  </div>
                </div>

                {/* /////////////////////////////////////////// */}
                <div style={{ width: '100%', borderBottom: 'solid', borderBottomWidth: '0.5px', borderColor: '#00ADE8' }} />
                <div style={{ margin: '20px', paddingBottom: '7px', width: '100%' }}>
                  <div style={{ fontSize: '22px', color: '#FFFFFF', display: 'flex', paddingBottom: '7px', width: '100%', borderBottom: 'solid', borderBottomWidth: '0.5px', borderColor: '#C3C5CBBF' }}>
                    <TokenSymbol size={22} symbol={bank.depositTokenName} />
                    BSHARE-BNB
                    <button style={{ fontSize: '12px', borderRadius: '3px', color: '#FFFFFF', paddingLeft: '10px', paddingRight: '10px', gap: '10px', background: 'rgba(0, 232, 162, 0.5)', borderStyle: 'none' }}>
                      Recommended
                    </button>
                    <Typography>TVL: ${statsOnPool?.TVL}</Typography>
                  </div>
                  <div style={{ paddingTop: '7px' }}>
                    <Grid container spacing={3} style={{ fontSize: '12px', color: '#FFFFFF' }}>
                      <Grid item xs={2}>
                        Daily returns: 2%
                      </Grid>
                      <Grid item xs={2} style={{ fontSize: '16px' }}>
                        Your Stake
                        <div style={{ fontSize: '16px' }}>
                          <div style={{ display: 'flex' }}>
                            <TokenSymbol size={22} symbol={bank.depositTokenName} />
                            <Label text={`${getDisplayBalance(stakedBalance)}`} variant="white" />
                          </div>
                          {/* <Value value={getDisplayBalance(stakedBalance)} /> */}
                        </div>
                        <Label text={`≈ $${tokenPriceInDollars}`} variant="white" />
                      </Grid>
                      <Grid item xs={2} style={{ fontSize: '16px' }}>
                        Earned:
                        <div style={{ display: 'flex' }}>
                          <TokenSymbol size={22} symbol={bank.depositTokenName} />
                          <Label text={`${getDisplayBalance(earnings)}`} variant="white" />
                        </div>
                        {/* <Value value={getDisplayBalance(earnings)} /> */}
                        <Label text={`≈ $${earnedInDollars}`} variant="white" />
                      </Grid>
                      <Grid item xs={2}>
                        <button style={{ fontSize: '15px', color: '#FFFFFF', padding: '7px', borderRadius: '20px', width: '100px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>
                          Deposit
                        </button>
                      </Grid>
                      <Grid item xs={2}>
                        <button style={{ fontSize: '15px', color: '#FFFFFF', padding: '7px', borderRadius: '20px', width: '100px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>
                          Withdraw
                        </button>
                      </Grid>
                      <Grid item xs={2}>
                        <button style={{ fontSize: '15px', color: '#FFFFFF', padding: '7px', borderRadius: '20px', width: '150px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>
                          Claim Rewards
                        </button>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div>
                </div>
              </Grid>
              {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}





              <Grid container spacing={3} style={{ marginTop: '20px', display: 'flex', alignItems: 'center', borderRadius: '10px', borderStyle: 'solid', borderColor: '#728CDF', backgroundColor: ' rgba(35, 40, 75, 0.75)' }}>

                <Grid item xs={10} style={{ padding: '20px' }}>
                  <div style={{ fontSize: '22px', color: '#FFFFFF' }}>
                    Bonds
                  </div>
                  <div style={{ fontSize: '14px', color: '#FFFFFF' }}>
                    BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1
                  </div>
                </Grid>
                <div style={{ padding: '20px' }}>
                  <div>
                    <Grid container spacing={3} style={{ fontSize: '12px', color: '#FFFFFF' }}>
                      <Grid item xs={4}>
                        Current Price: (Bomb)^2
                        <p>BBond = </p>
                      </Grid>
                      <Grid item xs={4}>
                        Available to redeem:

                      </Grid>
                      <Grid item xs={4} style={{ display: 'flex' }}>
                        <Grid item xs={2}>
                          Purchase BBond
                        </Grid>
                        <Grid item xs={2}>
                          <button>Purchase</button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Grid>



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
