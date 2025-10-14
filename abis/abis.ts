export const factoryAbi: string[] = [
  // Events
  "event PairCreated(address indexed token0, address indexed token1, address pair, uint256)",
  // Functions
  "function INIT_CODE_PAIR_HASH() view returns (bytes32)",
  "function allPairsLength() view returns (uint256)",
  "function getPair(address, address) view returns (address)",
  "function allPairs(uint256) view returns (address)",
  "function createPair(address tokenA, address tokenB) returns (address pair)",
  "function feeTo() view returns (address)",
  "function feeToSetter() view returns (address)",
  "function setFeeTo(address _feeTo)",
  "function setFeeToSetter(address _feeToSetter)"
];

export const routerAbi: string[] = [
  // Functions
  "function factory() view returns (address)",
  "function WETH() view returns (address)",
  "function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) returns (uint amountA, uint amountB, uint liquidity)",
  "function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) payable returns (uint amountToken, uint amountETH, uint liquidity)",
  "function removeLiquidity(address tokenA, address tokenB, uint liquidity, uint amountAMin, uint amountBMin, address to, uint deadline) returns (uint amountA, uint amountB)",
  "function removeLiquidityETH(address token, uint liquidity, uint amountTokenMin, uint amountETHMin, address to, uint deadline) returns (uint amountToken, uint amountETH)",
  "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) returns (uint[] memory amounts)",
  "function swapTokensForExactTokens(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline) returns (uint[] memory amounts)",
  "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) payable returns (uint[] memory amounts)",
  "function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline) returns (uint[] memory amounts)",
  "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) returns (uint[] memory amounts)",
  "function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline) payable returns (uint[] memory amounts)",
  "function quote(uint amountA, uint reserveA, uint reserveB) pure returns (uint amountB)",
  "function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) pure returns (uint amountOut)",
  "function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) pure returns (uint amountIn)",
  "function getAmountsOut(uint amountIn, address[] calldata path) view returns (uint[] memory amounts)",
  "function getAmountsIn(uint amountOut, address[] calldata path) view returns (uint[] memory amounts)"
];

export const pairAbi: string[] = [
  // Events
  "event Approval(address indexed owner, address indexed spender, uint value)",
  "event Transfer(address indexed from, address indexed to, uint value)",
  "event Mint(address indexed sender, uint amount0, uint amount1)",
  "event Burn(address indexed sender, uint amount0, uint amount1, address indexed to)",
  "event Swap(address indexed sender, uint amount0In, uint amount1In, uint amount0Out, uint amount1Out, address indexed to)",
  "event Sync(uint112 reserve0, uint112 reserve1)",
  // Functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint)",
  "function balanceOf(address owner) view returns (uint)",
  "function allowance(address owner, address spender) view returns (uint)",
  "function approve(address spender, uint value) returns (bool)",
  "function transfer(address to, uint value) returns (bool)",
  "function transferFrom(address from, address to, uint value) returns (bool)",
  "function DOMAIN_SEPARATOR() view returns (bytes32)",
  "function PERMIT_TYPEHASH() view returns (bytes32)",
  "function nonces(address owner) view returns (uint)",
  "function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s)",
  "function MINIMUM_LIQUIDITY() pure returns (uint)",
  "function factory() view returns (address)",
  "function token0() view returns (address)",
  "function token1() view returns (address)",
  "function getReserves() view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
  "function price0CumulativeLast() view returns (uint)",
  "function price1CumulativeLast() view returns (uint)",
  "function kLast() view returns (uint)",
  "function mint(address to) returns (uint liquidity)",
  "function burn(address to) returns (uint amount0, uint amount1)",
  "function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data)",
  "function skim(address to)",
  "function sync()"
];