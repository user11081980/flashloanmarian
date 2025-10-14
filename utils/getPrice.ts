import { JsonRpcProvider } from "ethers";
import { ethers } from "hardhat";
import { factoryAbi, routerAbi, pairAbi} from '../abis/abis';

export const getPrice = async (routerAddress: string, factoryAddress: string, token0Address: string, token1Address: string, provider: JsonRpcProvider) => {
    const routerContract = new ethers.Contract(routerAddress, routerAbi, provider);
    const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, provider);
    
    const pairAddress = await factoryContract.getPair(token0Address, token1Address);
    const pairContract = new ethers.Contract(pairAddress, pairAbi, provider);
    const reserves = await pairContract.getReserves(); // returns an array with amount of token0 in the pool, amount of token1 in the pool, last timestamp when reserves were updated

    const quote = await routerContract.quote( // calculates how much of token1 you would get for swapping token0, based on the current pool reserves. It does not query the blockchain.
        ethers.parseEther("1"),
        reserves[0],
        reserves[1]
    );

    return {
        quote,
        reserves
    };
};