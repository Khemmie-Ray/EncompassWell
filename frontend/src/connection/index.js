import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

export const SUPPORTED_CHAIN = 123454321;

export const isSupportedChain = (chainId) =>
  Number(chainId) === SUPPORTED_CHAIN;

const OpSepolia = {
  chainId: 11155420,
  name: 'Op Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia-optimistic.etherscan.io',
  rpcUrl: import.meta.env.VITE_INFURA_RPC
}

const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://localhost:5173',
  icons: ['https://localhost:5173']
}

export const configWeb3Modal = () => createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [OpSepolia],
  projectId: import.meta.env.VITE_PROJECTID,
  enableAnalytics: false,
  themeVariables: {
    '--w3m-accent': '#B9A7C3',
    // '--w3m-color-mix-strength': '40',
  }
})
