export const fluentTestnet = {
    id: 20994,
    name: "Fluent Testnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://rpc.testnet.fluent.xyz/"],
      },
    },
    blockExplorers: {
      default: {
        name: "Fluent Explorer",
        url: "https://testnet.fluentscan.xyz/",
      },
    },
    testnet: true,
};
