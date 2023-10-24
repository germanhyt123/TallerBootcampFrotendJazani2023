import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
// import Menu from './components/Menu';
import Sidebar from './components/Sidebar';
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';

const Admin = (): JSX.Element => {
	return (
		<>
			{/* <Menu /> */}
			<Sidebar />
			<div className="main">
				<PageHeader/>
				<div className="content">
					<Container fluid>
						<Outlet />
					</Container>
				</div>
				<PageFooter/>
			</div>
		</>
	);
};

export default Admin;
