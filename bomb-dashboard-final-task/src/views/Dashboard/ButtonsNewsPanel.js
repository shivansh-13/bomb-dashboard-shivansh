import React from 'react';
import TokenSymbolMedium from '../../components/TokenSymbol/TokenSymbolSmall';
import useHarvestFromBoardroom from '../../hooks/useHarvestFromBoardroom';
import { ReactComponent as IconDiscord } from '../../assets/img/discord.svg';
import { Card, Button, CardContent, Typography, Grid } from '@material-ui/core';
import useBank from '../../hooks/useBank';
import useStatsForPool from '../../hooks/useStatsForPool';
import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
import useClaimRewardCheck from '../../hooks/boardroom/useClaimRewardCheck';

const ButtonsNewsPanel = () => {

    const canClaimReward = useClaimRewardCheck();
    const earnings = useEarningsOnBoardroom();
    const { onReward } = useHarvestFromBoardroom();
    const bankId_BTC = "BombBtcbLPBShareRewardPool";
    const bank_BTC = useBank(bankId_BTC);
    let statsOnPool = useStatsForPool(bank_BTC);

    return (
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
                            <Grid item xs={6}>
                                <div style={{ padding: '7px', justifyContent: 'center' }}>
                                    {/* <Grid item xs={3}> */}
                                    <button style={{ marginRight: '7px', fontSize: '12px', color: '#FFFFFF', padding: '5px', borderRadius: '20px', width: '100px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }} >
                                        Deposit</button>
                                    <button style={{ fontSize: '12px', color: '#FFFFFF', padding: '5px', borderRadius: '20px', width: '100px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>
                                        Withdraw</button>
                                    {/* </Grid> */}
                                </div>
                                {/* <Grid item xs={2}> */}
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
                    <CardContent style={{ textAlign: 'left' }}>
                        <Typography ></Typography>
                    </CardContent>
                    <CardContent style={{ textAlign: 'left' }}>
                        <Typography ></Typography>
                    </CardContent>
                    <CardContent style={{ textAlign: 'left' }}>
                        <Typography ></Typography>
                    </CardContent>
                    <CardContent style={{ textAlign: 'left' }}>
                        <Typography ></Typography>
                    </CardContent>
                    <CardContent style={{ textAlign: 'left' }}>
                        <Typography ></Typography>
                    </CardContent>
                    <CardContent style={{ textAlign: 'left' }}>
                        <Typography ></Typography>
                    </CardContent>
                    <CardContent style={{ textAlign: 'left' }}>
                        <Typography ></Typography>
                    </CardContent>
                    <CardContent style={{ textAlign: 'left' }}>
                        <Typography ></Typography>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    );
};
export default ButtonsNewsPanel;