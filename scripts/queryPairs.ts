import { ethers, parseEther, parseUnits } from "ethers"
import { Protocols, Routers, dodoV2Pool, factories } from "../constants"
import { ERC20Token } from "../constants/tokens"
import { getPriceInUSDC } from "../utils/getPriceInUSDC"
import flashloan from "../artifacts/contracts/FlashLoan.sol/Flashloan.json";
import { FlashLoanParams } from "../types";
import { findRouterByProtocol } from "../utils/findRouterByProtocol";
import { executeFlashloan } from "./executeFlashloan";
import * as helpers from "@nomicfoundation/hardhat-network-helpers";

import factoryAbi from "../abis/factoryAbi.json";
import pairAbi from "../abis/pairAbi.json";

const MIN_PRICE_DIFF = 1000000 // $10;

const BUSD_ADDRESS = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

const minABI = [
  // Function signature for symbol(): (returns string)
  'function symbol() view returns (string)',
];

async function main() {
    const checkArbitrage = async () => {
        // This line is a temporary fix for https://github.com/NomicFoundation/hardhat/issues/5511
        await helpers.mine()

        const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL!);
        const factory = new ethers.Contract(factories.BNBCHAIN_PANCAKESWAP, factoryAbi, provider);
        const allPairsLength = await factory.allPairsLength();

        for (let i = 0; i < allPairsLength; i++) {
            const pairAddress = await factory.allPairs(i);
            const pair = new ethers.Contract(pairAddress, pairAbi, provider);

            const token0 = await pair.token0();
            const token1 = await pair.token1();

            if (
                token0.toLowerCase() === BUSD_ADDRESS.toLowerCase() ||
                token1.toLowerCase() === BUSD_ADDRESS.toLowerCase()
            ) {
                const otherToken = token0.toLowerCase() === BUSD_ADDRESS.toLowerCase() ? token1 : token0;
                const otherTokenContract = new ethers.Contract(otherToken, minABI, provider);
                const otherTokenSymbol = await otherTokenContract.symbol();
                console.log(`Pair: ${pairAddress} | BUSD & ${otherTokenSymbol}`);
            }
        }

        return;

        const quotes = [sushiQuote, quickQuote];

        const min = quotes.reduce((min, obj) => (obj.quote < min.quote) ? obj : min);
        const max = quotes.reduce((max, obj) => (obj.quote > max.quote) ? obj : max);

        const biggestPriceDiff = max.quote - min.quote;

        console.log("Biggest price difference $", ethers.formatUnits(biggestPriceDiff, 6));

    }

    try {
        // setInterval(checkArbitrage, 5000);
        checkArbitrage();
    } catch (error) {
        console.log(error);
    }

}

main().catch((error) => { // Runs the scheduled jobs
    console.error(error);
    process.exitCode = 1;
});


