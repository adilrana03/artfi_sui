import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@mysten/dapp-kit/dist/index.css";
import { WalletKitProvider } from "@mysten/wallet-kit";
import { getFullnodeUrl } from "@mysten/sui.js/client";
import {
	SuiClientProvider,
	createNetworkConfig,
	WalletProvider,
} from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient();

	const { networkConfig } = createNetworkConfig({
		localnet: { url: getFullnodeUrl("localnet") },
		devnet: { url: getFullnodeUrl("devnet") },
		mainnet: { url: getFullnodeUrl("mainnet") },
	});

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<SuiClientProvider
					networks={networkConfig}
					defaultNetwork='devnet'>
					<WalletKitProvider>
						<WalletProvider autoConnect>
							<Component {...pageProps} />
						</WalletProvider>
					</WalletKitProvider>
				</SuiClientProvider>
			</QueryClientProvider>
		</>
	);
}
