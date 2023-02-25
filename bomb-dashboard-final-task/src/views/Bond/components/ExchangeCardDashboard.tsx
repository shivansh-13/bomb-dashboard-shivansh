import React from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';
import CardContent from '../../../components/CardContent';
import useBombFinance from '../../../hooks/useBombFinance';
import useModal from '../../../hooks/useModal';
import ExchangeModal from './ExchangeModal';
import ERC20 from '../../../bomb-finance/ERC20';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useCatchError from '../../../hooks/useCatchError';
import { useWallet } from "use-wallet";
import UnlockWallet from '../../../components/UnlockWallet';

interface ExchangeCardProps {
  action: string;
  fromToken: ERC20;
  fromTokenName: string;
  toToken: ERC20;
  toTokenName: string;
  priceDesc: string;
  onExchange: (amount: string) => void;
  disabled?: boolean;
  disabledDescription?: string;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({
  action,
  fromToken,
  fromTokenName,
  toToken,
  toTokenName,
  priceDesc,
  onExchange,
  disabled = false,
  disabledDescription,
}) => {
  const catchError = useCatchError();
  const {
    contracts: { Treasury },
  } = useBombFinance();
  const [approveStatus, approve] = useApprove(fromToken, Treasury.address);

  const { account } = useWallet();
  const balance = useTokenBalance(fromToken);
  const [onPresent, onDismiss] = useModal(
    <ExchangeModal
      title={action}
      description={priceDesc}
      max={balance}
      onConfirm={(value) => {
        onExchange(value);
        onDismiss();
      }}
      action={action}
      tokenName={fromTokenName}
    />,
  );
  return (
    <div>
      <CardContent>
        <StyledCardContentInner>
          <Grid container spacing={3} style={{ fontSize: '12px', color: '#FFFFFF' }}>
            <Grid item xs={6}>
              <StyledCardTitle>{`${action} ${toTokenName}`}</StyledCardTitle>
              <StyledDesc>{priceDesc}</StyledDesc>
            </Grid>
            <Grid item xs={6}>
              <StyledCardActions>
                {!!account ? (
                  <>
                    {approveStatus !== ApprovalState.APPROVED && !disabled ? (
                      <Button
                        style={{width:'200px',borderRadius:'20px'}}
                        className="shinyButtonECD"
                        disabled={approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN}
                        onClick={() => catchError(approve(), `Unable to purchase ${fromTokenName}`)}
                      >
                        {`Purchase ${fromTokenName}`}
                      </Button>
                    ) : (
                      <Button
                        style={{width:'200px',borderRadius:'20px',marginBottom:'auto'}}
                        className={disabled ? 'shinyButtonDisabledECD' : 'shinyButtonECD'}
                        onClick={onPresent}
                        disabled={disabled}
                      >
                        {disabledDescription || action}
                      </Button>
                    )}
                  </>
                ) : (
                  <UnlockWallet />
                )}
              </StyledCardActions>
            </Grid>
          </Grid>
        </StyledCardContentInner>
      </CardContent>
    </div>
  );
};

const StyledCardTitle = styled.div`
  align-items: flex-start;
  flex-direction: row;
  // justify-content: flex-end;  
  display: flex;
  font-size: 20px;
  // font-weight: 700;
  // height: 64px;
  // color: #f9d749;
  margin-top: ${(props) => -props.theme.spacing[3]}px;
`;

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[3]}px;
  width: auto;
  margin-left:auto;
`;
const StyledDesc = styled.div`
font-size:16px 
`;
const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  // justify-content: space-between;
`;

export default ExchangeCard;
