export const SOURCE_ASSETS = [
  { value: "USD", label: "USD" },
] as const;

export const DESTINATION_ASSETS = [
  { value: "USDC", label: "USDC" },
  { value: "USDT", label: "USDT" },
  { value: "PYUSD", label: "PYUSD" },
  { value: "RLUSD", label: "RLUSD" },
  { value: "USDG", label: "USDG" },
  { value: "USDP", label: "USDP" },
  { value: "EURC", label: "EURC" },
  { value: "MXNB", label: "MXNB" },
] as const;

export const FIAT_NETWORKS = [
  { value: "US_ACH", label: "US ACH" },
  { value: "US_FEDWIRE", label: "US Fedwire" },
  { value: "SWIFT", label: "SWIFT" },
] as const;

export const CRYPTO_NETWORKS = [
  { value: "ETHEREUM", label: "Ethereum" },
  { value: "POLYGON", label: "Polygon" },
  { value: "BASE", label: "Base" },
  { value: "ARBITRUM", label: "Arbitrum" },
  { value: "AVALANCHE", label: "Avalanche" },
  { value: "BNBCHAIN", label: "BNB Chain" },
  { value: "SOLANA", label: "Solana" },
] as const;
