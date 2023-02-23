import React, { useMemo ,useCallback} from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Bank from '../Bank';
import moment from 'moment';
import TokenSymbol from '../../components/TokenSymbol';
import TokenSymbolSmall from '../../components/TokenSymbol/TokenSymbolSmall';
import TokenSymbolMedium from '../../components/TokenSymbol/TokenSymbolSmall';
import ExchangeCard from '../Bond/components/ExchangeCard';
import Label from '../../components/Label';
import { makeStyles } from '@material-ui/core/styles';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import TokenDetails from './TokenDetails';
import useHarvestFromBoardroom from '../../hooks/useHarvestFromBoardroom';
import { ReactComponent as IconDiscord } from '../../assets/img/discord.svg';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';
// import { ReactComponent as IconDown } from '../../assets/img/down-arrow-50.png';
import useRedeem from '../../hooks/useRedeem'
import {useTransactionAdder} from '../../state/transactions/hooks';

import useBombFinance from '../../hooks/useBombFinance';
import { Box, Card, Container, Button, CardContent, Typography, Grid } from '@material-ui/core';
import ProgressCountdown from './components/ProgressCountdown';
import { getDisplayBalance } from '../../utils/formatBalance';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useBank from '../../hooks/useBank';
import useTokenBalance from '../../hooks/useTokenBalance';
import useStatsForPool from '../../hooks/useStatsForPool';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
import Page from '../../components/Page';
import useBombStats from '../../hooks/useBombStats';
import useBondStats from '../../hooks/useBondStats';
//import FarmImage from '../../assets/img/farm.png';
import { createGlobalStyle } from 'styled-components';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import { Helmet } from 'react-helmet';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';

import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN } from '../../bomb-finance/constants';
import useClaimRewardCheck from '../../hooks/boardroom/useClaimRewardCheck';

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
  const bondStat = useBondStats();
  const bombFinance = useBombFinance();
  const bondBalance = useTokenBalance(bombFinance?.BBOND);
  const canClaimReward = useClaimRewardCheck();
  const { path } = useRouteMatch();
  const { to } = useTreasuryAllocationTimes();
  const cashStat = useCashPriceInEstimatedTWAP();
  const currentEpoch = useCurrentEpoch();
  const earnings = useEarningsOnBoardroom();
  const { onReward } = useHarvestFromBoardroom();
  const classes = useStyles();
  const stakedBalance = useStakedBalanceOnBoardroom();
  const bankId = "BombBtcbLPBShareRewardPool";
  const bankId2 = "BombBshareLPBShareRewardPool";
  const bank = useBank(bankId);
  const bank2 = useBank(bankId2);
  const cashPrice = useCashPriceInLastTWAP();
  const bondsPurchasable = useBondsPurchasable();
  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const addTransaction = useTransactionAdder();
  const { onRedeem1 } = useRedeem(bank);
  const { onRedeem2 } = useRedeem(bank2);
  let statsOnPool = useStatsForPool(bank);
  let statsOnPool2 = useStatsForPool(bank2);
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);

  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);
  const handleBuyBonds = useCallback(

    ////// THEEEK KRO ISEEEEEEE
  //   async (amount: string) => {
  //     const tx = await bombFinance.buyBonds(amount);
  //     addTransaction(tx, {
  //       summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
  //     });
  //   },
  //   [bombFinance, addTransaction],
  );
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          <Helmet>
            <title>{TITLE}</title>
          </Helmet>
          <Container maxWidth="lg">
            {/* <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
              Bomb Finance Summary
            </Typography> */}


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

              <Grid container spacing={3} style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <Grid item xs={8}>
                  <a href="https://www.bombmoney.com/" style={{ display: 'flex', flexDirection: 'row', color: 'white', padding: '10px' }}>Read Investment Strategy </a>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <button style={{
                      alignSelf: 'stretch', fontSize: '24px', backgroundColor: 'rgba(180, 225, 245, 0.50)',
                      border: 'solid', color: 'white',
                      borderColor: 'rgba(228, 26, 26, 1)', borderWidth: '0.5px', paddingTop: '7px',
                      paddingBottom: '7px'
                    }}>Invest Now</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <button style={
                      {
                        alignSelf: 'stretch',
                        fontSize: '18px',
                        width: '100%',
                        marginRight: '10px',
                        marginTop: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        border: 'solid',
                        borderColor: 'rgba(114, 140, 223, 1)',
                        borderWidth: '0.5px',
                        marginBottom: '10px',
                        paddingTop: '7px',
                        paddingBottom: '7px'
                      }
                    }> <IconDiscord style={{ fill: '#dddfee', height: '20px' }} />Chat on Discord</button>
                    <button style={
                      {
                        alignSelf: 'stretch',
                        fontSize: '18px',
                        width: '100%',
                        marginLeft: '10px',
                        marginTop: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        border: 'solid',
                        borderColor: 'rgba(114, 140, 223, 1)',
                        borderWidth: '0.5px',
                        marginBottom: '10px'
                      }
                    }>  <a
                      style={{ textDecoration: 'none', color: 'black' }}
                      href="https://docs.bomb.money"
                      // className={'navLink ' + classes.link}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                        Read Docs
                      </a></button>
                  </div>
                  <div style={{ padding: '20px', borderRadius: '10px', borderStyle: 'solid', borderColor: '#728CDF', backgroundColor: ' rgba(35, 40, 75, 0.75)' }}>
                    <div style={{ fontSize: '22px', color: '#FFFFFF', display: 'flex' }}>
                      <Grid item xs={3}>
                        {/* <TokenSymbol size={22} symbol={bank.depositTokenName} /> */}
                        <TokenSymbolMedium symbol="BSHARE" />
                        Boardroom
                      </Grid>

                      <Grid item xs={2}>
                        <button style={{ fontSize: '12px', borderRadius: '3px', color: '#FFFFFF', paddingLeft: '10px', paddingRight: '10px', gap: '10px', background: 'rgba(0, 232, 162, 0.5)', borderStyle: 'none' }}>
                          Recommended
                        </button>
                      </Grid>
                      <Grid item xs={7} style={{ fontSize: '14px', textAlign: 'right' }}>
                        TVL: ${statsOnPool?.TVL}
                      </Grid>

                    </div>
                    <div style={{ fontSize: '12px', color: '#FFFFFF', display: 'flex', borderBottom: 'solid', borderBottomWidth: '0.5px', borderColor: '#C3C5CBBF', paddingTop: '7px', width: '97%', marginLeft: 'auto' }}>
                      Stake BSHARE and earn BOMB every epoch
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
                            {/* <IconDown style={{ fill: '#dddfee', height: '20px' }} /> */}
                            Deposit</button>
                        </Grid>
                        <Grid item xs={2}>

                          <button style={{ fontSize: '12px', color: '#FFFFFF', padding: '5px', borderRadius: '20px', width: '100px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>
                            Withdraw</button>
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            style={{ fontSize: '12px', color: '#FFFFFF', padding: '5px', borderRadius: '20px', width: '120px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}
                            onClick={onReward}
                            className={earnings.eq(0) || !canClaimReward ? 'shinyButtonDisabledRewards' : 'shinyButtonEnabled'}
                            disabled={earnings.eq(0) || !canClaimReward}
                          >
                            {/* shinyButtonEnabled */}
                            Claim Reward
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <Card style={{ borderRadius: '10px', borderStyle: 'solid', borderColor: '#728CDF', backgroundColor: ' rgba(35, 40, 75, 0.75)' }}>
                    <CardContent style={{ textAlign: 'left' }}>
                      <Typography >Latest News</Typography>
                    </CardContent>
                  </Card>
                </Grid>

              </Grid>

              <Grid container spacing={3} style={{ marginTop: '20px', display: 'flex', alignItems: 'center', borderRadius: '10px', borderStyle: 'solid', borderColor: '#728CDF', backgroundColor: ' rgba(35, 40, 75, 0.75)' }}>

                <Grid item xs={10} style={{ padding: '20px' }}>
                  <div style={{ fontSize: '22px', color: '#FFFFFF' }}>
                    Bomb Farms
                  </div>
                  <div style={{ fontSize: '14px', color: '#FFFFFF', }}>
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
                    <Grid item xs={2}>
                      <TokenSymbol size={22} symbol={bank.depositTokenName} />
                      BOMB-BTCB
                    </Grid>
                    <Grid item xs={2}>
                      <button style={{ fontSize: '12px', borderRadius: '3px', color: '#FFFFFF', paddingLeft: '10px', paddingRight: '10px', gap: '10px', background: 'rgba(0, 232, 162, 0.5)', borderStyle: 'none' }}>
                        Recommended
                      </button>
                    </Grid>
                    <Grid item xs={8} style={{ fontSize: '14px', textAlign: 'right' }}>
                      TVL: ${statsOnPool?.TVL}
                    </Grid>
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
                        {/* <button style={{ fontSize: '15px', color: '#FFFFFF', padding: '7px', borderRadius: '20px', width: '100px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>
                          Withdraw
                        </button> */}
                        <button onClick={onRedeem1} style={{ fontSize: '15px', color: '#FFFFFF', padding: '7px', borderRadius: '20px', width: '100px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>
                          Withdraw
                        </button>
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          style={{ fontSize: '12px', color: '#FFFFFF', padding: '5px', borderRadius: '20px', width: '120px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}
                          onClick={onReward}
                          className={earnings.eq(0) || !canClaimReward ? 'shinyButtonDisabledRewards' : 'shinyButtonEnabled'}
                          disabled={earnings.eq(0) || !canClaimReward}
                        >
                          Claim Reward
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </div>

                {/* /////////////////////////////////////////// */}
                <div style={{ width: '100%', borderBottom: 'solid', borderBottomWidth: '0.5px', borderColor: '#00ADE8' }} />
                <div style={{ margin: '20px', paddingBottom: '7px', width: '100%' }}>
                  <div style={{ fontSize: '22px', color: '#FFFFFF', display: 'flex', paddingBottom: '7px', width: '100%', borderBottom: 'solid', borderBottomWidth: '0.5px', borderColor: '#C3C5CBBF' }}>
                    <Grid item xs={2}>
                      <TokenSymbolSmall symbol="BSHARE" />
                      BSHARE-BNB
                    </Grid>
                    <Grid item xs={2}>
                      <button style={{ fontSize: '12px', borderRadius: '3px', color: '#FFFFFF', paddingLeft: '10px', paddingRight: '10px', gap: '10px', background: 'rgba(0, 232, 162, 0.5)', borderStyle: 'none' }}>
                        Recommended
                      </button>
                    </Grid>
                    <Grid item xs={8} style={{ fontSize: '14px', textAlign: 'right' }}>
                      TVL: ${statsOnPool2?.TVL}
                    </Grid>
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
                            <TokenSymbolSmall symbol="BSHARE" />
                            <Label text={`${getDisplayBalance(stakedBalance)}`} variant="white" />
                          </div>
                          {/* <Value value={getDisplayBalance(stakedBalance)} /> */}
                        </div>
                        <Label text={`≈ $${tokenPriceInDollars}`} variant="white" />
                      </Grid>
                      <Grid item xs={2} style={{ fontSize: '16px' }}>
                        Earned:
                        <div style={{ display: 'flex' }}>
                          <TokenSymbolSmall symbol="BSHARE" />
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
                        <button onClick={onRedeem2} style={{ fontSize: '15px', color: '#FFFFFF', padding: '7px', borderRadius: '20px', width: '100px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>
                          Withdraw
                        </button>
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          style={{ fontSize: '12px', color: '#FFFFFF', padding: '5px', borderRadius: '20px', width: '120px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}
                          onClick={onReward}
                          className={earnings.eq(0) || !canClaimReward ? 'shinyButtonDisabledRewards' : 'shinyButtonEnabled'}
                          disabled={earnings.eq(0) || !canClaimReward}
                        >
                          Claim Reward
                        </Button>
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
                  <Grid style={{ fontSize: '22px', color: '#FFFFFF' }}>
                    <TokenSymbolMedium symbol="BBOND" />
                    Bonds
                  </Grid>
                  <div style={{ fontSize: '14px', color: '#FFFFFF', paddingLeft: '10px' }}>
                    BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1
                  </div>
                </Grid>
                <div style={{ padding: '20px' }}>
                  <div>
                    <Grid container spacing={3} style={{ fontSize: '12px', color: '#FFFFFF' }}>
                      <Grid item xs={4}>
                        Current Price: (Bomb)^2
                        <div style={{ fontSize: '16px', color: '#FFFFFF', paddingTop: '7px' }}>
                          {/* tokenName="10,000 BBOND" */}
                          {/* description="Current Price: (BOMB)^2" */}
                          10,000 BBond={Number(bondStat?.tokenInFtm).toFixed(4) || '-'} BTCB
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        Available to redeem:
                        <div style={{ fontSize: '36px', color: '#FFFFFF', paddingTop: '7px' }}>
                          <TokenSymbolSmall symbol="BBOND" />{getDisplayBalance(bondBalance)}
                        </div>
                      </Grid>
                      <Grid item xs={4} style={{ display: 'flex' }}>
                        <Grid item xs={2}>
                          Purchase BBond
                          <ExchangeCard
                            action="Purchase"
                            fromToken={bombFinance.BOMB}
                            fromTokenName="BOMB"
                            toToken={bombFinance.BBOND}
                            toTokenName="BBOND"
                            priceDesc={
                              !isBondPurchasable
                                ? 'BOMB is over peg'
                                : getDisplayBalance(bondsPurchasable, 18, 4) + ' BBOND available for purchase'
                            }
                            onExchange={handleBuyBonds}
                            disabled={!bondStat || isBondRedeemable}
                          />
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
