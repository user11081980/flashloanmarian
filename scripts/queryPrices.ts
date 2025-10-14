import { ethers, parseEther, parseUnits } from "ethers"
import { Protocols, Routers, dodoV2Pool, factories } from "../constants"
import { ERC20Token } from "../constants/tokens"
import { getPriceInUSDC } from "../utils/getPriceInUSDC"
import { getPrice } from "../utils/getPrice"
import flashloan from "../artifacts/contracts/FlashLoan.sol/Flashloan.json";
import { FlashLoanParams } from "../types";
import { findRouterByProtocol } from "../utils/findRouterByProtocol";
import { executeFlashloan } from "./executeFlashloan";
import * as helpers from "@nomicfoundation/hardhat-network-helpers";
import { factoryAbi } from '../abis/abis';


const MIN_PRICE_DIFF = 1000000 // $10;

async function main() {
    const checkArbitrage = async () => {
        // This line is a temporary fix for https://github.com/NomicFoundation/hardhat/issues/5511
        await helpers.mine()

        const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL!);

        /**/
        const factory = new ethers.Contract(factories.BNBCHAIN_PANCAKESWAP, factoryAbi, provider);
        const len = (await factory.allPairsLength());
        console.log(len)
        /**/

        const pancakeSwapQuote = await getPriceInUSDC({
            router: Routers.BNBCHAIN_PANCAKESWAP,
            factory: factories.BNBCHAIN_PANCAKESWAP,
            tokenAddress: ERC20Token.CAKE.address,
            id: Protocols.PANCAKESWAP,
            provider
        });

        const pancakeSwapQuote2 = await getPrice(Routers.BNBCHAIN_PANCAKESWAP, factories.BNBCHAIN_PANCAKESWAP, ERC20Token.WBNB.address, ERC20Token.CAKE.address, provider);

        console.log(`1 WBNB HERE = ${ethers.formatUnits(pancakeSwapQuote2.quote, ERC20Token.CAKE.decimals)} ${ERC20Token.CAKE.symbol}`);


        console.log(`1 WBNB = ${ethers.formatUnits(pancakeSwapQuote.quote, ERC20Token.CAKE.decimals)} ${ERC20Token.CAKE.symbol}`);

        const uniswapQuote = await getPriceInUSDC({
            router: Routers.BNBCHAIN_UNISWAP_V2,
            factory: factories.BNBCHAIN_UNISWAP_V2,
            tokenAddress: ERC20Token.CAKE.address,
            id: Protocols.UNISWAP_V2,
            provider
        })

        console.log(`1 WBNB = ${ethers.formatUnits(uniswapQuote.quote, ERC20Token.CAKE.decimals)} ${ERC20Token.CAKE.symbol}`);

        /*
        For example:
        PancakeSwap: 1 WBNB = 335.98 CAKE
        Uniswap:     1 WBNB = 335.22 CAKE

        I need the WBNB on the other side
        
        */

        return;
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
  

