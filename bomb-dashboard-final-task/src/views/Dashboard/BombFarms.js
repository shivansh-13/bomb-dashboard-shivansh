import { Button, Grid } from '@material-ui/core';
import React, { useMemo } from 'react';
import Label from '../../components/Label';
import TokenSymbol from '../../components/TokenSymbol/TokenSymbol';
import TokenSymbolSmall from '../../components/TokenSymbol/TokenSymbolSmall';
import useClaimRewardCheck from '../../hooks/boardroom/useClaimRewardCheck';
import useBank from '../../hooks/useBank';
import useBombStats from '../../hooks/useBombStats';
import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
import useHarvestFromBoardroom from '../../hooks/useHarvestFromBoardroom';
import useModal from '../../hooks/useModal';
import useStake from '../../hooks/useStake';
import useStake2 from '../../hooks/useStake2';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import useStatsForPool from '../../hooks/useStatsForPool';
import useTokenBalance from '../../hooks/useTokenBalance';
import useWithdraw from '../../hooks/useWithdraw';
import useWithdraw2 from '../../hooks/useWithdraw2';
import { getDisplayBalance } from '../../utils/formatBalance';
import DepositModal from '../Bank/components/DepositModal';
import WithdrawModal from '../Bank/components/WithdrawModal';


const BombFarms = () => {
    const bombStats = useBombStats();
    const tokenPriceInDollars = useMemo(
        () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
        [bombStats],
    );
    const canClaimReward = useClaimRewardCheck();
    const earnings = useEarningsOnBoardroom();
    const { onReward } = useHarvestFromBoardroom();
    const stakedBalance = useStakedBalanceOnBoardroom();
    const bankId_BTC = "BombBtcbLPBShareRewardPool";
    const bankId_bshare = "BombBshareLPBShareRewardPool";
    const bank_bshare = useBank(bankId_bshare);
    const bank_BTC = useBank(bankId_BTC);
    let statsOnPool = useStatsForPool(bank_BTC);
    let statsOnPool2 = useStatsForPool(bank_bshare);

    const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);
    const { onStake } = useStake(bank_BTC)
    const { onStake2 } = useStake2(bank_bshare)
    const { onWithdraw } = useWithdraw(bank_BTC)
    const { onWithdraw2 } = useWithdraw2(bank_bshare)
    const tokenBalance = useTokenBalance(bank_BTC.depositToken);

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
    const [onPresentWithdraw2, onDismissWithdraw2] = useModal(
        <WithdrawModal
            max={stakedBalance}
            decimals={bank_bshare.depositToken.decimal}
            onConfirm={(amount) => {
                if (Number(amount) <= 0 || isNaN(Number(amount))) return;
                onWithdraw2(amount);
                onDismissWithdraw2();
            }}
            tokenName={bank_bshare.depositTokenName}
        />,
    );
    const [onPresentDeposit2, onDismissDeposit2] = useModal(
        <DepositModal
            max={tokenBalance}
            decimals={bank_bshare.depositToken.decimal}
            onConfirm={(amount) => {
                if (Number(amount) <= 0 || isNaN(Number(amount))) return;
                onStake2(amount);
                onDismissDeposit2();
            }}
            tokenName={bank_bshare.depositTokenName}
        />,
    );
    return (
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
                <Button
                    style={{ marginLeft: 'auto', fontSize: '15px', color: '#FFFFFF', padding: '5px', borderRadius: '20px', width: '150px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}
                    onClick={onReward}
                    className={earnings.eq(0) || !canClaimReward ? 'shinyButtonDisabledRewards' : 'shinyButtonEnabled'}
                    disabled={earnings.eq(0) || !canClaimReward}
                >
                    Claim All
                    <TokenSymbolSmall symbol="BSHARE" />
                </Button>
            </Grid>
            <div style={{ margin: '20px', paddingBottom: '7px', width: '100%' }}>
                <div style={{ fontSize: '22px', color: '#FFFFFF', display: 'flex', paddingBottom: '7px', width: '100%', borderBottom: 'solid', borderBottomWidth: '0.5px', borderColor: '#C3C5CBBF' }}>
                    <Grid item xs={2}>
                        <TokenSymbol size={22} symbol={bank_BTC.depositTokenName} />
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
                    <Grid container spacing={3} style={{ paddingTop: '7px', fontSize: '16px', color: '#FFFFFF' }}>
                        <Grid item xs={2}>
                            Daily returns: 2%
                        </Grid>
                        <Grid item xs={2} style={{ fontSize: '20px' }}>
                            Your Stake
                            <div style={{ display: 'flex',fontSize: '16px' }}>
                                <TokenSymbol size={22} symbol={bank_BTC.depositTokenName} />
                                <Label text={`${getDisplayBalance(stakedBalance)}`} variant="white" />
                            </div>
                            {/* <Value value={getDisplayBalance(stakedBalance)} /> */}
                            <Label text={`≈ $${tokenPriceInDollars}`} variant="white" />
                        </Grid>
                        <Grid item xs={2} style={{ fontSize: '20px' }}>
                            Earned:
                            <div style={{ display: 'flex' ,fontSize: '16px'}}>
                                <TokenSymbol size={22} symbol={bank_BTC.depositTokenName} />
                                <Label text={`${getDisplayBalance(earnings)}`} variant="white" />
                            </div>
                            {/* <Value value={getDisplayBalance(earnings)} /> */}
                            <Label text={`≈ $${earnedInDollars}`} variant="white" />
                        </Grid>
                        <Grid item xs={2} style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}}>
                            <button disabled={bank_BTC.closedForStaking}
                                onClick={() => (bank_BTC.closedForStaking ? null : onPresentDeposit())} style={{ display: 'flex', flexDirection: 'row', fontSize: '15px', color: '#FFFFFF', paddingLeft: '7px', borderRadius: '30px', width: '120px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>

                                <Grid style={{ padding: '7px' }}> Deposit</Grid>
                                <img src={require('../../assets/img/upArrow.png')} alt={""} height={25} style={{ borderRadius: '50%', padding: '5px' }} />
                            </button>
                        </Grid>
                        <Grid item xs={2} style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}}>
                            <button onClick={onPresentWithdraw} style={{ fontSize: '15px', display: 'flex', flexDirection: 'row', color: '#FFFFFF', paddingLeft: '7px', borderRadius: '30px', width: '130px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>
                                <Grid style={{ padding: '7px' }}> Withdraw</Grid>
                                <img src={require('../../assets/img/downArrow.png')} alt={""} height={25} style={{ borderRadius: '50%', padding: '5px' }} />
                            </button>
                        </Grid>
                        <Grid item xs={2} style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}}>
                            <Button
                                style={{ fontSize: '15px', color: '#FFFFFF', padding: '5px', borderRadius: '20px', width: '150px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}
                                onClick={onReward}
                                className={earnings.eq(0) || !canClaimReward ? 'shinyButtonDisabledRewards' : 'shinyButtonEnabled'}
                                disabled={earnings.eq(0) || !canClaimReward}
                            >
                                Claim Reward
                                <TokenSymbolSmall symbol="BSHARE" />
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
                    <Grid container spacing={3} style={{ fontSize: '20px', color: '#FFFFFF' }}>
                        <Grid item xs={2}>
                            Daily returns: 2%
                        </Grid>
                        <Grid item xs={2} style={{ fontSize: '20px' }}>
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
                        <Grid item xs={2} style={{ fontSize: '20px' }}>
                            Earned:
                            <div style={{ display: 'flex',fontSize: '16px' }}>
                                <TokenSymbolSmall symbol="BSHARE" />
                                <Label text={`${getDisplayBalance(earnings)}`} variant="white" />
                            </div>
                            {/* <Value value={getDisplayBalance(earnings)} /> */}
                            <Label text={`≈ $${earnedInDollars}`} variant="white" />
                        </Grid>
                        <Grid item xs={2} style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}}>
                            <button disabled={bank_bshare.closedForStaking}
                                onClick={() => (bank_bshare.closedForStaking ? null : onPresentDeposit2())} style={{ display: 'flex', flexDirection: 'row', fontSize: '15px', color: '#FFFFFF', paddingLeft: '7px', borderRadius: '30px', width: '120px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>

                                <Grid style={{ padding: '7px' }}> Deposit</Grid>
                                <img src={require('../../assets/img/upArrow.png')} height={25} alt={""} style={{ borderRadius: '50%', padding: '5px' }} />
                            </button>
                        </Grid>
                        <Grid item xs={2} style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}}>
                            <button onClick={onPresentWithdraw2} style={{ fontSize: '15px', display: 'flex', flexDirection: 'row', color: '#FFFFFF', paddingLeft: '7px', borderRadius: '30px', width: '130px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}>
                                <Grid style={{ padding: '7px' }}> Withdraw</Grid>
                                <img src={require('../../assets/img/downArrow.png')} height={25} alt={""} style={{ borderRadius: '50%', padding: '5px' }} />

                                {/* <IconDown/> */}
                            </button>
                        </Grid>
                        <Grid item xs={2} style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}}>
                            <Button
                                style={{ marginLeft: 'auto', fontSize: '15px', color: '#FFFFFF', padding: '5px', borderRadius: '20px', width: '150px', background: 'none', borderStyle: 'solid', borderColor: '#FFFFFF' }}
                                onClick={onReward}
                                className={earnings.eq(0) || !canClaimReward ? 'shinyButtonDisabledRewards' : 'shinyButtonEnabled'}
                                disabled={earnings.eq(0) || !canClaimReward}
                            >
                                Claim Reward
                                <TokenSymbolSmall symbol="BSHARE" />
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div>
            </div>
        </Grid>

    );
};
export default BombFarms;