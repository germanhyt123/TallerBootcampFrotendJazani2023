import { useState, useEffect, type FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LocalStorageSession } from '@/core/sessions';


const Menu: FC = () => {
	const [userName, setUserName] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const isAuth = LocalStorageSession.isValidAuthorization();

		if (isAuth) {
			const user = LocalStorageSession.getAuthorization();

			setUserName(`${user.name} ${user.lastName}`);
		}
	}, []);

	const closeSession = (): void => {
		LocalStorageSession.removeAuthorization();

		navigate('/login');
	};

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="">
						<Nav.Link href="/">Home</Nav.Link>
						<NavDropdown title="Generals" id="basic-nav-dropdown">
							<Link className="dropdown-item" to="holder">
								Holders
							</Link>
							<Link className="dropdown-item" to="investment">
								Investments
							</Link>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav className="ms-auto">
						<NavDropdown
							title={<span className="text-primary my-auto">😎 {userName}</span>}
							id="setting-nav-dropdown"
						>
							<NavDropdown.Item href="#action/3.1">Configurar</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item
								href="#"
								onClick={() => {
									closeSession();
								}}
							>
								Cerrar Sesión
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Menu;
