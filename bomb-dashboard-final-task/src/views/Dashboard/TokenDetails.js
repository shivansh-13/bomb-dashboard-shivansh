import React, { useMemo } from 'react';
import TokenSymbolSmall from '../../components/TokenSymbol/TokenSymbolSmall';
import useBombStats from '../../hooks/useBombStats';
import useBondStats from '../../hooks/useBondStats';
import usebShareStats from '../../hooks/usebShareStats';
import { roundAndFormatNumber } from '../../0x';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import { Box, Button,  Grid } from '@material-ui/core';
import useBombFinance from '../../hooks/useBombFinance';
const TokenDetails = () => {
    // const classes = useStyles();
    const bombStats = useBombStats();
    const bShareStats = usebShareStats();
    const tBondStats = useBondStats();
    const bombFinance = useBombFinance();

    const bombPriceInDollars = useMemo(
        () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
        [bombStats],
    );
    const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
    const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);

    const bSharePriceInDollars = useMemo(
        () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
        [bShareStats],
    );
    const bShareCirculatingSupply = useMemo(
        () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
        [bShareStats],
    );
    const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

    const tBondPriceInDollars = useMemo(
        () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
        [tBondStats],
    );
    const tBondCirculatingSupply = useMemo(
        () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
        [tBondStats],
    );
    const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* BOMB */}
            <div style={{ display: 'flex', flexDirection: 'row', color: 'white' }}>
                <Grid item xs={2}></Grid>
                <Grid item xs={2} style={{ borderBottom: 'solid', borderBottomWidth: '0.5px', borderColor: '#C3C5CBBF',paddingBottom:'7px',fontsize:'12px'}}>Current Supply</Grid>
                <Grid item xs={2} style={{ borderBottom: 'solid', borderBottomWidth: '0.5px', borderColor: '#C3C5CBBF',paddingBottom:'7px',fontsize:'12px'}}>Total Supply</Grid>
                <Grid item xs={2} style={{ borderBottom: 'solid', borderBottomWidth: '0.5px', borderColor: '#C3C5CBBF',paddingBottom:'7px',fontsize:'12px'}}>Price</Grid>
                <Grid item xs={2} style={{ borderBottom: 'solid', borderBottomWidth: '0.5px', borderColor: '#C3C5CBBF',paddingBottom:'7px',fontsize:'12px'}}></Grid>
            </div>
            < Grid item xs={12} sm={12} >
                <div style={{ display: 'flex', flexDirection: 'row', color: 'white',padding:'7px' }}>
                    {/* <CardContent align="center" style={{ position: 'relative' }}> */}
                    <Grid item xs={2}>
                        <TokenSymbolSmall symbol="BOMB" />
                        BOMB
                    </Grid>
                    {/* <h2 style={{ marginBottom: '10px' }}>BOMB</h2> */}
                    {/* 10,000 BOMB (1.0 Peg) = */}
                    <Grid item xs={2}>
                        <span style={{ fontSize: '16px' }}>
                            {roundAndFormatNumber(bombCirculatingSupply, 2)}
                        </span>
                    </Grid>
                    <Grid item xs={2}>
                        <Box>
                            <span style={{ fontSize: '16px' }}>
                                {roundAndFormatNumber(bombTotalSupply, 2)}
                            </span>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                            ${bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'} / BOMB
                        </span>
                        {/* <span style={{ fontSize: '12px' }}>
                            Circulating Supply: {roundAndFormatNumber(bombCirculatingSupply, 2)} <br />
                            Total Supply: {roundAndFormatNumber(bombTotalSupply, 2)}
                        </span> */}
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            onClick={() => {
                                bombFinance.watchAssetInMetamask('BOMB');
                            }}
                        // style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
                        >
                            {' '}
                            <b>+</b>&nbsp;&nbsp;
                            <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
                        </Button>
                    </Grid>
                    {/* </CardContent> */}
                </div>
            </Grid >

            {/* BSHARE */}
            < Grid item xs={12} sm={12} >
                <div style={{ display: 'flex', flexDirection: 'row', color: 'white' ,padding:'7px'}}>
                    {/* <CardContent align="center" style={{ position: 'relative' }}> */}

                    <Grid item xs={2}>
                        <TokenSymbolSmall symbol="BSHARE" />
                        BSHARE
                    </Grid>
                    {/* <h2 style={{ marginBottom: '10px' }}>BSHARE</h2> */}
                    {/* Current Price */}
                    <Grid item xs={2}>
                        {roundAndFormatNumber(bShareCirculatingSupply, 2)}
                    </Grid>
                    <Grid item xs={2}>
                        {roundAndFormatNumber(bShareTotalSupply, 2)}
                    </Grid>
                    <Grid item xs={2}>
                        <Box>

                            <span style={{ fontSize: '16px' }}>
                                ${bSharePriceInDollars ? bSharePriceInDollars : '-.--'} / BSHARE
                            </span>

                        </Box>

                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            onClick={() => {
                                bombFinance.watchAssetInMetamask('BSHARE');
                            }}
                        // style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
                        >
                            {' '}
                            <b>+</b>&nbsp;&nbsp;
                            <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
                        </Button>
                    </Grid>
                    {/* </CardContent> */}
                </div>
            </Grid >

            {/* BBOND */}
            < Grid item xs={12} sm={12} >
                <div style={{ display: 'flex', flexDirection: 'row', color: 'white',padding:'7px' }}>
                    {/* <CardContent align="center" style={{ position: 'relative' }}> */}
                    <Grid item xs={2}>
                        <TokenSymbolSmall symbol="BBOND" />
                        BBOND
                    </Grid>
                    <Grid item xs={2}>
                        <span style={{ fontSize: '16px' }}>
                            {roundAndFormatNumber(tBondCirculatingSupply, 2)}
                        </span>
                    </Grid>
                    <Grid item xs={2}>
                        <span style={{ fontSize: '16px' }}>
                            {roundAndFormatNumber(tBondTotalSupply, 2)}
                        </span>

                    </Grid>
                    <Grid item xs={2}>
                        <Box>
                            <span style={{ fontSize: '16px' }}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'} / BBOND</span>
                        </Box>

                    </Grid>
                    <Grid item xs={2}>

                        <Button
                            onClick={() => {
                                bombFinance.watchAssetInMetamask('BBOND');
                            }}
                        // style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
                        >
                            {' '}
                            <b>+</b>&nbsp;&nbsp;
                            <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
                        </Button>
                    </Grid>
                </div>
            </Grid >
        </div >
    );
};

export default TokenDetails;