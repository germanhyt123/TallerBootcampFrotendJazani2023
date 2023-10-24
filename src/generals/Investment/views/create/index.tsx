import { type JSX } from 'react';
import { type InvestmentRequest } from '../../domain';
import useCreateInvestment from '../../application/hooks/useCreateInvestment';
import { useNavigate } from 'react-router-dom';
import FormSave from '../components/FormSave';

const index = (): JSX.Element => {
	// Attibutes
	const navigate = useNavigate();

	// React Query
	const { mutateAsync } = useCreateInvestment();

	// Methods
	const createInvestment = async (payload: InvestmentRequest): Promise<void> => {
		try {
			console.log('Objecto creado: ', payload);

			await mutateAsync(payload);
			
			navigate('/investment');
		} catch (error) {
			console.log('Error creare', error);
		}
	};

	return (
		<FormSave
			pageTitle="Registrar"
			onSave={payload => {
				void createInvestment(payload);
			}}
		/>
	);
};

export default index;
