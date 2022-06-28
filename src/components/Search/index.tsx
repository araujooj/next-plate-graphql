import dynamic from 'next/dynamic';

// --- Chakra-UI ---
import {
	FormControl,
	FormErrorMessage,
	FormHelperText,
	HStack,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
} from '@chakra-ui/react';

// --- Motion Components ---
const MotionBox = dynamic(() => import('@components/Motion/MotionBox'));

// --- Form and Validations ---
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// --- Icons ---
import { FiGithub, FiSearch } from 'react-icons/fi';

// --- Validation Schema and Type ---
const validationSchema = Yup.object().shape({
	pokemon: Yup.string().required('Pokemon is required!'),
});

type FormType = Yup.InferType<typeof validationSchema>;

// --- Component Props Interface ---
interface ISearchProps {
	handleSearchPokemon: (pokemon?: string) => void;
}

export default function SearchComponent({
	handleSearchPokemon,
}: ISearchProps): JSX.Element {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: yupResolver(validationSchema), mode: 'onTouched' });

	const onSubmit = ({ pokemon }: FormType) =>
		new Promise(() => setTimeout(() => handleSearchPokemon(pokemon), 500));

	return (
		<MotionBox w="full">
			<form onSubmit={handleSubmit(onSubmit)}>
				<HStack spacing="2" w="full" alignItems="flex-start" py="2">
					<FormControl isInvalid={errors.pokemon}>
						<InputGroup size="lg" variant="outline" borderColor="gray.600">
							<Input
								{...register('pokemon')}
								type="text"
								placeholder="Search a pokemon"
								color="whitesmoke"
								bg="gray.600"
								borderColor="gray.600"
								borderRadius="xl"
								focusBorderColor="purple.500"
								_placeholder={{ color: 'gray.400' }}
								_hover={{ borderColor: 'purple.300' }}
							/>
						</InputGroup>
						{!errors.pokemon ? (
							<FormHelperText>Insert a valid Pokemon to get the data</FormHelperText>
						) : (
							<FormErrorMessage>{errors.pokemon.message}</FormErrorMessage>
						)}
					</FormControl>

					<IconButton
						icon={<FiSearch />}
						type="submit"
						aria-label="Search"
						isLoading={isSubmitting}
						size="lg"
						borderRadius="xl"
						colorScheme="purple"
					/>
				</HStack>
			</form>
		</MotionBox>
	);
}
