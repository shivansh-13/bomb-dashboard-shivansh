import { Grid } from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { BOND_REDEEM_PRICE_BN } from '../../bomb-finance/constants';
import { default as TokenSymbolMedium, default as TokenSymbolSmall } from '../../components/TokenSymbol/TokenSymbolSmall';
import useBombFinance from '../../hooks/useBombFinance';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';
import useBondStats from '../../hooks/useBondStats';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import useTokenBalance from '../../hooks/useTokenBalance';
import { useTransactionAdder } from '../../state/transactions/hooks';
import { getDisplayBalance } from '../../utils/formatBalance';
import ExchangeCardDashboard from '../Bond/components/ExchangeCardDashboard';

const BondsPanel = () => {
 
  const bondStat = useBondStats();
  const bombFinance = useBombFinance();
  const bondBalance = useTokenBalance(bombFinance?.BBOND);
  const cashPrice = useCashPriceInLastTWAP();
  const bondsPurchasable = useBondsPurchasable();
  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const addTransaction = useTransactionAdder();
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);
  const handleBuyBonds = useCallback(

    async (amount) => {
      const tx = await bombFinance.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
      });
    },
    [bombFinance, addTransaction]
  );
return (
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
      <Grid item xs={2}>
        Current Price: (Bomb)^2
        <div style={{ fontSize: '16px', color: '#FFFFFF', paddingTop: '7px' }}>
          {/* tokenName="10,000 BBOND" */}
          {/* description="Current Price: (BOMB)^2" */}
          10,000 BBond={Number(bondStat?.tokenInFtm).toFixed(4) || '-'} BTCB
        </div>
      </Grid>
      <Grid item xs={2}>
        Available to redeem:
        <div style={{ fontSize: '36px', color: '#FFFFFF', paddingTop: '7px' }}>
          <TokenSymbolSmall symbol="BBOND" />{getDisplayBalance(bondBalance)}
        </div>
      </Grid>
      <Grid item xs={8} style={{ display: 'flex' }}>
        <Grid item xs={8}>
          <ExchangeCardDashboard
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
      </Grid>
    </Grid>
  </div>
</div>
</Grid>
);
};

export default BondsPanel;