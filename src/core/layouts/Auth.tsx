import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Auth = (): JSX.Element => {
	return (
		<Container>
			<Outlet />
		</Container>
	);
};

export default Auth;
