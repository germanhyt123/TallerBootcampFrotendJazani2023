import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import { HolderRepository } from '../../infrastructure';
import { type HolderResponse } from '../../domain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Card } from 'react-bootstrap';

const index = (): JSX.Element => {
	const [holders, holdersSet] = useState<HolderResponse[]>([]);

	useEffect(() => {
		void loadHolder();
	}, []);

	const loadHolder = async (): Promise<void> => {
		const response = await HolderRepository.findAll();

		holdersSet(response);
		console.log('response: ', response);
	};

	return (
		<>
			<Row className="pt-2">
				<Col xs={12}>
					<Card>
						<Card.Header>Listado de Holders</Card.Header>
						<Card.Body>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>#</th>
										<th>Nombre</th>
										<th>Lastname</th>
										<th>Maidenname</th>
										<th>DistrictId</th>
										<th>Estado</th>
									</tr>
								</thead>
								<tbody>
									{holders.length > 0 &&
										holders
											.filter(h => h.name !== null)
											.map(holder => (
												<tr key={holder.id}>
													<td>{holder.id}</td>
													<td>{holder.name}</td>
													<td>{holder.lastName}</td>
													<td>{holder.maidenname}</td>
													<td>{holder.districtid}</td>
													<td>
														<Badge pill bg={holder.state ? 'success' : 'danger'}>
															{holder.state ? 'Activo' : 'Elminado'}
														</Badge>
													</td>
												</tr>
											))}
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default index;
