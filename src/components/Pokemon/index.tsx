import dynamic from 'next/dynamic';

// --- Chakra-UI ---
import {
	Avatar,
	Badge,
	Center,
	Divider,
	Heading,
	HStack,
	Link,
	List,
	ListItem,
	Stack,
	Text,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';

// --- Motion Components ---
const MotionBox = dynamic(() => import('@components/Motion/MotionBox'));

// --- Icons ---
import { GiBroadsword, GiCalculator, GiShield } from 'react-icons/gi';

// --- Animations ---
import { zoom } from '@animations';
import {
	GetPokemonByNameQuery,
	GetPokemonByNameQueryResult,
} from '@root/src/graphql/generated';

// --- Component Props Interface ---
interface IPokemonProps {
	pokemon: GetPokemonByNameQuery;
	constraintsRef?: React.MutableRefObject<any>;
}

export default function PokemonComponent({
	pokemon,
	constraintsRef,
}: IPokemonProps): JSX.Element {
	return (
		<MotionBox
			maxW="2xl"
			p="4"
			bgColor="gray.600"
			borderWidth="thin"
			borderColor="gray.700"
			borderRadius="2xl"
			cursor="move"
			drag
			dragConstraints={constraintsRef}
			dragElastic={0.5}
			whileHover={zoom}
			whileDrag={{ opacity: 0.5 }}
		>
			<Stack direction={['column', 'row']} spacing="4">
				<Center h="fit-content" marginTop={[-14, 0]}>
					<Avatar
						size="xl"
						borderWidth="medium"
						borderColor="purple.300"
						src={pokemon.getPokemon.sprite}
						name={pokemon.getPokemon.key}
						ignoreFallback
					/>
				</Center>
				<Stack>
					<Stack spacing="1">
						{pokemon.getPokemon.key && (
							<Heading
								size="lg"
								lineHeight="none"
								color="purple.300"
								textAlign={{ base: 'center', sm: 'left' }}
							>
								{pokemon.getPokemon.key}
							</Heading>
						)}
						<Link
							href={`https://www.pokemon.com/br/pokedex/${pokemon.getPokemon.key}`}
							isExternal
							w={{ base: 'full', md: 'fit-content' }}
							display="flex"
							alignItems="center"
							gap="1"
							justifyContent={{ base: 'center', sm: 'left' }}
							color="gray.300"
							_hover={{ color: 'white' }}
						>
							{pokemon.getPokemon.types}
						</Link>
					</Stack>
					<Wrap justify={{ base: 'center', sm: 'left' }}>
						<WrapItem>
							<Badge
								variant="solid"
								colorScheme="green"
								display="flex"
								alignItems="center"
								gap="1"
								borderRadius="md"
							>
								<GiCalculator />
								<HStack divider={<Text mx="1">·</Text>}>
									<HStack>
										<Text fontSize="sm">
											<Text as="strong">{pokemon.getPokemon.weight}</Text>
											<Text as="span" textTransform="none" fontWeight="normal" ml="1">
												weight
											</Text>
										</Text>
									</HStack>
									<HStack>
										<Text fontSize="sm">
											<Text as="strong">{pokemon.getPokemon.height}</Text>
											<Text as="span" textTransform="none" fontWeight="normal" ml="1">
												height
											</Text>
										</Text>
									</HStack>
								</HStack>
							</Badge>
						</WrapItem>
						<WrapItem>
							<Badge
								variant="solid"
								colorScheme="yellow"
								display="flex"
								alignItems="center"
								gap="1"
								borderRadius="md"
							>
								<GiBroadsword />
								<Text as="strong" fontSize="sm">
									{pokemon.getPokemon.baseStats.attack}
								</Text>
							</Badge>
						</WrapItem>
						{pokemon.getPokemon.species && (
							<WrapItem>
								<Badge
									variant="solid"
									colorScheme="blue"
									display="flex"
									alignItems="center"
									gap="1"
									borderRadius="md"
								>
									<GiShield />
									<Text fontSize="sm" textTransform="none" fontWeight="normal">
										{pokemon.getPokemon.baseStats.defense}
									</Text>
								</Badge>
							</WrapItem>
						)}
					</Wrap>

					<Divider orientation="horizontal" />
					<List>
						<ListItem>{pokemon.getPokemon.abilities.first}</ListItem>
						<ListItem>{pokemon.getPokemon.abilities?.second}</ListItem>
						<ListItem>{pokemon.getPokemon.abilities?.hidden}</ListItem>
					</List>
				</Stack>
			</Stack>
		</MotionBox>
	);
}
