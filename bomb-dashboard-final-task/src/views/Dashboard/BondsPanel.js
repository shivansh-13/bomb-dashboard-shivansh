import React, { useCallback, useMemo } from 'react';
import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN } from '../../bomb-finance/constants';
import useBombFinance from '../../hooks/useBombFinance';
import TokenSymbol from '../../components/TokenSymbol';
import useBondStats from '../../hooks/useBondStats';
import { getDisplayBalance } from '../../utils/formatBalance';
import useTokenBalance from '../../hooks/useTokenBalance';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import { useTransactionAdder } from '../../state/transactions/hooks';
import ExchangeCardDashboard from '../Bond/components/ExchangeCardDashboard';


const card = {
  backdropFilter: 'blur(2px) saturate(180%)',
  backgroundColor: 'rgba(35, 40, 75, 0.75)',
  borderRadius: '12px',
  border: '1px solid rgba(114, 140, 223, 1)',
  padding: '1.5rem 2rem',
  color: 'white',
  marginTop: '2rem'
}
const BondsPanel = () => {

  const tBondStats = useBondStats()
  const bondStat = useBondStats();
  const bombFinance = useBombFinance();
  const bondBalance = useTokenBalance(bombFinance?.BBOND);
  const cashPrice = useCashPriceInLastTWAP();
  const bondsPurchasable = useBondsPurchasable();
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
  const handleRedeemBonds = useCallback(
    async (amount) => {
      const tx = await bombFinance.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} BBOND` });
    },
    [bombFinance, addTransaction],
  );
  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  return (

    <div style={card}>
      <div style={{ display: 'flex', gap: '1rem', color: 'white' }}>
        <span> <TokenSymbol symbol="BBOND" size="50" /></span>
        <div>
          <span style={{ fontSize: '1.2rem', color: 'white', fontWeight: '600' }}>Bonds </span>
          <p style={{ fontSize: '.9rem', fontWeight: '100', marginBottom: '.2rem', color: 'rgba(195, 197, 203, 1)' }}>BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5rem' }}>
        <div style={{ display: 'flex', gap: '7rem', flex: '3', marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
            <span style={{ color: 'rgba(195, 197, 203, 1)' }}>Current Price: (Bomb)^2</span>
            <span style={{ fontSize: '1.3rem' }}>BBond = {Number(tBondStats?.tokenInFtm).toFixed(4)} BTCB</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem', textAlign: 'center' }}>
            <span>Available to redeem: </span>
            <span style={{ fontSize: '1.7rem', display: 'flex', justifyContent: 'center' }}>
              <span><TokenSymbol symbol="BBOND" size="40" /></span><span style={{ alignSelf: 'center' }}>{getDisplayBalance(bondBalance)}</span> </span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: '2' }}>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'space-between', alignItems: 'center', borderBottom: 'solid 1px rgba(195, 197, 203, 0.75)', paddingBottom: '1rem' }}>
            <div>
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
            </div>
          </div>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <ExchangeCardDashboard
                action="Redeem"
                fromToken={bombFinance.BBOND}
                style={{ borderColor: 'white', borderRadius: '1rem' }}
                fromTokenName="BBOND"
                toToken={bombFinance.BOMB}
                toTokenName="BOMB"
                priceDesc={`${getDisplayBalance(bondBalance)} BBOND Available in wallet`}
                onExchange={handleRedeemBonds}
                disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}
                disabledDescription={!isBondRedeemable ? `Enabled when 10,000 BOMB > ${BOND_REDEEM_PRICE}BTC` : null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BondsPanel;