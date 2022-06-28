import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

// --- Apollo ---
import { ApolloProvider } from '@apollo/client';
import { client } from '../services/apollo';

// --- Chakra-UI ---
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@styles/theme';

// --- Analysis (optional) ---
// import '@scripts/wdyr';

// --- Configs ---
import SEO from '@root/next-seo.config';

// --- Components ---
import MainContentComponent from '@components/MainContent';

export default function _app({ Component, pageProps, router: { route } }: AppProps) {
	return (
		<>
			<DefaultSeo {...SEO} />
			<ApolloProvider client={client}>
				<ChakraProvider theme={theme}>
					<MainContentComponent>
						<Component {...pageProps} key={route} />
					</MainContentComponent>
				</ChakraProvider>
			</ApolloProvider>
		</>
	);
}
