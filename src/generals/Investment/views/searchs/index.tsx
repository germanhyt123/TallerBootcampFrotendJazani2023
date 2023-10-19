import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import { InvestmentRepository } from '../../infrastructure';
import { type InvestmentResponse } from '../../domain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Card } from 'react-bootstrap';

const index = (): JSX.Element => {
	const [investments, investmentsSet] = useState<InvestmentResponse[]>([]);

	useEffect(() => {
		void loadHolder();
	}, []);

	const loadHolder = async (): Promise<void> => {
		const response = await InvestmentRepository.findAll();

		investmentsSet(response);
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
										<th>Descripción</th>
										<th>Año</th>
										<th>Mes</th>
										<th>Estado</th>
										<th>Fecha</th>
									</tr>
								</thead>
								<tbody>
									{investments.length > 0 &&
										investments
											.filter(i => i.description !== null)
											.map(investment => (
												<tr key={investment.id}>
													<td>{investment.id}</td>
													<td>{investment.description}</td>
													<td>{investment.year}</td>
													<td>{investment.monthname}</td>
													<td>
														<Badge pill bg={investment.state ? 'success' : 'danger'}>
															{investment.state ? 'Activo' : 'Elminado'}
														</Badge>
													</td>
													<td>
														{new Date(investment.registrationDate).toLocaleDateString('es-PE')}
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
