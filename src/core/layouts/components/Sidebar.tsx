import { Link } from 'react-router-dom';
import { useState, type JSX } from 'react';

const Sidebar = (): JSX.Element => {
	const [active, setActive] = useState('');

	const handleClick = (path: string) => {
		setActive(path);

	};

	return (
		<nav id="sidebar" className="sidebar js-sidebar">
			<div className="sidebar-content js-simplebar">
				<a className="sidebar-brand" href="/">
					<span className="align-middle">JazaniBootCamp</span>
				</a>

				<ul className="sidebar-nav">
					<li className="sidebar-header">General</li>

					<li
						className={`sidebar-item ${active === '/investment' ? 'active' : ''}`}
						onClick={() => {
							handleClick('/investment');
						}}
					>
						<Link className="sidebar-link" to="investment">
							<i className="align-middle" data-feather="sliders"></i>{' '}
							<span className="align-middle">Investment</span>
						</Link>
					</li>

					<li
						className={`sidebar-item ${active === '/holder' ? 'active' : ''}`}
						onClick={() => {
							handleClick('/holder');
						}}
					>
						<Link className="sidebar-link" to="holder">
							<i className="align-middle" data-feather="user"></i>{' '}
							<span className="align-middle">Holder</span>
						</Link>
					</li>

					<li className="sidebar-item">
						<a className="sidebar-link" href="#">
							<i className="align-middle" data-feather="log-in"></i>{' '}
							<span className="align-middle">Sign In</span>
						</a>
					</li>

					<li className="sidebar-item">
						<a className="sidebar-link" href="#">
							<i className="align-middle" data-feather="user-plus"></i>{' '}
							<span className="align-middle">Sign Up</span>
						</a>
					</li>

					<li className="sidebar-item ">
						<a className="sidebar-link" href="#">
							<i className="align-middle" data-feather="book"></i>{' '}
							<span className="align-middle">Blank</span>
						</a>
					</li>

					<li className="sidebar-header">Tools & Components</li>

					<li className="sidebar-item">
						<a className="sidebar-link" href="#">
							<i className="align-middle" data-feather="square"></i>{' '}
							<span className="align-middle">Buttons</span>
						</a>
					</li>

					<li className="sidebar-item">
						<a className="sidebar-link" href="#">
							<i className="align-middle" data-feather="check-square"></i>{' '}
							<span className="align-middle">Forms</span>
						</a>
					</li>

					<li className="sidebar-item">
						<a className="sidebar-link" href="#">
							<i className="align-middle" data-feather="grid"></i>{' '}
							<span className="align-middle">Cards</span>
						</a>
					</li>

					<li className="sidebar-item">
						<a className="sidebar-link" href="#">
							<i className="align-middle" data-feather="align-left"></i>{' '}
							<span className="align-middle">Typography</span>
						</a>
					</li>

					<li className="sidebar-item">
						<a className="sidebar-link" href="#">
							<i className="align-middle" data-feather="coffee"></i>{' '}
							<span className="align-middle">Icons</span>
						</a>
					</li>

					<li className="sidebar-header">Plugins & Addons</li>

					<li className="sidebar-item">
						<a className="sidebar-link" href="#">
							<i className="align-middle" data-feather="bar-chart-2"></i>{' '}
							<span className="align-middle">Charts</span>
						</a>
					</li>

					<li className="sidebar-item">
						<a className="sidebar-link" href="#">
							<i className="align-middle" data-feather="map"></i>{' '}
							<span className="align-middle">Maps</span>
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Sidebar;
