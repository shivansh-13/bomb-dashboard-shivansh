import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import { ReactComponent as IconDiscord } from '../../assets/img/discord.svg';
import Label from '../../components/Label';
import TokenSymbol from '../../components/TokenSymbol/TokenSymbol';
import TokenSymbolMedium from '../../components/TokenSymbol/TokenSymbolSmall';
import useClaimRewardCheck from '../../hooks/boardroom/useClaimRewardCheck';
import useBank from '../../hooks/useBank';
import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
import useHarvestFromBoardroom from '../../hooks/useHarvestFromBoardroom';
import useModal from '../../hooks/useModal';
import useStake from '../../hooks/useStake';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import useStatsForPool from '../../hooks/useStatsForPool';
import useTokenBalance from '../../hooks/useTokenBalance';
import useWithdraw from '../../hooks/useWithdraw';
import DepositModal from '../Bank/components/DepositModal';
import WithdrawModal from '../Bank/components/WithdrawModal';
import useBombStats from '../../hooks/useBombStats';
import { getDisplayBalance } from '../../utils/formatBalance';

const ButtonsNewsPanel = () => {

    const canClaimReward = useClaimRewardCheck();
    const earnings = useEarningsOnBoardroom();
    const { onReward } = useHarvestFromBoardroom();
    const bankId_BTC = "BombBtcbLPBShareRewardPool";
    const bombStats = useBombStats();
    const bank_BTC = useBank(bankId_BTC);
    let statsOnPool = useStatsForPool(bank_BTC);
    const stakedBalance = useStakedBalanceOnBoardroom();
    const tokenPriceInDollars = useMemo(
        () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
        [bombStats],
    );
    const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

    const { onStake } = useStake(bank_BTC)
    const tokenBalance = useTokenBalance(bank_BTC.depositToken);
    const { onWithdraw } = useWithdraw(bank_BTC)
    const [onPresentDeposit, onDismissDeposit] = useModal(
        <DepositModal
            max={tokenBalance}
            decimals={bank_BTC.depositToken.decimal}
            onConfirm={(amount) => {
                if (Number(amount) <= 0 || isNaN(Number(amount))) return;
                onStake(amount);
                onDismissDeposit();
            }}
            tokenName={bank_BTC.depositTokenName}
        />,
    );
    const [onPresentWithdraw, onDismissWithdraw] = useModal(
        <WithdrawModal
            max={stakedBalance}
            decimals={bank_BTC.depositToken.decimal}
            onConfirm={(amount) => {
                if (Number(amount) <= 0 || isNaN(Number(amount))) return;
                onWithdraw(amount);
                onDismissWithdraw();
            }}
            tokenName={bank_BTC.depositTokenName}
        />,
    );
    return (
        <Grid container spacing={3} style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <Grid item xs={8}>
                <div style={{ textAlign: 'right', padding: '10px' }}>
                    <span><a href="https://docs.bomb.money/welcome-start-here/readme" style={{ color: 'rgba(158, 230, 255, 1)' }}>Read Investment Strategy</a></span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <button style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            width: '100%', margin: '.2rem 0',
                            fontSize: '1.3rem',
                            paddingTop: '7px',
                            paddingBottom: '7px'
                        }}>
                        <a href="https://www.bomb.money/" style={{
                            textDecoration:'none',color:'white'
                        }}>Invest Now </a>
                    </button>
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
                    }> <IconDiscord style={{ fill: '#dddfee', height: '20px' }} /><a href="https://discord.bomb.money"
                        style={{ color: 'black', textDecoration: 'none' }}>Chat on Discord</a></button>
                    <button style={
                        {
                            display: 'flex',
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
                    }>
                        <img src={require('../../assets/img/docsImg.png')} alt={""} height={25} style={{ display: 'flex', borderRadius: '50%', padding: '5px', marginLeft: 'auto' }} />
                        <a
                            style={{ textDecoration: 'none', color: 'black', display: 'flex', paddingTop: '7px', marginRight: 'auto' }}
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
                                <div style={{ textAlign: 'center', fontSize: '16px' }}>
                                    Daily returns:
                                    <br />
                                    {bank_BTC.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%
                                </div>
                            </Grid>
                            <Grid item xs={2} style={{ fontSize: '16px' }}>
                                Your Stake
                                <div style={{ display: 'flex', fontSize: '16px' }}>
                                    <TokenSymbol size={22} symbol={bank_BTC.depositTokenName} />
                                    <Label text={`${getDisplayBalance(stakedBalance)}`} variant="white" />
                                </div>
                                {/* <Value value={getDisplayBalance(stakedBalance)} /> */}
                                <Label text={`≈ $${tokenPriceInDollars}`} variant="white" />
                            </Grid>
                            <Grid item xs={2} style={{ fontSize: '16px' }}>
                                Earned:
                                <div style={{ display: 'flex', fontSize: '16px' }}>
                                    <TokenSymbol size={22} symbol={bank_BTC.depositTokenName} />
                                    <Label text={`${getDisplayBalance(earnings)}`} variant="white" />
                                </div>
                                {/* <Value value={getDisplayBalance(earnings)} /> */}
                                <Label text={`≈ $${earnedInDollars}`} variant="white" />
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{ padding: '7px', display: 'flex', justifyContent: 'center',alignItems:'space-between',marginLeft:'auto' }}>
                                    <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start',paddingRight:'16%' }}>
                                        <button disabled={bank_BTC.closedForStaking}
                                            onClick={() => (bank_BTC.closedForStaking ? null : onPresentDeposit())} style={{ display: 'flex', flexDirection: 'row', fontSize: '15px', color: '#FFFFFF', paddingLeft: '7px', borderRadius: '30px', width: '120px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>

                                            <Grid style={{ padding: '7px' }}> Deposit</Grid>
                                            <img src={require('../../assets/img/upArrow.png')} alt={""} height={25} style={{ borderRadius: '50%', padding: '5px' }} />
                                        </button>
                                    </Grid>
                                    <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end',paddingLeft:'15%' }}>
                                        <button onClick={onPresentWithdraw} style={{ fontSize: '15px', display: 'flex', flexDirection: 'row', color: '#FFFFFF', paddingLeft: '7px', borderRadius: '30px', width: '130px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>
                                            <Grid style={{ padding: '7px' }}> Withdraw</Grid>
                                            <img src={require('../../assets/img/downArrow.png')} alt={""} height={25} style={{ borderRadius: '50%', padding: '5px' }} />
                                        </button>
                                    </Grid>


                                </div>
                                {/* <Grid item xs={2}> */}
                                <Button
                                    style={{ fontSize: '15px', color: '#FFFFFF', padding: '5px', borderRadius: '20px', width: '100%', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}
                                    onClick={onReward}
                                    className={earnings.eq(0) || !canClaimReward ? 'shinyButtonDisabledRewards' : 'shinyButtonEnabled'}
                                    disabled={earnings.eq(0) || !canClaimReward}
                                >
                                    {/* shinyButtonEnabled */}
                                    Claim Reward
                                </Button>
                            </Grid>
                        </Grid>
                    </div >
                </div >
            </Grid >
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

        </Grid >
    );
};
export default ButtonsNewsPanel;