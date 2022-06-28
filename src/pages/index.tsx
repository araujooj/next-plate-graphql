import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

// --- Chakra-UI ---
import { Center } from '@chakra-ui/react';

// --- Components ---
const SearchComponent = dynamic(() => import('@components/Search'));

// --- Motion Components ---
import MotionContainer from '@components/Motion/MotionContainer';

// -- Animations --
import { slide } from '@animations';

export default function HomePage() {
	const router = useRouter();

	const handleSearchPokemon = (pokemon?: string) => {
		pokemon &&
			router.push({
				pathname: '/pokemons/[pokemon]',
				query: { pokemon },
			});
	};

	return (
		<>
			<NextSeo
				title="Search"
				description="🦸‍♀️ A super template for Next.js with a pack of incredible tools"
			/>

			<MotionContainer
				w="full"
				h="100vh"
				initial="initial"
				animate="animate"
				exit="exit"
				variants={slide}
			>
				<Center w="full" h="full">
					<SearchComponent handleSearchPokemon={handleSearchPokemon} />
				</Center>
			</MotionContainer>
		</>
	);
}
