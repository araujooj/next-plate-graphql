import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

// --- Hooks ---
// import { useFetch } from '@hooks/useFetch';

// --- Chakra-UI---
import { Alert, AlertIcon, Spinner } from '@chakra-ui/react';

// --- Motion Components ---
import MotionBox from '@components/Motion/MotionBox';

// --- Components ---
const GoBackButtonComponent = dynamic(() => import('@components/GoBackButton'));
const PokemonComponent = dynamic(() => import('@root/src/components/Pokemon'));

// -- Animations --
import { slide } from '@animations';
import { PokemonEnum, useGetPokemonByNameQuery } from '@root/src/graphql/generated';

export default function PokemonPage() {
	const router = useRouter();
	const pokemon = router.query?.pokemon as string;

	const constraintsRef = useRef(null);

	const { data, error, loading } = useGetPokemonByNameQuery({
		variables: {
			pokemon: pokemon as PokemonEnum,
		},
	});

	return (
		<>
			<NextSeo />

			<MotionBox
				w="full"
				h="100vh"
				initial="initial"
				animate="animate"
				exit="exit"
				variants={slide}
			>
				<GoBackButtonComponent path="/" />

				<MotionBox
					w="full"
					h="full"
					display="grid"
					placeItems="center"
					ref={constraintsRef}
				>
					{error && (
						<Alert w="md" borderRadius="xl" status="error">
							<AlertIcon />
							{error.message}
						</Alert>
					)}

					{loading && <Spinner color="white" size="xl" />}

					{data?.getPokemon && (
						<PokemonComponent pokemon={data} constraintsRef={constraintsRef} />
					)}
				</MotionBox>
			</MotionBox>
		</>
	);
}
